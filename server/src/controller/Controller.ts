import { Request, Response } from "express";
import { Service } from "../service/Service";
import _ from "lodash";
import { DailyPrice } from "../model/DailyPrice";
import { TSMap } from "typescript-map";

export class Controller implements IController {
  public flightRatesService: Service = new Service();
  private static flightRoutes: any[] = [
    "SIN-sky:KUL-sky",
    "KUL-sky:SIN-sky",
    "KUL-sky:SFO-sky"
  ];

  public async getMinPrice(
    date: string,
    from: string,
    to: string
  ): Promise<any[]> {
    let dateArray = new Array();
    let currentDate = new Date();
    const results = [];
    let lastDateOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    dateArray = this.getDateArray(currentDate, lastDateOfMonth);
    for (const flightRoute of Controller.flightRoutes) {
      results.push(this.getDestinationPriceMap(dateArray, flightRoute));
    }

    return this.formatPayload(await Promise.all(results));
  }

  private async formatPayload(dailyPriceArray: any[]): Promise<any[]> {
    let arr = [].concat.apply([], dailyPriceArray);
    return await _(arr)
      .groupBy(x => x.date)
      .map((value, key) => ({ date: key, pricesWithDates: value }))
      .value();
  }

  private async getDestinationPriceMap(
    dateArray: string[],
    element: string
  ): any {
    let legPriceMap: TSMap<string, DailyPrice[]> = new TSMap();
    let dailyMinimumPriceArray: DailyPrice[] = new Array();
    let finalArray = new Array();
    const resolvedFinalArray = await Promise.all(
      (finalArray = dateArray.map(async date => {
        console.log("-------->");
        let from: string = element.split(":")[0];
        let to: string = element.split(":")[1];
        let response = await this.flightRatesService.getMinPriceForDay(
          date,
          from,
          to
        );
        let price: string = await this.findMinPrice(response);
        return new DailyPrice(date, price, element);
      }))
    );

    return resolvedFinalArray;
  }

  private async findMinPrice(response: Object): Promise<string> {
    let itineraries: Object[] = new Array();
    let minPriceList: Object[] = new Array();
    let res = "";
    try {
      itineraries = await response["Itineraries"];
      await itineraries.forEach(element => {
        let prices: string[];
        minPriceList.push(_.minBy(element["PricingOptions"], "Price"));
      });
      res = await (<string>_.minBy(minPriceList, "Price")["Price"]);
    } catch (err) {
      console.log("error occurred: " + err);
    }
    return res;
  }

  private getDateArray(start: Date, end: Date): string[] {
    let dateArray = new Array();
    let dt = new Date(start);
    while (dt <= end) {
      dateArray.push(new Date(dt).toISOString().split("T")[0]);
      dt.setDate(dt.getDate() + 1);
    }
    return dateArray;
  }
}
