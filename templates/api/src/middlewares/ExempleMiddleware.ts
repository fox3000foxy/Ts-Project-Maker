import { Request, Response, NextFunction } from 'express';

export function exempleMiddleWare(req: Request, res: Response, next: NextFunction) {
    console.log("Exemple middleware triggered");
    // You can add any logic you want here, like logging, authentication, etc.
    // For example, let's log the request method and URL:
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    // Call the next middleware or route handler in the stack
    // If you want to stop the request here, you can send a response instead of calling next()
    // res.status(200).send("Middleware response");

    next();
}