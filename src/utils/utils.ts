import User from '../model/user_model';
import { Code, ResponseObj, StatusCodeMap } from '../types/type';
import jwt from 'jsonwebtoken';
import { Response} from 'express';

const StatusCode: StatusCodeMap = {
  'Success': 200,
  'Created': 201,
  'Conflict': 409,
  'Not_Found': 404,
  'Internal_Server_Error': 500,
  'Unauthorized':401,
  'Forbidden':403,
  'Bad_Request' :400 
};

export const pkey = {
  'type': 'service_account',
  'project_id': 'e-commerce-421312',
  'private_key_id': '68d7bbb8ed4ab9989a1ea1fa44cfaf10fb298752',
  'private_key': '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDrSUbJlGrcwLOs\n8Vd4ucvdl8vtfycM4Ga/BmCSFCvBhvkyO45EFk1JYnSAVfMiQsKnF0QyHLTEQZaq\n/vsnMJI3KcoDCGn39YY6MdykzRXMQYm1h/CuXwtra2f7F/en38kpOzvZjyGbnMb0\nwDD2NRvSUJrVw1XuCz5Ds34gtpbsbpaE/r/Gt3wDK24IfVNpD2aduYdfNsZYpSR8\nC1Jy6fDPIEchGd+AYCQ40tDMTKfn59zdMaShLJKuHDRDrU+jqtlC39xi55RAYpEa\nqKspkNuYMHPQjXYeC+WSCbn/fGYlcwsaKy1DOUUizYOVqeiAzGn+Qog5Q7V19Iqp\n5qEH45tJAgMBAAECggEAGHKoABSjqPX+BXubWPBHWmpmNnKWomwjyPgW6z7c0BJg\nDOPq07DUjYpFLDuiFJ6Gvtl4TNO2RclB6FkvzCHsI368XqXOawUwUhYxxM8Jk4yA\nzGPIcrnuBBaoOotCQMeMTbQ5sxDAD30SIEbjH4Yjsq4M9KbEJES3Ts4VDj2iv4TI\nLFiQ8RRB/bcHwvHw05b3e/R3GIJjLl8EuYn2Lk8/KrivDdaxZ30BQnucX4cek1BW\ncy67Z3V++VUFHZiJVUAxxatLw9dxiYetL5X9hXan3W1r+4jE6CHiapqLLWvFQ2v8\nxHBQtyjBrEshHlGPixLH9pWtm7ylittApjuEnOmm4QKBgQD6LJDoK3PWHORMrMKD\n5ST5649WQfLEwkvukqUWVQhyIUlp6KV5OncNookXGG8YZZ5fKiHu7jMl9zgcsxO6\n+Rp/LSzezB/B6+ziNODfW4T22BOC5cFbKsDc4ayS5JVBOB0kcokpiI+dy7/OEvT1\ncEdI6kUAzVZ60tYJc7RTv3DxGQKBgQDww/SOTcSSNgy678rL2UwsZVOIdB2p1cxY\nbfIhJvjBqW/nqUMwuWZshB3XPuA3ZwkJer1vEry7qDhxk8ok9PDfGC/qRTR4auBA\nbfu1Tp4n+5C0BJYMbJ+beMsVV/mWDnSBDX0JMMWl6N20tEt8sCNF2WfOlrBO6L/Y\nTmQLHyRRsQKBgAVd+2XfuMZ5LDSw6CNoQRjTgum41HqAKJzfrIcEIABC0o5hHVuy\nc2dpe0NxlMCTPYiRINU9av9/hEapWN0EBxt/Xp0RCAVjCFv6AnEIR5v8Gr8OKs3H\n5wdWGBu2p7UUfRuREXxAn8Qk4OKM6ZBybjUUQZK41QghidH+F3pMeyHRAoGBAI5p\nikWGMIi/mcYVQqJTVSBJiyCCdm1X/jgsSHVdpPSAcaXY09qFP9VeTHxeP6fltU27\nIUQLFEH33fMolQBJNhTwLJ9o8gFsTlst8x4qc5h4z/37XHna4onG6HEmiYY95KHV\nRaljBPX/COzzXFdTpHmTgDiNn5n9SET9EWYWtJfxAoGAK41O79tKOWESbwi+0AUC\n49aeiNlWmRGig424prShqaeSgyjdWd0wovQ4sFlYRdQaVFbuZ7GuXWcCYMJOUwZK\nRMGHW0Ks9hZYwlppuJGOBXQYFuq9SLmq+ejRoeQuA/O8Cw89vGRiMtFiSrz0G+fC\n6wYYq+Pd3pKMPw78nZCX62w=\n-----END PRIVATE KEY-----\n',
  'client_email': 'umang-756@e-commerce-421312.iam.gserviceaccount.com',
  'client_id': '103586512724564404516',
  'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
  'token_uri': 'https://oauth2.googleapis.com/token',
  'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
  'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/umang-756%40e-commerce-421312.iam.gserviceaccount.com',
  'universe_domain': 'googleapis.com'
};

export const COUPENCODE: Code[] = [
  {
    Code: 'ABC',
    discountPercentage: 25,
  },
  {
    Code: 'BCD',
    discountPercentage: 15,
  },
  {
    Code: 'CDE',
    discountPercentage: 10,
  },
  {
    Code: 'XYZ',
    discountPercentage: 5,
  },
];

export const handleValidationError = (res: Response, ErrorMessage: string) => {
  return res.status(StatusCode.Bad_Request).json({ message: ErrorMessage });
};

export const handleResponse = (
  res: Response,
  message: string,
  status: string,
  success: boolean,
  error_code?:string,
  item?: any,
  itemname: string = 'item',
  obj?:any
  
) => {
  let responseObj:ResponseObj;

  error_code ? responseObj = { message , success, error_code} : responseObj = { message , success, error_code};
  
  if (item !== undefined) {
    responseObj[itemname] = item.toJSON ? item.toJSON() : item;
  }
  if(obj){
    responseObj.auth = obj;
  }
  
  return res.status(StatusCode[status]).json(responseObj);
};

export const loginHelper = (
  res: Response,
  user: User,
  IsLogin: number = 1,
) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign({ id: user.get('id') }, secretKey as string, {
    expiresIn: '3h',
  });

  if (IsLogin === 1) {
    return handleResponse(
      res,
      'Login successful',
      'Success',
      true,
      'Success',
      undefined,
      undefined,
      { token, name: user.get('first_name'), type: user.get('type') }
    );
  }
  else if(IsLogin === 0)
  {
    return handleResponse(
      res,
      'User registered successfully',
      'Created',
      true,
      'Created',
      user,
      'user',
      { token, name: user.get('first_name'), type: user.get('type') }
    );
  }
  else {
    return handleResponse(res,'Seller registration successful.','Created', true,'Created',undefined,
      undefined,{ token, name: user.get('first_name'), type: user.get('type') });
  }
};

// export const handleDuplicate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const user = await User.findByEmail(req.body?.email);

//   if (user) {
//     return handleResponses(res, 'User Already exists', 'Conflict');
//   }

//   next();
// };