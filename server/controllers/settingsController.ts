import { Request, Response, NextFunction } from 'express';
import supabase from '../utils/supabase';
import { ServerError } from '../types';

const settingsController = {} as SettingsController;

interface SettingsController {
  changePassword: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

settingsController.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    //Compare confirmation Password and new Password
    if (confirmNewPassword !== newPassword) {
      throw new Error('Passwords do not match');
    }
    console.log(currentPassword, newPassword, confirmNewPassword);
    next();
  } catch (err) {
    console.log('------------------Error------------------\n', err);
    const errObj: ServerError = {
      status: 500,
      message: { error: 'SettingsController.changePassword error' },
    };
    next(errObj);
  }
};

export default settingsController;
