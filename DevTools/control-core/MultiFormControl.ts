import { hasValue, Event } from "../utils";
import { Test } from "../Validator";
import { FormControl } from "./FormControl";

export class MultiFormControl {
  // INTERNAL
  private validations: Test[] = [];
  private activeControl: FormControl;
  public controls: FormControl[] = [];

  // PARAMS
  public label: string;
  public fetching: boolean;
  public disabled: boolean;
  public tooltip: string;
  public status: string;

  public get value(): any[] {
    return this.controls.map(element => element.value);
  }
  public get isValid(): boolean {
    return this.controls.every(element => element.isValid);
  }

  // EVENTS
  public change = Event({ debounceTime: 0 });

  constructor(public componentId: string, private create: () => FormControl) {
    this.syncValue([""]);

    this.change.subscribe(() => {
      const invalidControls = this.controls.filter(control => !control.isValid);

      const validControls = this.controls.filter(control => control.isValid);

      if (invalidControls.length > 0) {
        validControls.forEach(control => control.setDisabled(true));
      } else {
        validControls.forEach(control => control.setDisabled(false));
      }
    });
  }

  private syncValue(value = []) {
    this.controls = value.map(item => {
      const control = this.create()
        .setValue(item)
        .setValidations(...this.validations);

      control.change.subscribe(() => {
        this.activeControl = control;
        this.tooltip = control.tooltip;
        this.change.next(this.value);
      });

      return control;
    });
  }

  public add() {
    if (this.isValid) {
      const lastControl = this.controls[this.controls.length - 1];
      if (lastControl && hasValue(lastControl.value)) {
        this.syncValue([...this.value, ""]);
      }
    }
  }

  public delete(selectedControl) {
    this.controls = this.controls.filter(
      control => control !== selectedControl
    );

    this.change.next(this.value);
  }

  public setValue(value: any): this {
    this.syncValue(value);
    return this;
  }

  // -----------------------------------------
  // INITIALIZATION
  // -----------------------------------------

  public setValidations(...validations: Test[]): this {
    this.validations = validations;
    this.controls.forEach(element => element.setValidations(...validations));
    return this;
  }

  public setLabel(label: string): this {
    this.label = label;
    return this;
  }

  public setPlaceholder(placeholder: string): this {
    this.controls.forEach(element => element.setPlaceholder(placeholder));
    return this;
  }

  public setDisabled(disabled: boolean): this {
    if (this.activeControl) this.activeControl.setDisabled(disabled);
    else this.controls.forEach(element => element.setDisabled(disabled));
    return this;
  }

  public setType(type: string): this {
    this.controls.forEach(element => element.setType(type));
    return this;
  }

  public setStatus(status: "" | "warn" | "error" | "success"): this {
    if (this.activeControl) {
      this.activeControl.setStatus(status);
      if (this.status === "" && status === "") {
        this.activeControl = null;
      } else if (hasValue(this.status) && !hasValue(status)) {
        this.activeControl = null;
      }
    } else this.controls.forEach(element => element.setStatus(status));
    this.status = status;
    return this;
  }

  public setTooltip(tooltip: string): this {
    if (this.activeControl) this.activeControl.setTooltip(tooltip);
    else this.controls.forEach(element => element.setTooltip(tooltip));
    return this;
  }

  public setFetching(fetching: boolean): this {
    if (this.activeControl) this.activeControl.setFetching(fetching);
    else this.controls.forEach(element => element.setFetching(fetching));
    return this;
  }
}
