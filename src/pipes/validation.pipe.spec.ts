import * as Joi from 'joi';
import { JoiValidationPipe } from './validation.pipe';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new JoiValidationPipe(Joi.object())).toBeDefined();
  });
});
