import { Response, NextFunction } from 'express';
import fs from 'fs';
import { GdriveRequest } from '../types/type';
import { google } from 'googleapis';
import { handleResponse } from '../utils/utils';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Access the private key from environment variables
const privateKey = process.env.PRIVATE_KEY;

async function authorize() {
  const jwtClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null as unknown as string,
    privateKey?.replace(/\\n/g, '\n'),
    SCOPES
  );
  await jwtClient.authorize();
  return jwtClient;
}

export const GdriveService = async (
  req: GdriveRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).send('No files uploaded');
    }

    const authClient = await authorize();
    const drive = google.drive({ version: 'v3', auth: authClient });

    const uploadPromises = files.map(async (file: Express.Multer.File) => {
      const filePath = file.path;
      const fileName = file.originalname;

      if (!fs.existsSync(filePath)) {
        return Promise.reject(new Error('File not found: ' + fileName));
      }

      const fileMetadata = {
        name: fileName,
        parents: ['13eP2Shlc6H9bsgDOUOtnEV7WuA0xvJl3'],
      };

      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(filePath),
      };

      const uploadedFile = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, mimeType, webViewLink',
      });

      return {
        fileId: uploadedFile.data.id,
        fileName: uploadedFile.data.name,
        mimeType: uploadedFile.data.mimeType,
        webViewLink: uploadedFile.data.webViewLink,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    req.uploadedFiles = uploadedFiles;
    next();
  } catch (error: any) {
    console.log(error);
    return handleResponse(
      res,
      'Failed to uplaod files in google',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};
