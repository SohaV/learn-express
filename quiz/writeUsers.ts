import express, { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { UserRequest, User } from './types';

const router = express.Router();
const dataFile = '../data/users.json';

router.post('/adduser', (req: UserRequest, res: Response) => {
    let newuser = req.body as User;
    req.users?.push(newuser);
    fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(req.users), (err) => {
      if (err) console.log('Failed to write');
      else console.log('User Saved');
    });
    res.send('done');
  });

export default router;

