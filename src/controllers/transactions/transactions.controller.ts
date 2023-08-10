
import { NextFunction, Request, Response } from "express";
import TransactionsSerice from "../../services/transactions/transactions.service";
import { inject, injectable } from "tsyringe";

@injectable()
class TransactionsController {

  constructor(@inject(TransactionsSerice) private transactionsSerice: TransactionsSerice) {
    this.transactionsSerice = transactionsSerice;
  }

  transfer = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { statusCode, body } = await this.transactionsSerice.transfer(req);

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }


  transactionHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { statusCode, body } = await this.transactionsSerice.transactionHistory(req);

      //structure paginated response
      if ('data' in body) { 
        const { success, message, ...transactionRecords } = body;

        return res.status(statusCode).send({success, message, ...transactionRecords.data});

      }

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }

}

export default TransactionsController;