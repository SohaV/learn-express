import fs from 'fs';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import readUsers from './readUsers';
import writeUsers from './writeUsers';
import { User, UserRequest } from './types';

const app: Express = express();
const port = 8000;
const dataFile = '../data/users.json';

let users: User[];

fs.readFile(path.resolve(__dirname, dataFile), (err, data) => {
  console.log('reading file ... ');
  if (err) throw err;
  users = JSON.parse(data.toString());
});

const addMsgToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
  if (users) {
    req.users = users;
    next();
  } else {
    return res.json({
      error: { message: 'users not found', status: 404 }
    });
  }
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/read/usernames', addMsgToRequest);

app.use('/read/username', addMsgToRequest);
app.use('/read', readUsers);

app.use('/write/adduser', addMsgToRequest);
app.use('/write', writeUsers);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
