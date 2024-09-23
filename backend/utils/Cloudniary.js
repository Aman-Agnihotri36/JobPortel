import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import dotenv from 'dotenv';
dotenv.config();
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// cloudinary.config matlab cloudinary ke account ko backend se jodna
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'sample',
    allowedFormats: ['jpg', 'png', 'pdf', 'jpeg'],
});

export {
    cloudinary,
    storage
};
