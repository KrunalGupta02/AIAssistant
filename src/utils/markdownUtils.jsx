import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img: ({ node, ...props }) => (
          <img
            className="max-w-full h-auto rounded"
            {...props}
            alt={props.alt || "Image"}
          />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th
            className="border border-gray-300 px-4 py-2 bg-gray-100"
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td className="border border-gray-300 px-4 py-2" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
