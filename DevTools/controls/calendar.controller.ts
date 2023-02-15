import { FormControl } from "../control-core/FormControl";
import { Event } from "../utils";

export class Calendar extends FormControl {
  // EVENTS
  public statusChange = Event();

  constructor() {
    super("Calendar");
  }

  public override setValue(value: Date | string) {
    if (value === null || value === undefined) return null;
    if (!(value instanceof Date)) value = new Date(value);

    this.value = value;
    this.runValidation();
    this.change.next(this.value);
    return this;
  }

  public override setStatus(status: "warn" | "error" | "success" | "") {
    this.status = status;
    this.statusChange.next(this.status);
    return this;
  }
}
