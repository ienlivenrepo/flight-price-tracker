import { Request, Response } from "express";
import { Service } from "../service/Service";
import _ from "lodash";
import { DailyPrice } from "../model/DailyPrice";
import { TSMap } from "typescript-map";
import moment from "moment";

export class Controller implements IController {
  public flightRatesService: Service = new Service();
  private static flightRoutes: any[] = [
    "SIN-sky:KUL-sky",
    "KUL-sky:SIN-sky",
    "KUL-sky:SFO-sky"
  ];

  //method to get the minimum price for the data fetched  for a given date
  public async getMinPrice(date: string): Promise<any[]> {
    let dateArray = new Array();
    let currentDate = new Date(date);
    const results = [];
    let lastDateOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    dateArray = await this.getDateArray(currentDate, lastDateOfMonth);
    console.log(dateArray);
    for (const flightRoute of Controller.flightRoutes) {
      results.push(await this.getDestinationPriceMap(dateArray, flightRoute));
    }

    return this.formatPayload(await Promise.all(results));
  }

  //method to format the payload
  private async formatPayload(dailyPriceArray: any[]): Promise<any[]> {
    let arr = [].concat.apply([], dailyPriceArray);
    return await _(arr)
      .groupBy(x => x.date)
      .map((value, key) => ({ date: key, pricesWithDates: value }))
      .value();
  }

  // get array of outbound leg price based on date
  private async getDestinationPriceMap(
    dateArray: string[],
    element: string
  ): Promise<DailyPrice[]> {
    let finalArray = [];
    const resolvedFinalArray = await Promise.all(
      (finalArray = dateArray.map(async date => {
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

  // method contains the logic to retrieve the minimum price from the inineraries fetched.
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

  //utility method to fetch month to date array
  private async getDateArray(start: Date, end: Date): Promise<string[]> {
    let dateArray = new Array();
    let dt = new Date(start);
    dt.setDate(dt.getDate() + 1);
    end.setDate(end.getDate() + 1);
    while (dt <= end) {
      dateArray.push(new Date(dt).toISOString().split("T")[0]);
      dt.setDate(dt.getDate() + 1);
    }
    return dateArray;
  }
}
