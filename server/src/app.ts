import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes/Routes";

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
  }
}
export default new App().app;
