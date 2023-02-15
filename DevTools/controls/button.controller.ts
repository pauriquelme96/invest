import { Control } from "../control-core/Control";
import { Event } from "../utils";

export class Button extends Control {
  // EVENTS
  public click = Event();

  constructor() {
    super("Button");
  }
}
