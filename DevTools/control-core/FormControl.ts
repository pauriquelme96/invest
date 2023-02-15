import { Control } from "./Control";
import { Test, Validator } from "../Validator";
import { hasNewContent, joinValues, Event } from "../utils";

export class FormControl extends Control {
  // INTERNAL
  private validator = new Validator();

  // PARAMS
  public value: any;
  public isValid: boolean;

  // EVENTS
  public change = Event();

  constructor(componentId: string) {
    super(componentId);
  }

  public setValidations(...validations: Test[]) {
    this.validator.setTests(validations);
    this.runValidation();
    return this;
  }

  public runValidation() {
    const failedProof = this.validator.run(this.value);
    this.isValid = !failedProof;
    this.tooltip = failedProof?.message;
  }

  public setValue(value: any) {
    if (hasNewContent(this.value, value)) {
      this.value = joinValues(this.value, value);
      this.runValidation();
      this.change.next(this.value);
    }
    return this;
  }
}
