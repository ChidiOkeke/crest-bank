import { container } from "tsyringe";;
import AuthController from "./controllers/auth/auth.controller";
import User, { UserModelType } from "./schemas/user.schema";
import AuthService from "./services/auth/auth.service";
import express, { Application } from "express";



function loadModules(app: Application) {
    container.register<AuthController>(AuthController, {
        useClass: AuthController
    });
    container.register<AuthService>(AuthService, {
        useClass: AuthService
    });
    container.register<UserModelType>('UserModel', { useFactory: () => User });

    const auth = container.resolve(AuthController)
}

export default function CreateApp(): express.Application {
    const app: Application = express();

    loadModules(app);

    return app;
}