import localFont from "next/font/local";
import "./globals.css";
import BottonBar from "@/components/ui/bottonBar";
import Navbar from "@/components/ui/navbar";
import CinemaPage from "@/components/popups/cinema";
import Footer from "@/components/ui/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PIXELBOOK",
  description: "Personal Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <CinemaPage />
        <main>
          {children}
        </main>
        {/* <div className="fixed bottom-0 w-full z-10 ">
          <BottonBar />
        </div> */}
      </body>
    </html>
  );
}
