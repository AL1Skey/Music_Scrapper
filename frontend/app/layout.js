import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Music Scrapper App",
  description: "Scrap the audio from website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className=" min-h-screen p-24">{children}</main>
      </body>
    </html>
  );
}
