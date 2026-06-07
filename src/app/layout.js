import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";

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

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${montserrat.variable} light`}
    >
      <body className="bg-surface font-sans text-on-surface antialiased overflow-x-hidden min-h-screen flex flex-col">
        <ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "13px",
                padding: "12px 16px",
              },
              success: {
                iconTheme: { primary: "#22c55e", secondary: "#fff" },
                style: {
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
                style: {
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                },
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}