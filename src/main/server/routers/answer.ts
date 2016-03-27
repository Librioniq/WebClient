import {Router} from 'express';
import {isEmpty} from 'lodash';
import * as Services from '../services';

const answerService = new Services.Answer();

export const router = Router();

router.get("/questions/:questionId/answers", (req, res) => res.status(200).json(answerService.list(Number(req.params.questionId))));
router.get("/questions/:questionId/answers/:id", (req, res) => {
    let result;

    isEmpty(result = answerService.findById(Number(req.params.id))) ? res.status(404).end('NOT FOUND') : res.status(200).json(result).end();
});
router.post("/questions/:questionId/answers", (req, res) => {
    if (req.body && req.body.id === undefined) {
        try {
            res.status(201).json(answerService.add(Number(req.params.questionId), req.body)).end();
        } catch (e) {
            res.status(500).end(e);
        }
    } else {
        res.status(400).end('BAD REQUEST');
    }
});
router.put("/questions/:questionId/answers", (req, res) => {
    if (req.body && req.body.id !== undefined) {
        try {
            res.status(200).json(answerService.update(req.body)).end();
        } catch (e) {
            res.status(500).end(e);
        }
    } else {
        res.status(400).end('BAD REQUEST');
    }
});
router.delete("/questions/:questionId/answers/:id", (req, res) => answerService.remove(Number(req.params.id)) ? res.status(204).end() : res.status(400).end('BAD REQUEST, RESOURCE NOT FOUND'));

export default router;