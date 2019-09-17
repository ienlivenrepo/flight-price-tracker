export class Event {
  private id: number;
  private title: string;
  private allDay: boolean;
  private start: Date;
  private end: Date;
  constructor(
    id: number,
    title: string,
    allDay: boolean,
    start: Date,
    end: Date
  ) {
    this.id = id;
    this.title = title;
    this.allDay = allDay;
    this.start = start;
    this.end = end;
  }
}
