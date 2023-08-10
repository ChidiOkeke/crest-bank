import Transaction, { TransactionModelType } from "../../schemas/transaction.schema";
import { container } from "tsyringe";
import TransactionsService from "../../services/transactions/transactions.service";
import TransactionsController from "../../controllers/transactions/transactions.controller";
import Account, { AccountModelType } from "../../schemas/accounts.schema";
import mongoose, { Connection } from "mongoose";

//container registration
container.register<TransactionsController>(TransactionsController, {
    useClass: TransactionsController
});
container.register<TransactionsService>(TransactionsService, {
    useClass: TransactionsService
});

container.register<TransactionModelType>('TransactionModel', { useFactory: () => Transaction });
container.register<AccountModelType>('AccountModel', { useFactory: () => Account });

container.register<Connection>('MongooseConnection', {
    useFactory: () => mongoose.connection,
});


export const transactionsController = container.resolve(TransactionsController)