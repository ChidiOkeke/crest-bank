
import { NextFunction, Request, Response } from "express";
import TransactionService from "../../services/transactions/transactions.service";

class TransactionController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { statusCode, body } = await TransactionService.transfer(req);

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();