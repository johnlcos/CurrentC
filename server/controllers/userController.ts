import { db } from '../utils/db';
import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import supabase from '../utils/supabase';
import fs from 'fs';

const userController = {} as UserController;

interface UserController {
  getUserInfo: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  searchUsers: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  checkIsFollowing: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  toggleFollow: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  editProfile: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  upsertAvatar: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getFollowCount: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

userController.getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_avatar, description, id, display_name')
      .eq('username', req.query.user);
    res.locals.userInfo = data;
    if (data) res.locals.id = data[0].id;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (typeof req.query.name === 'string') {
      const name = req.query.name;
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, profile_avatar, display_name')
        .textSearch('display_name', name);
      res.locals.searchResults = data;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.checkIsFollowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase
      .from('relationships')
      .select('id')
      .match({
        follower_id: req.query.follower,
        followed_id: req.query.followed,
      });
    if (data) {
      if (data.length > 0) res.locals.isFollowing = true;
      else res.locals.isFollowing = false;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.toggleFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.following === 'true') {
      const { error } = await supabase.from('relationships').insert({
        follower_id: req.query.follower,
        followed_id: req.query.followed,
      });
      res.locals.follow = 'followed';
    } else {
      const { error } = await supabase.from('relationships').delete().match({
        follower_id: req.query.follower,
        followed_id: req.query.followed,
      });
      res.locals.follow = 'unfollowed';
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // update the username stored in auth metadata
    const updateUserResponse = await supabase.auth.updateUser({
      data: {
        display_name: req.body.displayName,
        profile_avatar: res.locals.avatarPublicUrl,
      },
    });
    // update info in profiles table
    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: req.body.displayName,
        description: req.body.description,
        profile_avatar: res.locals.avatarPublicUrl,
      })
      .eq('id', req.body.id);

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.upsertAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return next();
    }
    console.log(req.file);
    const fileContent = fs.readFileSync(req.file.path);
    const avatarData = await supabase.storage
      .from('avatars')
      .upload(req.body.path, fileContent, {
        cacheControl: '3600',
        upsert: true,
        contentType: req.file?.mimetype,
      });

    if (avatarData.data) {
      const { data } = await supabase.storage
        .from('avatars')
        .getPublicUrl(avatarData.data.path);

      res.locals.avatarPublicUrl = data.publicUrl;
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.getFollowCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const following = await supabase
      .from('relationships')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', res.locals.id);
    const followers = await supabase
      .from('relationships')
      .select('*', { count: 'exact', head: true })
      .eq('followed_id', res.locals.id);
    res.locals.following = following.count;
    res.locals.followers = followers.count;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default userController;
