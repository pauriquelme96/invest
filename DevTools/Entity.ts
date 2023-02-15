import { Crud, CrudService } from "./Crud";
import { joinValues, hasNewContent, Event } from "./utils";

export class Entity extends Crud {
  public value: any = {};
  public _id: string;
  public change = Event();

  constructor(crud: CrudService, model?: any) {
    super();
    if (model) this.setValue(model);
    this.initCrud(crud, this);
  }

  public setValue(model: any) {
    if (hasNewContent(this.value, model)) {
      this.value = joinValues(this.value, model);
      for (const field in model) this[field] = model[field];
      this.change.next(this.value);
    }

    return this;
  }
}
