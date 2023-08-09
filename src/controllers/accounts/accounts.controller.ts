
import { NextFunction, Request, Response } from "express";
import AccountsService from "../../services/accounts/accounts.service";
import { inject, injectable } from "tsyringe";

@injectable()
class AccountsController {

  constructor(@inject(AccountsService) private accountsService: AccountsService) {
    this.accountsService = accountsService;
  }
  

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { statusCode, body } = await this.accountsService.createAccount(req);

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }

}

export default AccountsController;