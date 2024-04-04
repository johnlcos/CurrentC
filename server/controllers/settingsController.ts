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
}

settingsController.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    //Compare confirmation Password and new Password
    if (confirmNewPassword !== newPassword) {
      throw new Error('Passwords do not match');
    }
    console.log(currentPassword, newPassword, confirmNewPassword);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    if (user && user.email) {
      console.log('in here');
      const { data, error } = await supabase.rpc('changepassword', {
        current_plain_password: currentPassword,
        new_plain_password: newPassword,
        current_id: user.id,
      });
      console.log('data', data);
      console.log('error', error);
    }

    // const {data,error} = await supabase.auth.signInWithPassword({

    //   password: currentPassword
    // })
    next();
  } catch (err) {
    console.log('------------------Error------------------\n', err);
    const error = err as Error;
    const errObj: ServerError = {
      status: 500,
      errorType: 'Confirmation',
      message: error.message,
    };
    next(errObj);
  }
};

export default settingsController;
