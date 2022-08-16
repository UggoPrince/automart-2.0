/* eslint-disable camelcase */
import { Express } from 'express';
import { Logger } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { cloudinaryStorageCreds, fileStorageFolder } from '../utilities/getEnv';

const keys = cloudinaryStorageCreds();
const storageFolder = fileStorageFolder();

const cloudinary = v2;
// cloudinary configuration
cloudinary.config(keys);

export class FileStorageService {
  static uploadImage(image: Express.Multer.File) {
    Logger.log('Uploading image...');
    const { path } = image;
    return cloudinary.uploader.upload(
      path,
      {
        folder: storageFolder,
        use_filename: true,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }
        return result;
      },
    );
  }
}
