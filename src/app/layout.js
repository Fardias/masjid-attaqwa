import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Masjid At-Taqwa",
  description: "masjid ku",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col xl:px-[200px]">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
