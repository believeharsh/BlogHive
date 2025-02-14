import React from "react"

const BlogBody = ({ content }) => {
  return (
    <div className="">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogBody;
