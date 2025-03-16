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
    icons: {
        icon: "/icon.svg",
        apple: "/icon.svg",
    },
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
                <div className="flex flex-col min-h-screen">
                    <header className="fixed top-0 w-full bg-black px-8 py-4">
                        <div className="flex justify-center items-center">
                            <h2 className="text-2xl funnel-display font-[family-name:var(--font-funnel-display)]">
                                core98
                            </h2>
                        </div>
                    </header>
                    <main className="mt-12 flex-grow w-full flex flex-col">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
