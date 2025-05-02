import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from "inversify-express-utils";
import { exempleMiddleWare } from '../middlewares/ExempleMiddleware';
import { IExempleService } from '../services/ExempleService';
import exempleValidator from '../validators/ExempleValidator';
import * as yup from 'yup';

@controller("/exemple")
export class ExempleControllerController {
    constructor(
        @inject("ExempleService") private exempleService: IExempleService,
    ) {}

    @httpGet("/", exempleMiddleWare)
    public healthCheck(req: Request, res: Response) {
        const result = this.exempleService.getHelloWorld();
        res.send(result);
    }

    @httpGet("/:name", exempleMiddleWare)
    public async healthCheckWithName(req: Request, res: Response) {
        try {
            await exempleValidator.validate(req.params, { abortEarly: false, stripUnknown: true });
        } catch (err: yup.ValidationError | unknown) {
            if(err instanceof yup.ValidationError) {
                return res.status(400).json({ error: "Validation error", details: err.errors });
            }
        }

        const { name } = req.params as { name: string };

        const result = this.exempleService.getHelloWorldWithName(name);
        res.status(200).send(result);
    }
}