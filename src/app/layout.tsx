import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Using Space Grotesk as a substitute for Funnel Display
const spaceGrotesk = Space_Grotesk({
    variable: "--font-funnel-display",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "core98",
    description: "core98.club coming soon",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${spaceGrotesk.variable} antialiased bg-black text-white`}
            >
                {children}
            </body>
        </html>
    );
}
