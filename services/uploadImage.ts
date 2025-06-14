import dotenv from 'dotenv'
dotenv.config()
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// Function to upload image to Cloudinary and return the image URL
async function uploadImageToCloudinary(filebuffer: Buffer): Promise<string>  {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
            
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error); 
                    reject('An error occurred while uploading the image.');
                } else {
                    if (result && result.secure_url) {
                        resolve(result.secure_url); // Ensure that this is a string
                    } else {
                        reject('No URL returned from Cloudinary.');
                    }
                }
            }
        ).end(filebuffer);
    });
}
export default uploadImageToCloudinary