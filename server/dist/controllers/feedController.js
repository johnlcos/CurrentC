'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supabase_1 = __importDefault(require('../utils/supabase'));
const feedController = {};
feedController.getFeed = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.id) {
      // get a single post when clicked on
      try {
        const { data, error } = yield supabase_1.default
          .from('feeds')
          .select(
            'id, created_at, content, like_count, dislike_count, profiles(username)'
          )
          .eq('id', req.query.id);
        res.locals.results = data;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      // get the total feed to display on explore
      try {
        const { data, error } = yield supabase_1.default
          .from('feeds')
          .select(
            'id, created_at, content, like_count, dislike_count, profiles(username)'
          )
          .eq('type', 'POST')
          .order('created_at', { ascending: false });
        res.locals.results = data;
        next();
      } catch (error) {
        next(error);
      }
    }
  });
feedController.getProfileFeed = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { data, error } = yield supabase_1.default
        .from('feeds')
        .select(
          'id, created_at, content, like_count, dislike_count, profiles(username)'
        )
        .match({ type: 'POST', authorId: req.query.id });
      res.locals.results = data;
      next();
    } catch (error) {
      next(error);
    }
  });
feedController.getReplyFeed = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const reply_to_id = req.query.id;
      const { data, error } = yield supabase_1.default
        .from('feeds')
        .select(
          'id, created_at, content, like_count, dislike_count, profiles(username)'
        )
        .match({ type: 'REPLY', reply_to_id })
        .order('created_at', { ascending: false });
      res.locals.results = data;
      next();
    } catch (error) {
      next(error);
    }
  });
feedController.getMainFeed = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const follower_id = req.query.id;
    //   const { data, error } = await supabase
    //     .from("feeds")
    //     .select(
    //       "id, created_at, content, like_count, dislike_count, profiles(username)"
    //     )
    //     .eq("type", "POST")
    //     .order("created_at", { ascending: false });
    //   // console.log("getMainFeed data: ", data);
    //   res.locals.results = data;
    //   next();
    // } catch (error) {
    //   next(error);
    // }
    try {
      const follower_id = req.query.id;
      const { data, error } = yield supabase_1.default
        .from('relationships')
        .select('follower_id, followed_id, profiles(id)')
        .match({});
      console.log(data);
      next();
    } catch (error) {
      next(error);
    }
  });
feedController.createFeed = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.type === 'POST') {
      try {
        const { message, authorId } = req.body;
        const { error } = yield supabase_1.default
          .from('feeds')
          .insert({ content: message, authorId });
        next();
      } catch (error) {
        next(error);
      }
    } else if (req.body.type === 'REPLY') {
      try {
        const { message, authorId, replyToId, type } = req.body;
        const { error } = yield supabase_1.default
          .from('feeds')
          .insert({ content: message, authorId, reply_to_id: replyToId, type });
        next();
      } catch (error) {
        next(error);
      }
    }
  });
exports.default = feedController;
