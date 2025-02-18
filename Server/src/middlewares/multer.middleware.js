// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })
  
// export const upload = multer({ 
//     storage, 
// })


// this is the new code for the production issue

import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory (RAM)

export const upload = multer({ storage });