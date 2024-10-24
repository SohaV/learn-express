import express, { Response } from 'express';
import { UserRequest } from './types';


const router = express.Router();

router.get('/usernames', (req: UserRequest, res: Response) => {
    let usernames = req.users?.map((user) => {
        return { id: user.id, username: user.username };
      });
      res.send(usernames);
});

router.get('/username/:name', (req: UserRequest, res: Response) => {
    let username = req.params.name;
    let user = req.users?.find((user) => user.username === username);
    if (user) {
        res.send([{ id: user.id, email: user.email }]);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

export default router;