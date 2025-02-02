import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/services/AuthProvider";
import TanStackProvider from "providers/TanstackProvider";
import toast, { Toaster } from 'react-hot-toast';
import { SocketContextProvider } from "@/components/Messenger/Chat/Soket/SocketContext";
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
  title:{
    default: "EventSphere",
    template: "%s | EventSphere"
  },
  description: "Smart Event Management and Booking Platform",
  keywords:["online", "ticket", "selling", "system","event", "management"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `} >
        <TanStackProvider>
          <AuthProvider>
            <SocketContextProvider> 
            {children}
            <Toaster></Toaster>
            </SocketContextProvider>
      
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
