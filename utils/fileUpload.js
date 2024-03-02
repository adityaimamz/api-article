const multer = require('multer'); // Mengimport library multer

const FILE_TYPE = { // Objek yang berisi tipe file dan ekstensinya
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storageFile = multer.diskStorage({ // Konfigurasi penyimpanan file
    destination: function (req, file, cb) { // Fungsi untuk menentukan lokasi penyimpanan file
        const isValidFormat = FILE_TYPE[file.mimetype]
        let uploadError = new Error('Invalid image format')
        if (isValidFormat) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) { // Fungsi untuk menentukan nama file
        const extension = FILE_TYPE[file.mimetype]
        const uniqueFileImage = `image-${Date.now()}.${extension}`
        
        cb(null, uniqueFileImage)
    }
})

exports.uploadOption = multer({ storage: storageFile }) // Ekspor opsi upload
