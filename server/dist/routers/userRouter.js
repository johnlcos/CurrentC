"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.default)();
router.post('/signup', userController_1.default.signup, (req, res) => {
    res.status(200).json({ redirectUrl: 'http://localhost:3000/overview' });
});
router.post('/signin', userController_1.default.signin, (req, res) => {
    res.status(200).json({
        data: res.locals.loggedinUser,
        redirectUrl: 'http://localhost:3000/overview',
    });
});
router.get('/session', userController_1.default.getSession, (req, res) => {
    res.status(200).json({ data: res.locals.data });
});
router.get('/signout', userController_1.default.signout, (req, res) => {
    res.status(200).json({
        success: 'User logged out',
        redirectUrl: 'http://localhost:3000/',
    });
});
router.get('/', userController_1.default.searchUsers, (req, res) => {
    res.status(200).json({ data: res.locals.searchResults });
});
router.get('/info', userController_1.default.getUserInfo, (req, res) => {
    res.status(200).json({ data: res.locals.userInfo });
});
router.get('/isfollowing', userController_1.default.checkIsFollowing, (req, res) => {
    res.status(200).json({ data: res.locals.isFollowing });
});
router.get('/follow', userController_1.default.toggleFollow, (req, res) => {
    res.status(200).json({});
});
router.post('/edit', upload.single('file'), userController_1.default.upsertAvatar, userController_1.default.editProfile, (req, res) => {
    res.status(200).json({ data: res.locals.avatarPublicUrl });
});
exports.default = router;
