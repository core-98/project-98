export default function Home() {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-black text-white p-8">
            <header className="w-full flex justify-start">
                <h2 className="text-xl md:text-2xl funnel-display font-[family-name:var(--font-funnel-display)] tracking-wide">
                    core98
                </h2>
            </header>
            <div className="flex-grow flex items-center justify-center w-full">
                <main className="flex flex-col items-center justify-center text-center max-w-3xl">
                    <h1 className="text-3xl md:text-5xl mb-2 funnel-display font-[family-name:var(--font-funnel-display)] flicker-text">
                        The Future is Now
                    </h1>
                    <p className="text-xl md:text-2xl mb-4 leading-relaxed">
                        A new era of intelligence is unfolding. Stay ahead. Stay
                        aware.
                    </p>
                    <p className="text-2xl md:text-3xl funnel-display font-[family-name:var(--font-funnel-display)] pulse-text">
                        Coming Soon.
                    </p>
                </main>
            </div>

            <footer className="w-full mt-auto pt-4">
                <div className="flex items-center justify-center pb-2">
                    <p className="text-xs text-gray-600">
                        © core98.club {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
}
