import type { Metadata } from "next";
import {Mitr } from "next/font/google";
import "./globals.css";
import Providers from "./session-provider";
import Script from "next/script";


const mitr = Mitr({
  weight: ['200','300','400','500'],
  variable: "--font-mitr",
  subsets: ['latin','thai']
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${mitr.variable} antialiased`}>
        <Script
          src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"
          strategy="afterInteractive"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Providers from "./session-provider";
// import localFont from 'next/font/local'
// import Script from "next/script";

// const supermarket = localFont({
//   src:'./supermarket.ttf'
// })
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html className={`${supermarket.className}`} lang="en">
//       <head>
//         <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
//       </head>
//       <body
//         className={`antialiased`}
//       >
//         <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script> 
        
//         <Providers>
//         {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }
