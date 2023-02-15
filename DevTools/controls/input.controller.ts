import { FormControl } from "../control-core/FormControl";
import { Event } from "../utils";

export class Input extends FormControl {
  // EVENTS
  public keyup = Event();

  constructor() {
    super("Input");
  }
}
