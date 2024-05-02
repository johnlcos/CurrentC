"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
// import AWS from 'aws-sdk';
dotenv_1.default.config();
// const client = new AWS.SecretsManager({ region: 'us-east-2' });
// const getMySecret = async (SecretId: string) => {
//   const s = await client.getSecretValue({ SecretId }).promise();
//   return s.SecretString;
// };
let supabase;
const creatingClient = () => __awaiter(void 0, void 0, void 0, function* () {
    // const secret = await getMySecret(
    //   'arn:aws:secretsmanager:us-east-2:525357733102:secret:currentC_access_secret-DPEGp6'
    // );
    // console.log(secret);
    supabase = (0, supabase_js_1.createClient)(`${process.env.PROJECT_URL}`, `${process.env.PROJECT_ANON_KEY}`);
});
creatingClient();
exports.default = supabase;
