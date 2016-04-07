import {omit, first} from 'lodash';
import {passport, user} from '../database';
import * as Entities from '../../client/entities';

type PostType = "QUESTION" | "ANSWER" | "COMMENT";

const lokiKey = "$loki";
const omitKeys = [lokiKey, "meta", "type"];

export class User {
    /* tslint:disable:no-unused-variable */
    public findOne(id: number): Entities.User;
    public findOne(login: string): Entities.User;
    public findOne(login: string, password: string): Entities.User;
    /* tslint:enable:no-unused-variable */
    public findOne(value: any, password?: string): Entities.User {
        let result: Entities.User;

        if (typeof value === "string") {
            const { id } = passport.findOne(password ? { $and: [{ login: value }, { password }] } : { login: value });

            result = user.findOne({ id });
        } else {
            result = user.findOne({ id: value });
        }

        return omit(result, omitKeys) as Entities.User;
    }
}