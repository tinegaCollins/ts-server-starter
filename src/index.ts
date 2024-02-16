import express from "express";
import http from "http";
import cors from "cors";
import { config } from "./config/";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
const app = express();



const startServer = () => {
  app.use(express.json());
  app.use(
    cors({
      origin: function (origin, callback) {
        const allowedOrigins = ['*'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    })
  );
  app.use(morgan("dev"));

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World" });
  });

  app.use(function (req:Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  let port = process.env.PORT || 8080;
  http
    .createServer(app)
    .listen(port, () => console.log(`listening on port ${port}`));
};

startServer();
