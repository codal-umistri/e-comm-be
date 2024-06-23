import { Request, Response, NextFunction } from 'express';
import { handleValidationError } from '../utils/utils';
import { GdriveRequest } from '../types/type';

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return email.match(emailRegex);
};

const validateGSTNO = (gstno: string) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstno.match(gstRegex);
};

const validatePhoneNumber = (PNumber: string) => {
  const phonenoRegex = /^\+?[0-9]{10}$/;

  return PNumber.match(phonenoRegex);
};

const validatePINCode = (pin: string) => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pin.match(pincodeRegex);
};

export const validateRegisterInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body?.first_name === 'undefined' ||
    req.body?.last_name === 'undefined' ||
    req.body?.gender === 'undefined' ||
    req.body?.email === 'undefined' ||
    req.body?.password === 'undefined' ||
    req.body?.confirm_password === 'undefined' ||
    req.body?.type === 'undefined' ||
    !req.body?.first_name?.trim() ||
    !req.body?.last_name?.trim() ||
    !req.body?.gender?.trim() ||
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
  if (
    req.body?.email === 'undefined' ||
    req.body?.password === 'undefined' ||
    !req.body?.email?.trim() ||
    !req.body?.password?.trim()
  ) {
    return handleValidationError(
      res,
      'Please provide both email and password.'
    );
  } else if (!validateEmail(req.body.email)) {
    return handleValidationError(res, 'Please provide a valid email address.');
  }

  next();
};

export const validateSellerInputs = (
  req: GdriveRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body?.first_name === 'undefined' ||
    req.body?.last_name === 'undefined' ||
    req.body?.gender === 'undefined' ||
    req.body?.business_name === 'undefined' ||
    req.body?.gst_no === 'undefined' ||
    req.body?.state === 'undefined' ||
    req.body?.city === 'undefined' ||
    req.body?.pin_code === 'undefined' ||
    req.body?.mobile_no === 'undefined' ||
    req.body?.street_address === 'undefined' ||
    req.body?.additional_address === 'undefined' ||
    req.body?.email === 'undefined' ||
    req.body?.password === 'undefined' ||
    req.body?.confirm_password === 'undefined' ||
    req.body?.type === 'undefined' ||
    !req.body?.first_name?.trim() ||
    !req.body?.last_name?.trim() ||
    !req.body?.gender?.trim() ||
    !req.body?.business_name?.trim() ||
    !req.body?.gst_no?.trim() ||
    !req.body?.state?.trim() ||
    !req.body?.city?.trim() ||
    !req.body?.pin_code?.trim() ||
    !req.body?.mobile_no?.trim() ||
    !req.body?.street_address?.trim() ||
    !req.body?.additional_address?.trim() ||
    !req.body?.email?.trim() ||
    !req.body?.password?.trim() ||
    !req.body?.confirm_password?.trim()
  ) {
    return handleValidationError(res, 'Please complete all required fields.');
  } else if (!validateGSTNO(req.body?.gst_no)) {
    return handleValidationError(res, 'Please provide a valid GST number.');
  } else if (!validatePINCode(req.body?.pin_code)) {
    return handleValidationError(
      res,
      'Please provide a valid PIN code (6 digits).'
    );
  } else if (!validatePhoneNumber(req.body?.mobile_no)) {
    return handleValidationError(
      res,
      'Please provide a valid 10-digit mobile number.'
    );
  } else if (!validateEmail(req.body.email)) {
    return handleValidationError(res, 'Please provide a valid email address.');
  }

  next();
};

export const validateSendPasswordResetOtpInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body?.email === 'undefined' || !req.body?.email?.trim()) {
    return handleValidationError(res, 'Please complete all required fields.');
  } else if (!validateEmail(req.body?.email)) {
    return handleValidationError(res, 'Please provide a valid email address.');
  }

  next();
};

export const validateForgotPasswordInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body?.password === 'undefined' ||
    req.body?.confirm_password === 'undefined' ||
    !req.body?.password?.trim() ||
    !req.body?.confirm_password?.trim()
  ) {
    return handleValidationError(res, 'Please complete all required fields.');
  }

  next();
};

export const validateOtpInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body?.otp === 'undefined' || req.body?.hash === 'undefined') {
    return handleValidationError(res, 'Please complete all required fields.');
  } else if (req.body?.otp.length !== 5) {
    return handleValidationError(res, 'Otp must me 5 digits long');
  }

  next();
};
