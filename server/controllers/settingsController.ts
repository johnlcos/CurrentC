import { Request, Response, NextFunction } from 'express';
import supabase from '../utils/supabase';

const settingsController = {} as SettingsController;

interface SettingsController {
  changePassword: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

settingsController.changePassword = async (req, res, next) => {};

export default settingsController;
