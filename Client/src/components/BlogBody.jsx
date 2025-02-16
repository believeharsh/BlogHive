import React from "react"

const BlogBody = ({ content }) => {
  return (
    <div className="py-4">
      <div
        className="font-medium text-xl"
        dangerouslySetInnerHTML={{ __html: content }}

      />
    </div>
  );
};

export default BlogBody;
