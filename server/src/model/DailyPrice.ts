export class DailyPrice {
  private leg: string;
  private date: string;
  private price: string;
  constructor(date: string, price: string, leg: string) {
    this.date = date;
    this.price = price;
    this.leg = leg;
  }
}
