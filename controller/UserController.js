import Report from "../models/ReportModel.js";
import multer from "multer";
import { create, Client, MessageAck } from "@open-wa/wa-automate";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const mimeExtension = {
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
    };
    cb(null, file.fieldname + "-" + Date.now() + mimeExtension[file.mimetype]);
  },
});
const maxSize = 5 * 1024 * 1024;

export const uploadFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      req.fileError = "Format file invalid!";
    }
  },
  limits: { fileSize: maxSize },
});

export const saveReport = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No File Uploaded" });
  const dates = req.body.dates;
  const times = req.body.times;
  const shift = req.body.shift;
  const site = req.body.site;
  const pic = req.body.pic;
  const jenis_giat = req.body.jenis_giat;
  const giat = req.body.giat;
  const lokasi = req.body.lokasi;
  const objek = req.body.objek;
  const jumlah_kegiatan = req.body.jumlah_kegiatan;
  const temuan = req.body.temuan;
  const jumlah_temuan = req.body.jumlah_temuan;
  const detail_temuan = req.body.detail_temuan;
  const tindak_lanjut = req.body.tindak_lanjut;
  const kategori_temuan = req.body.kategori_temuan;
  const status = req.body.status;
  const keterangan = req.body.keterangan;
  const image = req.file.filename;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const url = `${req.protocol}://${req.get("host")}/images/${image}`;

  try {
    Report.create({
      dates: dates,
      times: times,
      shift: shift,
      site: site,
      pic: pic,
      jenis_giat: jenis_giat,
      giat: giat,
      lokasi: lokasi,
      objek: objek,
      jumlah_kegiatan: jumlah_kegiatan,
      temuan: temuan,
      jumlah_temuan: jumlah_temuan,
      detail_temuan: detail_temuan,
      tindak_lanjut: tindak_lanjut,
      kategori_temuan: kategori_temuan,
      status: status,
      keterangan: keterangan,
      image: image,
      latitude: latitude,
      longitude: longitude,
      url: url,
    });

    const message = {
      text:
        "Tanggal" +
        "\t" +
        `: ${dates}` +
        "\n" +
        "Waktu" +
        "\t" +
        `: ${times}` +
        "\n" +
        "Shift" +
        "\t" +
        `: ${shift}` +
        "\n" +
        "Site" +
        "\t" +
        `: ${site}` +
        "\n" +
        "PIC" +
        "\t" +
        `: ${pic}` +
        "\n" +
        "Jenis Giat" +
        "\t" +
        `: ${jenis_giat}` +
        "\n" +
        "Giat" +
        "\t" +
        `: ${giat}` +
        "\n" +
        "Lokasi" +
        "\t" +
        `: ${lokasi}` +
        "\n" +
        "Objek" +
        "\t" +
        `: ${objek}` +
        "\n" +
        "Jumlah Kegiatan" +
        "\t" +
        `: ${jumlah_kegiatan}` +
        "\n" +
        "Temuan" +
        "\t" +
        `: ${temuan}` +
        "\n" +
        "Jumlah Temuan" +
        "\t" +
        `: ${jumlah_temuan}` +
        "\n" +
        "Detail Temuan" +
        "\t" +
        `: ${detail_temuan}` +
        "\n" +
        "Tindak Lanjut" +
        "\t" +
        `: ${tindak_lanjut}` +
        "\n" +
        "Kategori Temuan" +
        "\t" +
        `: ${kategori_temuan}` +
        "\n" +
        "Status" +
        "\t" +
        `: ${status}` +
        "\n" +
        "Keterangan" +
        "\t" +
        `: ${keterangan}` +
        "\n" +
        "Latitude" +
        "\t" +
        `: ${latitude}` +
        "\n" +
        "Longitude" +
        "\t" +
        `: ${longitude}`,
      image: `${url}`,
      imageName: `${image}`,
    };

    const chatIds = ["6287798248775@c.us", "6281258459002@c.us"];

    create({
      useChrome: true
    })
      .then(async (client) => {
        for (const chatId of chatIds) {
          try {
            await client.sendImage(
              chatId,
              message.image,
              message.imageName,
              message.text
            );
            console.log(`Image sent to ${chatId}`);

            // client.sendText(chatId, message.text);
            // console.log(`Message sent to ${chatId}`);
          } catch (error) {
            if (error.message.includes("Target closed")) {
              console.warn(
                `Error sending message to ${chatId}: Target closed, retrying in 1 second...`
              );
              await new Promise((resolve) => setTimeout(resolve, 1000));
              continue; 
            } else {
              console.error(`Error sending message to ${chatId}:`, error);
            }
          }
        }
        await client.kill();
      })
      .catch((error) => {
        console.error(`Error creating client:`, error);
      });

    res.status(201).json({ msg: "Report Created Successfuly" });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 5MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const response = await Report.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getReportById = async (req, res) => {
  try {
    const response = await Report.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateReport = async (req, res) => {
  const report = await Report.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!report) return res.status(404).json({ msg: "No Data Found" });

  const shift = req.body.shift;
  const site = req.body.site;
  const pic = req.body.pic;
  const jenis_giat = req.body.jenis_giat;
  const giat = req.body.giat;
  const lokasi = req.body.lokasi;
  const objek = req.body.objek;
  const jumlah_kegiatan = req.body.jumlah_kegiatan;
  const temuan = req.body.temuan;
  const jumlah_temuan = req.body.jumlah_temuan;
  const detail_temuan = req.body.detail_temuan;
  const tindak_lanjut = req.body.tindak_lanjut;
  const kategori_temuan = req.body.kategori_temuan;
  const status = req.body.status;
  const keterangan = req.body.keterangan;

  let image, url;
  if (req.file) {
     image = req.file.filename;
     url = `${req.protocol}://${req.get("host")}/images/${image}`;
  } else {
    image = report.image;
    url = report.url;
  }
  
  try {
    await Report.update(
      {
        shift: shift,
        site: site,
        pic: pic,
        jenis_giat: jenis_giat,
        giat: giat,
        lokasi: lokasi,
        objek: objek,
        jumlah_kegiatan: jumlah_kegiatan,
        temuan: temuan,
        jumlah_temuan: jumlah_temuan,
        detail_temuan: detail_temuan,
        tindak_lanjut: tindak_lanjut,
        kategori_temuan: kategori_temuan,
        status: status,
        keterangan: keterangan,
        image: image,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Report Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchReports = async (req, res) => {
  const { q } = req.query;

  const keys = ["dates", "shift", "site", "pic", "jenis_giat", "giat", "status"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };

  const results = await Report.findAll();
  const filteredResults = q
    ? search(results).slice(0, 10)
    : results.slice(0, 10);
  res.json(filteredResults);
};