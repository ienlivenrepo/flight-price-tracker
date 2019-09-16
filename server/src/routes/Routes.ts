import { Request, Response, NextFunction } from "express";
import { Controller } from "../controller/Controller";

export class Routes {
  public flightRatesController: Controller = new Controller();

  public routes(app): void {
    /* test route */
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "Get request successfull"
      });
    });
    /getData/;
    /*  */
    app
      .route("/getData/:startDate/:from/:to")
      .get(async (req: Request, res: Response) => {
        res
          .status(200)
          .send(
            await this.flightRatesController.getMinPrice(
              req.params.startDate,
              req.params.from,
              req.params.to
            )
          );
      });
  }
}
