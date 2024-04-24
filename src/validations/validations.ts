import { Request, Response, NextFunction } from 'express';
import { handleValidationError } from '../utils/utils';

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return email.match(emailRegex);
};

export const validateInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (
    req.body?.first_name === 'undefined' ||
    req.body?.last_name === 'undefined' ||
    req.body?.email === 'undefined' ||
    req.body?.password === 'undefined' ||
    req.body?.confirm_password === 'undefined' ||
    req.body?.is_seller === 'undefined' ||
    !req.body?.first_name?.trim() ||
    !req.body?.last_name?.trim() ||
    !req.body?.email?.trim() ||
    !req.body?.password?.trim() ||
    !req.body?.confirm_password?.trim()
  ) {
    return handleValidationError(res, 'Please complete all required fields.');
  } else if (!validateEmail(req.body.email)) {
    return handleValidationError(res, 'Please provide a valid email address.');
  } else if (req.body.password !== req.body.confirm_password) {
    return handleValidationError(res, 'Passwords do not match.');
  }

  next();
};

export const validateLoginInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log(req.body);
  if (
    req.body?.email === 'undefined' ||
    req.body?.password === 'undefined' ||
    !req.body?.email?.trim() ||
    !req.body?.password?.trim()
  ) {
    return handleValidationError(res, 'Please provide both email and password.');
  } else if (!validateEmail(req.body.email)) {
    return handleValidationError(res, 'Please provide a valid email address.');
  }

  next();
};
