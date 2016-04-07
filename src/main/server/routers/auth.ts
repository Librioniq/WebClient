import {Router} from 'express';
import * as Services from '../services';

const userService = new Services.User();

export const router = Router();

router.post("/auth", ({body: {login, password}}, res) => {
    if (login && password) {
        try {
            res.status(200).json({ userId: userService.findOne(login, password).id }).end();
        } catch (e) {
            res.status(500).end(e);
        }
    } else {
        res.status(400).end('BAD REQUEST');
    }
});

export default router;