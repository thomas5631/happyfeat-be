import { Request, Response } from 'express';
import { repositories } from './repositories';

export const context = ({ req, res }: { req: Request & { headers: { authorization: string } }; res: Response }) => ({
    repositories,
    req,
    res,
});

export type Context = ReturnType<typeof context>;
