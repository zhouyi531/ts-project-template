import * as bodyParser from "body-parser";
import bodyParserXml from "body-parser-xml";
import express, { Request, Response, NextFunction } from "express";
import { Config } from "./config/config";
import { logHandler, errorHandler } from "./utils";

class Server {
  public static bootstrap(): void {
    const app = express();
    app.use("*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild",
      );
      res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
      if (req.method === "OPTIONS") {
        res.send(200);
      } else {
        next();
      }
    });

    process.env.TZ = "Asia/Shanghai";
    app.set("server_started_at", "" + new Date());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    bodyParserXml(bodyParser);
    // @ts-ignore
    app.use(bodyParser.xml());

    app.get("/", (req, res) => {
      res.send("Last deployed at:" + app.get("server_started_at"));
    });

    app.get("/error-test", (req, res, next) => {
      throw new Error("error test");
    });

    app.get("/diagnostic", (req, res) => {
      res.send("Last deployed at:" + app.get("server_started_at"));
    });

    app.use((err, req, res, next) => {
      if (res.headersSent) {
        return next(err);
      }

      errorHandler("global error handler", err.stack);
      res.status(500).send("something is broken, please check the error log for details");
    });

    app.listen(Config.serverPort);
    console.log(`running at port ${Config.serverPort}, ${app.get("server_started_at")} `);
  }
}

Server.bootstrap();
