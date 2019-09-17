import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes/Routes";
import cors from "cors";

class App {
  public app: express.Application = express();
  public route: Routes = new Routes();

  constructor() {
    this.config();
    this.route.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}
export default new App().app;
