export class Control {
  // INTERNAL
  public componentId: string;

  // PARAMS
  public label?: string;
  public placeholder?: string;
  public type?: string;
  public disabled?: boolean;
  public status?: 'warn' | 'error' | 'success' | '';
  public tooltip?: string;
  public fetching: boolean;

  constructor(componentId: string) {
    this.componentId = componentId;
  }

  // PARAMS
  public setLabel(label: string) {
    this.label = label;
    return this;
  }

  public setPlaceholder(placeholder: string) {
    this.placeholder = placeholder;
    return this;
  }

  public setDisabled(disabled: boolean) {
    this.disabled = disabled;
    return this;
  }

  public setType(type: string) {
    this.type = type;
    return this;
  }

  public setStatus(status: 'warn' | 'error' | 'success' | '') {
    this.status = status;
    return this;
  }

  public setTooltip(tooltip: string) {
    this.tooltip = tooltip;
    return this;
  }

  public setFetching(fetching: boolean) {
    this.fetching = fetching;
    return this;
  }
}
