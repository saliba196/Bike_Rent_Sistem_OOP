import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
  constructor(
    public bike: Bike,
    public user: User,
    public dateFrom: Date,
    public dateTo: Date,
    public dateReturned?: Date
  ) {
    this.bike = bike;
    this.dateFrom = dateFrom;
    this.dateReturned = dateReturned;
    this.dateTo = dateTo;
    this.user = user;
  }
}
