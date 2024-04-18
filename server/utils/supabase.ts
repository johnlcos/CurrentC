import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();
const client = new AWS.SecretsManager({ region: 'us-east-2' });

const getMySecret = async (SecretId: string) => {
  const s = await client.getSecretValue({ SecretId }).promise();
  return s.SecretString;
};

let supabase;

const creatingClient = async () => {
  const secret = await getMySecret(
    'arn:aws:secretsmanager:us-east-2:525357733102:secret:currentC_access_secret-DPEGp6'
  );
  console.log(secret);
  supabase = createClient(
    `${process.env.PROJECT_URL}`,
    `${process.env.PROJECT_ANON_KEY}`
  );
};

export default supabase;
