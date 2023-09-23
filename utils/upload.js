const multer = require("multer");
const path = require("path");

const storageEngine = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-- ${file.originalname}`);
  }
});

const checkFileType = (file, cb) => {

  // Allowed file types
  const fileTypes = /jpeg|png|gif|jpg|svg/;

  // Check extensions
  const extType = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (extType) {
    return cb(null, true);
  }

  return cb("Error: You can only upload images.")

  // return cb(null, true);
}

const upload = multer({
  storage: storageEngine,
  limits: {
    fileSize: 1000000000
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

module.exports = upload;