import { Request, Response } from 'express';
import { destroy, handleResponse, loginHelper } from '../utils/utils';
import bcrypt from 'bcrypt';
import User from '../model/user_model';
import { RegisterPayload, LoginPayload } from '../types/type';
import { generateOtp } from '../utils/utils';
import sendGridMail from '@sendgrid/mail';
import Otp from '../model/otp_model';

export const registerUser = async (req: Request, res: Response) => {
  const { first_name, last_name, gender, email, password }: RegisterPayload =
    req.body;

  try {
    const user = await User.findByEmail(req.body?.email);

    if (user) {
      return handleResponse(
        res,
        'User already exists',
        'Conflict',
        false,
        'Conflict'
      );
    }
    const hashedpassword = bcrypt.hashSync(password, 10);
    const type = 1;
    const newUser = new User({
      first_name,
      last_name,
      gender,
      email,
      password: hashedpassword,
      type,
    });

    await newUser.save();
    return loginHelper(res, newUser, 0);
  } catch (error: any) {
    console.log('Failed to register user');
    return handleResponse(
      res,
      'Failed to register user',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: LoginPayload = req.body;
  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return handleResponse(
        res,
        'User not Found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.get('password')
    );

    if (!isPasswordValid) {
      return handleResponse(
        res,
        'Invalid password',
        'Unauthorized',
        false,
        'Unauthorized'
      );
    }

    return loginHelper(res, user);
  } catch (error: any) {
    console.error('Failed to login user:', error);
    return handleResponse(
      res,
      'Failed to login user',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};

export const sendPasswordResetOtp = async (req: Request, res: Response) => {
  try {
    const { email, emailHash } = req.body;

    if (!email) {
      return handleResponse(
        res,
        'Email address is required',
        'Bad_Request',
        false,
        'Bad_Request'
      );
    }

    if (process.env.SENDGRID_API_KEY) {
      sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
    } else {
      throw new Error('SendGrid API Key is not set');
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return handleResponse(
        res,
        'User not found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const otpCode = generateOtp();

    const emailResponse = await sendGridMail.send({
      to: email,
      from: 'umistri@codal.com',
      subject: 'Your OTP Code for Password Reset',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT3owK0AA8V51QmvLnwaZoZUdKMt8Sabqr4asRCm7IZSRE4NBo2mmIUgDSGu-NmeJEMg&usqp=CAU" alt="Company Logo" style=" height: 50px; width:180px; object-fit: cover;">
          </div>
          <div style="text-align: center; color: #333;">
            <h2 style="color: #2e86de;">Password Reset Verification</h2>
            <p style="font-size: 16px;">Dear User,</p>
            <p style="font-size: 16px;">We received a request to reset your password. Please use the following OTP code to complete the process:</p>
            <div style="margin: 20px auto; width: fit-content; padding: 10px 20px; border: 1px dashed #2e86de; background-color: #eaf2f8; font-size: 24px; font-weight: bold; color: #2e86de;">
              ${otpCode}
            </div>
            <p style="font-size: 16px;">If you did not request a password reset, please ignore this email.</p>
            <p style="font-size: 16px;">Thank you,</p>
            <p style="font-size: 16px;">The BrightSpace Team</p>
          </div>
        </div>
      `,
    });

    if (emailResponse[0].statusCode === 202) {
      await new Otp({
        user_id: user.get('id'),
        otp_code: otpCode,
        otp_hash: emailHash,
      }).save();
      return handleResponse(
        res,
        'Password reset email has been sent successfully.',
        'Success',
        true
      );
    } else {
      return handleResponse(
        res,
        'Failed to send the password reset email. Please try again later.',
        'Email_Error',
        false,
        'Email_Error'
      );
    }
  } catch (error: any) {
    console.error('Error during password reset process:', error);
    return handleResponse(
      res,
      'An internal server error occurred. Please try again later.',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};

export const CheckOtp = async (req: Request, res: Response) => {
  try {
    const { otp, hash } = req.body;
    const OTP = await Otp.findByHashAndCode(hash, otp);

    if (!OTP) {
      return handleResponse(
        res,
        'OTP not Found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    if (OTP.get('otp_code') !== otp) {
      return handleResponse(
        res,
        'Invalid OTP',
        'Unauthorized',
        false,
        'Unauthorized'
      );
    }

    console.log('Otp is perfact');
    return handleResponse(res, 'Entered otp is perfact', 'Success', true);
  } catch (error: any) {
    console.error('Error during checking otp', error);
    return handleResponse(
      res,
      'An internal server error occurred. Please try again later.',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};

export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { password, hash } = req.body;
    const hashedpassword = bcrypt.hashSync(password, 10);

    const OTP = await Otp.findByHash(hash);

    if (!OTP) {
      return handleResponse(
        res,
        'OTP not Found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const user = await User.findByid(await OTP.get('user_id'));

    if (!user) {
      return handleResponse(
        res,
        'User not Found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    user.set({
      password: hashedpassword,
    });

    await user.save();

    // Delete the OTP entry after password update is successful
    await destroy(hash);

    return handleResponse(
      res,
      'Password updated successfully',
      'Success',
      true,
      'Password_Updated'
    );
  } catch (error: any) {
    console.error('Error during password reset process:', error);
    return handleResponse(
      res,
      'An internal server error occurred. Please try again later.',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};


