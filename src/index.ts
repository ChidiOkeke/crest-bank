import 'reflect-metadata';
import bodyParser from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import dbConnection from './core/configs/db.config';
import logger from "morgan";
import routes from "./routes/index.routes";
import FormatResponse from './utils/responses.util';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../src/swagger.json';

// load in dotenv config
dotenvConfig({ path: ".env.dev" });

// choose env file based on the environment
if (process.env.NODE_ENV === "production") {
  dotenvConfig({ path: ".env.dist" });
} else if (process.env.NODE_ENV === "staging") {
  dotenvConfig({ path: ".env.dev" });
}

const port = process.env.PORT;

const app = express();
/**************************
 * Express related configs
 **************************/

// customised logger
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set("port", port);

// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// connect to db
dbConnection()
  .then(() => {
    // handle request with the routers
    app.use(routes);

    app.listen(port, () => {
      console.log(
        `==================Server is listening on port ${port}======================`
      );
    });
  })
  .catch((error: any) => {
    console.log({ error });
  });

// handle any unhandled error
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  return FormatResponse.badRequest(error.message);
});
