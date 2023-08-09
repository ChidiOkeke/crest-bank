import Accounts, { AccountModelType } from "../../schemas/accounts.schema";
import { container } from "tsyringe";
import AccountsService from "../../services/accounts/accounts.service";
import AccountsController from "../../controllers/accounts/accounts.controller";

//container registration
container.register<AccountsController>(AccountsController, {
    useClass: AccountsController
});
container.register<AccountsService>(AccountsService, {
    useClass: AccountsService
});

container.register<AccountModelType>('AccountModel', { useFactory: () => Accounts });

export const accountsController = container.resolve(AccountsController)