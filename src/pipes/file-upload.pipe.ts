import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationException } from '../filters/validation.exception';

@Injectable()
export class FileUploadPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const error = { photo: [] };
    if (value === undefined) {
      throw new ValidationException({ photo: ['No car photo submitted.'] });
    }
    const { mimetype, size } = value;
    const acceptedMimeType = ['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype);
    const acceptedSize = size <= 1000000;
    if (!acceptedMimeType) error.photo.push('Only image files are allowed.');
    if (!acceptedSize) error.photo.push('Image larger than 1mb.');
    if (error.photo.length > 0) throw new ValidationException(error);
    return value;
  }
}
