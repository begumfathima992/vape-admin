import multer from "multer";
import fs from 'fs'
import path from 'path'

const storageProductAdd = multer.memoryStorage();
export const uploadProduct = multer({
  storage: storageProductAdd,
});

// Storage configuration for multer
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const folderPath = `uploads/products/${req.body.title}`;

    // Check if folder exists, if not create it
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },

  filename: function (req, file, cb) {
    // console.log(file, 'fileee')
    cb(null, file.originalname?.replace(/\s+/g,"_"));
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

export const upload = multer({ storage: storage });

function checkFileSignature(buffer) {
  const fileSignatures = {
    "89504E470D0A1A0A": "PNG",
    FFD8FFE0: "JPEG",
    FFD8FF: "JPG",
    52494646: "WEBP",
    // Add more file signatures as needed
  };
  const hexSignature = buffer.slice(0, 8).toString("hex").toUpperCase();

  for (const signature in fileSignatures) {
    if (hexSignature.startsWith(signature)) {
      return fileSignatures[signature];
    }
  }
  return null;
}


const maxSize = 500 * 1024;// one mb // 2mb -> 2 * 1024 * 1024; // 500 kb -> 500 * 1024

export async function ImageFileCheckForUI(name, size) {
  try {
    const filePath = `./uploads/products/${name}`;
    console.log(filePath, "filepasthhhhhhh")

    let check = fs.readFileSync(filePath);
    const filetype = checkFileSignature(check);
    console.log(filetype, 'filetypefiletype')

    if (filetype == "PNG" || filetype == "JPEG" || filetype == "WEBP" || filetype == 'JPG') {
      if (size > maxSize) {
        // console.log(size,maxSize,"sssssssssss")
        await fs.unlinkSync(filePath);
        return "invalid file";
      } else {
        return "valid file";
      }
    } else if (filetype == null) {

      await fs.unlinkSync(filePath);
      return "invalid file";
    }
  } catch (err) {
    console.error(err, "errro in ImageFilCheckForUI");
  }
}

export async function removefIle(name, data) {
  try {
    let filePath = `./uploads/products/${name}`;

    // if (data == "category") {
    //   filePath = `./src/uploads/filterProduct/category/${name}`;
    // } else if (data == "bestSeller") {
    //   filePath = `./src/uploads/bestSeller/${name}`;
    // } else if (data == "gender") {
    //   filePath = `./src/uploads/filterProduct/gender/${name}`;
    // } else if (data == "educationInfo") {
    //   filePath = `./src/uploads/educationCertificate/${name}`;
    // } else if (data == 'ui') {
    //   filePath = `./src/uploads/ui/${name}`;
    // } else if (data == 'footer') {
    //   filePath = `./src/uploads/footer/${name}`;
    // }
    console.log(filePath, "filepathdwqdqw");
    await fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err, "err removefIle");
  }
}