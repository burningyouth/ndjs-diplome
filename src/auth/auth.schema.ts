import * as Joi from 'joi';
import { LoginDto, RegistrationDto } from './auth.interfaces';

export const loginSchema = Joi.object<LoginDto>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object<RegistrationDto>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  contactPhone: Joi.string(),
});
