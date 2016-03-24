import {Question} from '../../client/entities';
import {Router} from 'express';
import {assign} from 'lodash';

const dummyQuestion: Question = {
    id: 0,
    title: "How To getting sturted with Q&A in PlayTech",
    content: "Hello world",
    createdBy: "Oleh Dokuka",
    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    lastModifiedBy: "string",
    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    tags: ["Hello World", "Express", "Dev"],
    rating: 0
};
export const router = Router();

router.get("/questions", (req, res) => (req.body) ? res.status(200).json([dummyQuestion]) : res.status(404).end('NOT FOUND'));
router.get("/questions/:id", (req, res) => (req.body && dummyQuestion.id === Number(req.params.id)) ? res.status(200).json({question: dummyQuestion}).end() : res.status(404).end('NOT FOUND'));
router.post("/questions", (req, res) => (req.body && req.body.id === undefined) ? res.status(200).json(assign({}, dummyQuestion, req.body, { id: 1 })).end() : res.status(404).end('NOT FOUND'));
router.put("/questions", (req, res) => (req.body && dummyQuestion.id === Number(req.body.id)) ? res.status(200).json(assign({}, dummyQuestion, req.body)).end() : res.status(404).end('NOT FOUND'));
router.delete("/questions/:id", (req, res) => (req.body && dummyQuestion.id === Number(req.params.id)) ? res.status(204).end() : res.status(404).end('NOT FOUND'));

export default router;
