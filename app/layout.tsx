import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from "@/components/Providers";
import signinBanner from "@/static/images/signin-banner.png";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Frontent Task",
  description: "Created frontent task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans.variable} box-border font-sans antialiased flex bg-background`}
      >
        <Providers>
          <ToastContainer theme="dark" position="top-right" autoClose={3000} />
          {/* Left Side Panel */}
          <div className="p-4 lg:p-6 2xl:p-10 w-full min-h-screen flex items-center overflow-auto">
            <div className="hidden rounded-[20px] p-6 2xl:p-10 h-full lg:flex w-1/2 relative flex-col justify-end bg-zinc-900 text-white overflow-hidden">
              <div className="absolute inset-0 z-0 h-full">
                <div className="absolute h-full inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                <Image
                  src={signinBanner}
                  alt="Office"
                  className="w-full !h-full object-cover opacity-80"
                  priority
                />
              </div>

              <div className="relative z-20 w-full">
                <h1 className="text-3xl lg:text-4xl 2xl:text-[48px] font-semibold tracking-tight mb-4 2xl:mb-[24px]">Welcome to WORKHIVE!</h1>
                <div className="text-zinc-300 transform translate-x-4">
                  <ul className="list-disc font-[400] font-base leading-normal 2xl:leading-[28px] text-white">
                    <li>Employee Management: View detailed profiles, track performance, and manage attendance.</li>
                    <li>Performance Insights: Analyze team goals, progress, and achievements.</li>
                    <li>Attendance & Leaves: Track attendance patterns and manage leave requests effortlessly.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side Panel */}
            <div className="flex-1 flex flex-col justify-center items-center px-4 ">
              <div className="w-full max-w-[385px] space-y-4 2xl:space-y-8">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
