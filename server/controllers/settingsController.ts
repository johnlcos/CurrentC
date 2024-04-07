import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../types';
import supabase from '../utils/supabase';

const settingsController = {} as SettingsController;

interface SettingsController {
  changePassword: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  accountDeletion: (
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
      throw new Error('Do Not Match');
    }
    console.log(currentPassword, newPassword, confirmNewPassword);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && user.email) {
      const { data } = await supabase.rpc('changepassword', {
        current_plain_password: currentPassword,
        new_plain_password: newPassword,
        current_id: user.id,
      });
      console.log(data);
      if (data === 'incorrect') {
        console.log('error');
        throw new Error('Incorrect');
      }
    }
    next();
  } catch (err) {
    console.log('------------------Error------------------\n', err);
    const error = err as Error;
    if (error.message === 'Do Not Match') {
      const errObj: ServerError = {
        status: 500,
        errorType: 'Confirmation',
        message: 'Passwords do not match',
      };
      next(errObj);
    } else if (error.message === 'Incorrect') {
      const errObj: ServerError = {
        status: 500,
        errorType: 'Incorrect',
        message: 'The password you entered was incorrect',
      };
      next(errObj);
    }
  }
};

settingsController.accountDeletion = async (req, res, next) => {
  try {
    await supabase.rpc('delete_user');
    const { error } = await supabase.auth.signOut();
    next();
  } catch (err) {
    console.log('------------------Error------------------\n', err);
    next(err);
  }
};

export default settingsController;
