import "../globals.css";
import { Inter, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Sections/Navbar/Navbar";
import Footer from "@/components/Sections/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800"],
});

export const metadata = {
  title: "SportNest | Premium Sports Spaces",
  description:
    "Unlock access to elite stadiums, courts, and centers. Seamlessly book professional facilities designed for high-performance athletes and recreational teams alike.",
};

export default function MainLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${montserrat.variable} light`}
    >
      <body
        suppressHydrationWarning
        className="bg-surface font-sans text-on-surface antialiased overflow-x-hidden min-h-screen flex flex-col"
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
