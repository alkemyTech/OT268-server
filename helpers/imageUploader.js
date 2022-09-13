const multer = require('multer');
const path = require('path');

// para descargarlo en una carpeta que se debera llamar ./uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().getTime() + path.extname(file.originalname));
//     }
// });
const storage = multer.memoryStorage()


const fileFilter =  async (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported files'), false);
    }
    console.log(file.originalname)
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});



module.exports = {
    upload
}