import { MultiFormControl } from "../control-core/MultiFormControl";
import { Input } from "./input.controller";

export class MultiInput extends MultiFormControl {
  constructor() {
    super("MultiInput", () => new Input().setPlaceholder("..."));
  }
}
