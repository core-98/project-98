import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="flex-grow flex items-center justify-center">
                <main className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl sm:text-5xl mb-2 funnel-display font-[family-name:var(--font-funnel-display)] flicker-text">
                        The Future is Now
                    </h1>
                    <p className="text-xl mb-4 leading-relaxed">
                        A new era of intelligence is unfolding. Stay ahead. Stay
                        aware.
                    </p>
                    <p className="text-2xl funnel-display font-[family-name:var(--font-funnel-display)] pulse-text mb-8">
                        Coming Soon.
                    </p>
                    <Link
                        href="/ai"
                        className="text-sm text-gray-400 hover:text-white border border-gray-800 px-4 py-2 rounded-md transition-colors"
                    >
                        Latest AI News
                    </Link>
                </main>
            </div>

            <footer className="w-full py-4 ">
                <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-600">
                        © core98.club {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </>
    );
}
