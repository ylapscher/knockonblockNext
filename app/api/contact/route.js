import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple HTML escaper for email content
const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request) {
  try {
    // Accept multipart/form-data for optional photo uploads
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const serviceType = formData.get('serviceType');
    const location = formData.get('location');
    const workDescription = formData.get('workDescription');
    const photoFiles = formData.getAll('photos') || [];

    // Validate required fields
    if (!name || !email || !workDescription || !serviceType) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate attachments: only images and total size <= 25 MB
    const MAX_TOTAL_BYTES = 25 * 1024 * 1024;
    let totalBytes = 0;
    for (const file of photoFiles) {
      if (!file) continue;
      if (typeof file === 'string') continue; // in case empty entries appear
      if (!(file.type || '').startsWith('image/')) {
        return Response.json({ error: 'Only image files are allowed for attachments.' }, { status: 400 });
      }
      totalBytes += file.size || 0;
      if (totalBytes > MAX_TOTAL_BYTES) {
        return Response.json({ error: 'Total size of attached photos must be 25 MB or less.' }, { status: 400 });
      }
    }

    // Send email using Resend
    // Prepare attachments if present
    const attachments = [];
    for (const file of photoFiles) {
      if (!file || typeof file === 'string') continue;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({ filename: file.name || 'photo', content: buffer });
    }

    const { data, error } = await resend.emails.send({
      from: "Knock on Block <noreply@e.knockonblock.com>",
      to: ["info@knockonblock.com"],
      subject: `New Quote Request from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Quote Request</h2>
          
                     <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
             <h3 style="margin-top: 0; color: #555;">Contact Information</h3>
             <p><strong>Name:</strong> ${esc(name)}</p>
             <p><strong>Email:</strong> ${esc(email)}</p>
             ${phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ""}
             ${location ? `<p><strong>Location:</strong> ${esc(location)}</p>` : ""}
           </div>          
                     <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
             <h3 style="margin-top: 0; color: #555;">Work Details</h3>
             <p><strong>Service Type:</strong> ${esc(serviceType)}</p>
             <p style="white-space: pre-wrap;">${esc(workDescription)}</p>
           </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This request was submitted from the Knock on Block website contact form.
            </p>
            ${attachments.length ? `<p style="color: #666; font-size: 14px;">${attachments.length} photo attachment(s) included.</p>` : ''}
          </div>
        </div>
      `,
      ...(attachments.length ? { attachments } : {}),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
