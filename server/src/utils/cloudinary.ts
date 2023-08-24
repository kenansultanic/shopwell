import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dotbacugu',
    api_key: '626817565272597',
    api_secret: 'zP0OVp60aTGqjVNcwh3ri3K5VCE'
});

/*const upload = async (imagePath: string, imageName: string) => {
    return await cloudinary.uploader.upload(imagePath, {
        folder: 'products',
        public_id: imageName
    });
};*/

const uploadImage = async (file: string) => cloudinary.uploader.upload(file, { folder: 'products' });

export default uploadImage;