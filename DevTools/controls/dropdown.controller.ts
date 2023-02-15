import { FormControl } from "../control-core/FormControl";
import { Event } from "../utils";

export class Dropdown extends FormControl {
  // PARAMETERS
  public items: any[] = [];
  public selectedItem: any;
  public filterActive: boolean;

  // EVENTS
  public click = Event();
  public statusChange = Event();
  public onFilter = Event({ debounceTime: 300 });

  constructor() {
    super("Dropdown");

    this.change.subscribe(value => {
      this.selectedItem = this.items.find(item => item.value === value);
    });
  }

  public setItems(items: any[]) {
    this.items = items;
    return this;
  }

  public override setStatus(status: "warn" | "error" | "success" | "") {
    this.status = status;
    this.statusChange.next(this.status);
    return this;
  }

  public setFilterActive(filterActive: boolean) {
    this.filterActive = filterActive;
    return this;
  }
}
