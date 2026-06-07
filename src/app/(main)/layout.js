// app/(main)/layout.jsx

import Navbar from "@/components/Sections/Navbar/Navbar";
import Footer from "@/components/Sections/Footer/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}