import { FormControl } from "./FormControl";
import { Entity } from "../Entity";
import { hasNewContent, hasValue, joinValues, Event } from "../utils";
import { Button } from "../controls/button.controller";

export class Form {
  // INTERNAL
  private controls: FormControl[] = [];
  private entity: Entity;

  // PARAMS
  public mode: "creation" | "edition" = "creation";
  public value: any = {};

  public get isValid(): boolean {
    return this.controls.every(element => element.isValid);
  }

  // EVENTS
  public change = Event();

  constructor(public schema: { [key: string]: any }) {
    for (const field in this.schema) {
      const control: FormControl = this.schema[field];
      this.controls.push(control);
      control.change.subscribe(() => this.updateField(control, field));
    }
  }

  public setValue(value: any) {
    if (hasNewContent(this.value, value)) {
      this.value = joinValues(this.value, value);
      // SYNC CONTROLS
      for (const field in value) {
        if (hasValue(value[field]) && this.schema[field]) {
          const control: FormControl = this.schema[field];

          if (hasNewContent(control.value, value[field])) {
            control.setValue(this.value[field]);
          }
        }
      }

      this.entity?.setValue(this.value);
      this.change.next(this.value);
      return true;
    }

    return false;
  }

  private updateField(control: FormControl, field: string) {
    const hasChanges = this.setValue({ [field]: control.value });
    if (control.isValid) {
      const canEdit = hasChanges && this.mode === "edition" && this.isValid;

      if (canEdit) {
        control.setTooltip("");
        control.setFetching(true);
        control.setDisabled(true);

        this.entity
          .save()
          .then(() => {
            control.setStatus("success");
            setTimeout(() => control.setStatus(""), 1000);
          })
          .catch(() => {
            control.setStatus("warn");
            control.setTooltip("Algo no ha ido bien...");
          })
          .finally(() => {
            control.setFetching(false);
            control.setDisabled(false);
          });
      } else {
        if (hasValue(control.status)) {
          control.setStatus("success");
          setTimeout(() => control.setStatus(""), 1000);
        } else {
          control.setStatus("");
        }
      }
    } else {
      control.setStatus("error");
      control.setTooltip(control.tooltip);
    }
  }

  public setEntity(entity: Entity) {
    this.entity = entity;

    if (this.entity?._id) {
      this.mode = "edition";
      this.setFetching(true);
      this.entity
        .load()
        .then(({ value }) => {
          this.setValue(value);
        })
        .catch(e => {
          console.log(e);
          this.setStatus("warn");
          this.setTooltip("Algo no ha ido bien...");
        })
        .finally(() => this.setFetching(false));
    }

    return this;
  }

  public delete() {
    this.setFetching(true);
    return new Promise((resolve, reject) => {
      this.entity
        .delete()
        .then(resolve)
        .catch(() => {
          this.setStatus("warn");
          this.setTooltip("Algo no ha ido bien...");
          reject();
        })
        .finally(() => this.setFetching(false));
    });
  }

  public setSaveButton(button: Button) {
    button.setLabel("Crear");
    button.setStatus("");

    this.change.subscribe(() => {
      button.setDisabled(!this.isValid);
    });

    button.click.subscribe(() => {
      if (!this.entity) return;

      this.setFetching(true);
      button.setFetching(true);
      button.setLabel("Creando...");
      button.setStatus("");

      this.entity
        .save()
        .then(() => {
          button.setFetching(false);
          button.setDisabled(true);
          button.setStatus("success");
          button.setLabel("Creado!");
          setTimeout(() => {
            this.mode = "edition";
          }, 1000);
        })
        .catch(e => {
          button.setFetching(false);
          button.setStatus("error");
          button.setLabel("Algo no ha ido bien...");
          button.setTooltip(
            e?.error?.message || "No se ha podido crear el elemento"
          );
        })
        .finally(() => this.setFetching(false));
    });

    return this;
  }

  public setFetching(fetchingStatus: boolean): this {
    this.controls.forEach(element => element.setFetching(fetchingStatus));
    return this;
  }

  public setTooltip(tooltip: string): this {
    this.controls.forEach(element => element.setTooltip(tooltip));
    return this;
  }

  public setStatus(status: "" | "warn" | "error" | "success"): this {
    this.controls.forEach(element => element.setStatus(status));
    return this;
  }

  public setDisabled(disabled: boolean): this {
    this.controls.forEach(element => element.setDisabled(disabled));
    return this;
  }
}
