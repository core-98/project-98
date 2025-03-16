'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({...props}) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
        h2: ({...props}) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
        h3: ({...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
        a: ({...props}) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
        p: ({...props}) => <p className="mb-4" {...props} />,
        ul: ({...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
        ol: ({...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
        li: ({...props}) => <li className="mb-1" {...props} />,
        blockquote: ({...props}) => <blockquote className="border-l-4 border-gray-700 pl-4 italic my-4" {...props} />,
        code: ({inline, ...props}: {inline?: boolean} & React.HTMLAttributes<HTMLElement>) => (
          inline 
            ? <code className="bg-gray-800 px-1 rounded text-sm" {...props} /> 
            : <code className="block bg-gray-800 p-3 rounded text-sm overflow-x-auto my-4" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
