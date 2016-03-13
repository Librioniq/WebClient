import {Question} from '../../client/redux/entities';
import {Router} from 'express';

const dummyQuestion: Question = {
    id: 0,
    title: "string",
    content: "Hello world",
    createdBy: "string",
    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    lastModifiedBy: "string",
    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    rating: 0
};
export const router = Router();

router.get("/questions", () => [dummyQuestion]);
router.get("/questions/:id", (req, res, id) => (!req.body && id) ? res.status(200).json(dummyQuestion) : res.status(404).end('NOT FOUND'));
router.post("/questions", (req, res) => (req.body && req.body.id === undefined) ? res.status(200).json(dummyQuestion) : res.status(404).end('NOT FOUND'));
router.put("/questions", (req, res) => (req.body && req.body.id !== undefined) ? res.status(200).json(dummyQuestion) : res.status(404).end('NOT FOUND'));
router.delete("/questions/:id", (req, res, id) => (!req.body && id) ? res.status(200).json(dummyQuestion) : res.status(404).end('NOT FOUND'));

export default router;