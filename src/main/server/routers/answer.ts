import {Answer} from '../../client/entities';
import {Router} from 'express';
import {assign} from 'lodash';

const questionId = 0;
const dummyAnswer: Answer = {
    id: 0,
    content: "So you should do that or this or anythings",
    createdBy: "string",
    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    lastModifiedBy: "string",
    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    rating: 0
};
export const router = Router();

router.get("/questions/:questionId/answers", (req, res) => (req.body && Number(req.params.questionId) === questionId) ? res.status(200).json([dummyAnswer]) : res.status(404).end('NOT FOUND'));
router.get("/questions/:questionId/answers/:id", (req, res) => (req.body && Number(req.params.questionId) === questionId && dummyAnswer.id === Number(req.params.id)) ? res.status(200).json(dummyAnswer).end() : res.status(404).end('NOT FOUND'));
router.post("/questions/:questionId/answers", (req, res) => (req.body && Number(req.params.questionId) === questionId && req.body.id === undefined) ? res.status(200).json(assign({}, dummyAnswer, req.body, { id: 1 })).end() : res.status(404).end('NOT FOUND'));
router.put("/questions/:questionId/answers", (req, res) => (req.body && Number(req.params.questionId) === questionId && dummyAnswer.id === Number(req.body.id)) ? res.status(200).json(assign({}, dummyAnswer, req.body)).end() : res.status(404).end('NOT FOUND'));
router.delete("/questions/:questionId/answers/:id", (req, res) => (req.body && Number(req.params.questionId) === questionId && dummyAnswer.id === Number(req.params.id)) ? res.status(204).end() : res.status(404).end('NOT FOUND'));

export default router;