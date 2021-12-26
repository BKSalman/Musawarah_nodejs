const util = require("util");
const multer = require("multer");

const types = ["image/jpg", "image/jpeg", "image/png"];

const fileFilter = (req, file, cb) => {
  if (types.indexOf(file.mimetype) === -1) {
    cb(null, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-Mu-${file.originalname}`);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);
// const uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = upload;
