import { Inter, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeContext/ThemeContext";
import "./globals.css";

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
  description: "Unlock access to elite stadiums, courts, and centers. Seamlessly book professional facilities designed for high-performance athletes and recreational teams alike.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} light`}>
      <body className="bg-surface font-sans text-on-surface antialiased overflow-x-hidden min-h-screen flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
