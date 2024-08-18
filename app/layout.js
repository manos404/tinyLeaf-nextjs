import { Cormorant } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const cormorant = Cormorant({ subsets: ["latin"], weight: ["500", "700"] });

export const metadata = {
  title: "TinyLeaf Next App",
  description: "Generated by create next app",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cormorant.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
