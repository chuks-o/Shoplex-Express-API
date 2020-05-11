const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const uploadImages = () => {
  let upload = multer({
    storage: storage,
    fileFilter: imageFilter
  }).array("multiple_images", 10);

  upload(req, res, function(err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    // else if (...) // The same as when uploading single images

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
      result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./">Upload more images</a>';
    res.send(result);
  });
};

module.exports = {
  uploadImages
};
