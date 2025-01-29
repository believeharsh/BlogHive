// import React from "react";
// const BlogCard = ({ title, body, coverImage, createdAt}) => {
//     return (
//       <div className="flex items-start justify-between border-b border-gray-300 py-4">
//         {/* Left Content */}
//         <div className="flex-1 pr-4">
//           {/* Title */}
//           <h3 className="text-lg font-bold text-gray-900">{title}</h3>
  
//           {/* Description */}
//           <p className="text-sm text-gray-600 mt-2 line-clamp-2">{body}</p>
  
//           {/* Footer */}
//           <div className="flex items-center text-sm text-gray-500 mt-4">
//             <span>{createdAt}</span>
//             <span className="mx-2">•</span>
//             <span className="flex items-center gap-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-4 h-4"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M17.25 9.75L12 15.75l-5.25-6"
//                 />
//               </svg>
//               {/* {commentsCount} */}
//             </span>
//           </div>
//         </div>
  
//         {/* Right Content - Image */}
//         <div className="flex-shrink-0 w-52 h-30">
//           <img
//             src={coverImage}
//             alt="Blog"
//             className="w-full h-full object-cover rounded-md"
//           />
//         </div>
//       </div>
//     );
//   };
  
//   export default BlogCard;





  import React from "react";

const BlogCard = ({ title, body, coverImage, createdAt }) => {
  return (
    <div className="border-b border-gray-300 py-4">
      {/* First Div: Title and Body */}
      <div className="flex items-start justify-between">
        {/* Left Content - Title and Description */}
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{body}</p>
        </div>
        

        {/* Right Content - Image */}
        <div className="flex-shrink-0 w-52 h-30">
          <img
            src={coverImage}
            alt="Blog"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Second Div: Created Date, Comment Icon, Save Icon, and Dropdown */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        {/* Left Content - Date and Comment Icon */}
        <div className="flex items-center">
          <span>{createdAt}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L12 15.75l-5.25-6"
              />
            </svg>
            {/* {commentsCount} */}
          </span>
        </div>

        {/* Right Content - Save Icon and Dropdown */}
        <div className="flex items-center gap-4">
          {/* Save Icon */}
          <button className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 3.75h13.5m-13.5 0L12 17.25 18.75 3.75"
              />
            </svg>
          </button>

          {/* Three Dot Dropdown */}
          <button className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
