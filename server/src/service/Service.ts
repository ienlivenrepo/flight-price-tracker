import { Config } from "../config/Config";
import axios from "axios";
import qs from "querystring";
export class Service implements IService {
  config: Config = require("../config/config.json");
  session: string = "";
  headers = {
    "x-rapidapi-host": this.config.rapidApiAccount,
    "x-rapidapi-key": this.config.rapidApiKey,
    "content-type": "application/x-www-form-urlencoded"
  };
  public async getMinPriceForDay(
    date: string,
    origin: string,
    destination: string
  ): Promise<string> {
    let response = await this.getPolledData(date, origin, destination);
    return response;
  }

  //polling the data for getting the sessionID and based on the sessionID we get the data from skyscanner api
  private async getPolledData(
    date: string,
    origin: string,
    destination: string
  ): Promise<string> {
    let sess = await this.getSessionID(date, origin, destination);
    let sessionID: string = sess;
    let response = "";
    try {
      //fetching session id
      response = await this.getSkyscannerData(
        sessionID.substring(sessionID.lastIndexOf("/") + 1)
      );
      //polling for UpdatesComplete
      while (response["Status"] === "UpdatesPending") {
        //fetching skyscanner data
        response = await this.getSkyscannerData(
          sessionID.substring(sessionID.lastIndexOf("/") + 1)
        );
      }
    } catch (err) {
      console.log("error occurred");
    }
    return response;
  }

  private async getSkyscannerData(sessionID: string): Promise<string> {
    let url: string = this.config.skyScannerBaseUrl
      .concat(this.config.skyScannerPollingUrl)
      .concat(sessionID);
    return await axios
      .get(url, { headers: this.headers })
      .then(function(response) {
        //handle success
        return response.data;
      })
      .catch(function(error) {
        //handle error
        console.error("error occurred");
      });
  }

  private async getSessionID(
    date: string,
    origin: string,
    destination: string
  ): any {
    let formData = {
      inboundDate: "",
      cabinClass: "economy",
      children: "0",
      infants: "0",
      country: "US",
      currency: "USD",
      locale: "en-US",
      originPlace: origin,
      destinationPlace: destination,
      outboundDate: date,
      adults: "1"
    };
    return await axios
      .post(
        this.config.skyScannerBaseUrl.concat(this.config.skyScannerSessionUrl),
        qs.stringify(formData),
        { headers: this.headers }
      )
      .then(function(response) {
        //handle success
        return response.headers["location"];
      })
      .catch(function(error) {
        //handle error
        console.error("error occurred");
      });
  }
}
