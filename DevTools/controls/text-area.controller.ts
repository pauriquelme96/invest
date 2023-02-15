import { FormControl } from "../control-core/FormControl";
import { Event } from "../utils";

export class TextArea extends FormControl {
  // EVENTS
  public keyup = Event();

  constructor() {
    super("TextArea");
  }
}
