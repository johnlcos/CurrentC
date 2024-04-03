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
  } catch (err) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'settingsController.changePassword Error: ': err }),
      status: 500,
      message: { error: 'SettingsController.changePassword error' },
    };
    next(err);
  }
};

export default settingsController;
