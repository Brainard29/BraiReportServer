import multer from "multer";
import PdfFile from "../models/PdfModel.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/UploadPDF");
  },
    filename: function (req, file, cb) {
      const mimeExtension = {
        "application/pdf": ".pdf",
      };
      cb(null, file.fieldname + "-" + Date.now() + mimeExtension[file.mimetype]);
    },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploadPdf = multer({
  storage: storage,
    fileFilter: (req, file, cb) => {
      console.log(file.mimetype);
      if (
        file.mimetype === "application/pdf"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        req.fileError = "Format file invalid!";
      }
    },
});

export const uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.file.filename;
  const paths = `${req.protocol}://${req.get("host")}/UploadPDF/${name}`;
  //const paths = `${req.protocol}://localhost:3000/UploadPDF/${name}`;

  try {
    PdfFile.create({
      name: name,
      paths: paths,
    });

    res.status(201).json({ msg: "PDF Created Successfuly" });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};

export const getPdf = async (req, res) => {
  try {
    const response = await PdfFile.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePdf = async (req, res) => {
  const pdfFile = await PdfFile.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!pdfFile) return res.status(404).json({ msg: "No Data Found" });

  const name = req.file.filename;
  //const paths = `${req.protocol}://${req.get("host")}/UploadPDF/${name}`;

  try {
    await PdfFile.update(
      {
        name: name,
        // paths: paths,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "PDF Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};