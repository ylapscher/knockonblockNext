export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-navy via-steel-blue to-primary-navy">
      <div className="text-center text-white px-6 py-12 max-w-4xl mx-auto">
        {/* Logo/Brand Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Knock On Block
          </h1>
          <div className="w-24 h-1 bg-accent-yellow mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-200 font-light">
            Professional Handyman Services
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-accent-yellow">
            Coming Soon
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're working hard to bring you the best handyman services in Northern New Jersey and Southern New York. 
            Our new website is under construction and will be launching soon!
          </p>
        </div>

        {/* Services Preview */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-accent-yellow">
            What We'll Offer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">📺</div>
              <h4 className="font-semibold mb-2">TV Mounting</h4>
              <p className="text-sm text-gray-300">Professional TV installation and mounting services</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-semibold mb-2">Smart Devices</h4>
              <p className="text-sm text-gray-300">Smart home device installation and setup</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">🏠</div>
              <h4 className="font-semibold mb-2">Home Repairs</h4>
              <p className="text-sm text-gray-300">Drywall repair, plumbing, and electrical work</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-accent-yellow">
            Get In Touch
          </h3>
          <div className="space-y-4 text-lg">
            <p className="text-gray-200">
              <span className="font-semibold">Service Areas:</span> Northern NJ & Southern NY
            </p>
            <p className="text-gray-200">
              <span className="font-semibold">Email:</span> info@knockonblock.com
            </p>
            <p className="text-gray-200">
              <span className="font-semibold">Phone:</span> (555) 123-4567
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-accent-yellow/20 backdrop-blur-sm rounded-lg p-8 border border-accent-yellow/30">
          <h3 className="text-2xl font-bold mb-4 text-accent-yellow">
            Be the First to Know
          </h3>
          <p className="text-gray-200 mb-6">
            Sign up to be notified when we launch and get exclusive early access to our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-accent-yellow flex-1 max-w-md"
            />
            <button className="px-8 py-3 bg-accent-yellow text-primary-navy font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
              Notify Me
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-gray-400 text-sm">
            © 2024 Knock On Block. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
