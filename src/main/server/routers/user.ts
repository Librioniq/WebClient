import {Router} from 'express';
import {isEmpty} from 'lodash';
import * as Services from '../services';

const userService = new Services.User();

export const router = Router();

router.get("/users/:id", (req, res) => {
    let result;

    isEmpty(result = userService.findOne(Number(req.params.id))) ? res.status(404).end('NOT FOUND') : res.status(200).json(result).end();
});
export default router;
