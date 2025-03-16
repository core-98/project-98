"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ ...props }) => (
                    <h1
                        className="text-3xl font-bold mt-6 mb-4 funnel-display font-[family-name:var(--font-funnel-display)]"
                        {...props}
                    />
                ),
                h2: ({ ...props }) => (
                    <h2
                        className="text-2xl font-bold mt-5 mb-3 funnel-display font-[family-name:var(--font-funnel-display)]"
                        {...props}
                    />
                ),
                h3: ({ ...props }) => (
                    <h3
                        className="text-xl font-bold mt-4 mb-2 funnel-display font-[family-name:var(--font-funnel-display)]"
                        {...props}
                    />
                ),
                a: ({ ...props }) => (
                    <a
                        className="text-blue-400 hover:underline transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                    />
                ),
                p: ({ ...props }) => (
                    <p
                        className="mb-5 leading-relaxed text-gray-300"
                        {...props}
                    />
                ),
                ul: ({ ...props }) => (
                    <ul
                        className="list-disc pl-6 mb-5 space-y-2 text-gray-300"
                        {...props}
                    />
                ),
                ol: ({ ...props }) => (
                    <ol
                        className="list-decimal pl-6 mb-5 space-y-2 text-gray-300"
                        {...props}
                    />
                ),
                li: ({ ...props }) => <li className="mb-2" {...props} />,
                blockquote: ({ ...props }) => (
                    <blockquote
                        className="border-l-2 border-gray-700 pl-4 italic my-5 text-gray-400"
                        {...props}
                    />
                ),
                code: ({
                    inline,
                    ...props
                }: { inline?: boolean } & React.HTMLAttributes<HTMLElement>) =>
                    inline ? (
                        <code
                            className="bg-gray-900 bg-opacity-50 px-1.5 py-0.5 rounded text-sm text-gray-300"
                            {...props}
                        />
                    ) : (
                        <code
                            className="block bg-gray-900 bg-opacity-50 p-4 rounded text-sm overflow-x-auto my-5 text-gray-300"
                            {...props}
                        />
                    ),
                hr: ({ ...props }) => (
                    <hr
                        className="border-gray-600 opacity-30 my-8"
                        {...props}
                    />
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
