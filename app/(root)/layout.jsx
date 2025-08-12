import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import FloatingQuoteButton from "@/components/ui/FloatingQuoteButton";

export default function RootLayout({ children }) {
  return (
    <div className="root-app-layout">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingQuoteButton />
    </div>
  );
}
