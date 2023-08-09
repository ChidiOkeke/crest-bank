import AuthService from '../../services/auth/auth.service';
import User, { UserModelType } from '../../schemas/user.schema';
import { container } from "tsyringe";
import AuthController from '../../controllers/auth/auth.controller';
import AuthMiddleware from '../../middlewares/auth.middleware';

//container registration
container.register<AuthController>(AuthController, {
    useClass: AuthController
});
container.register<AuthService>(AuthService, {
    useClass: AuthService
});
container.register<AuthMiddleware>(AuthMiddleware, {
    useClass: AuthMiddleware
});
container.register<UserModelType>('UserModel', { useFactory: () => User });

export const authController =  container.resolve(AuthController)
export const authMiddleware =  container.resolve(AuthMiddleware)
