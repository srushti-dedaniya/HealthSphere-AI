import type { Request, Response, NextFunction } from 'express';

export function validateBody(validator: (body: unknown) => string | null) {
  return (req: Request, res: Response, next: NextFunction) => {
    const error = validator(req.body);
    if (error) {
      res.status(422).json({ success: false, error });
      return;
    }
    next();
  };
}
