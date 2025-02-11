import React from "react"
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const BlogBody = ({ content }) => {
  return (
    <div className="">
      <div dangerouslySetInnerHTML={{ __html: content }} />;
    </div>
  );
};

export default BlogBody;
