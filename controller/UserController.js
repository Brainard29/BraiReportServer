import Report from "../models/ReportModel.js";
import multer from 'multer';
import twilio from "twilio";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const mimeExtension = {
            'image/jpeg': '.jpeg',
            'image/jpg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
        }
        cb(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype]);
    }
})
const maxSize = 5 * 1024 * 1024;

export const uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if(file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
            req.fileError = 'Format file invalid!';
        }
    },
    limits: { fileSize: maxSize }
})

export const saveReport = async (req, res)=>{
    if(!req.file) return res.status(400).json({msg: "No File Uploaded"});
    const dates = req.body.dates;
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

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    try {
        await Report.create({dates: dates, shift: shift, site: 
            site, pic: pic, jenis_giat: jenis_giat, giat: giat, lokasi: lokasi, objek: objek, jumlah_kegiatan: jumlah_kegiatan, temuan: temuan, jumlah_temuan: jumlah_temuan, detail_temuan: detail_temuan, tindak_lanjut: tindak_lanjut, kategori_temuan: kategori_temuan, status: status, keterangan: keterangan, image: image, latitude: latitude, longitude: longitude , url: url});
        client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: "Tanggal/Waktu: " + dates + "\nShift: " + shift + "\nSite: " + site + "\nLokasi: " + lokasi + "\nGiat: " + giat + "\nTemuan: " + temuan + "\nKeterangan: " + keterangan +"\nKoordinat: " + latitude + ", " + longitude,
            to: 'whatsapp:+6281253453207'
        })
        .then(message => console.log(message.sid));
        res.status(201).json({msg: "Report Created Successfuly"});
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
}

export const getReports = async(req, res)=>{
    try {
        const response = await Report.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getReportById = async(req, res)=>{
    try {
        const response = await Report.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateReport = async(req, res)=>{
    const report = await Report.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!report) return res.status(404).json({msg: "No Data Found"});
    
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
    const keterangan = req.body.keterangan;
    
    try {
        await Product.update({shift: shift, site: site, pic: pic, jenis_giat: jenis_giat, giat: giat, lokasi: lokasi, objek: objek, jumlah_kegiatan: jumlah_kegiatan, temuan: temuan, jumlah_temuan: jumlah_temuan, detail_temuan: detail_temuan, tindak_lanjut: tindak_lanjut, kategori_temuan: kategori_temuan, keterangan: keterangan},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Report Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}


