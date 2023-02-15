import { Entity } from "./Entity";
import { getNewContent, hasNewContent, hasValue } from "./utils";

export class Crud {
  // INTERNAL
  private currentValue = {};
  private activePromise: Promise<any>;
  private api: CrudService;
  private entity: Entity;
  private isInited: boolean;

  // PROPERTIES
  public fetching: boolean;

  protected initCrud(api: CrudService, entity: Entity) {
    this.isInited = true;
    this.currentValue = { ...entity.value };
    this.api = api;
    this.entity = entity;
  }

  public setFetching(fetching: boolean) {
    this.fetching = fetching;
    return this;
  }

  public load() {
    if (!this.isInited) {
      throw new Error("Crud is not initialized");
    }

    if (this.activePromise) return this.activePromise;

    if (Object.keys(this.entity.value).length > 1) {
      return Promise.resolve(this);
    }

    this.setFetching(true);
    return (this.activePromise = this.api
      .read(this.entity._id)
      .then(client => {
        this.currentValue = { ...client };
        this.entity.setValue(client);
        return this;
      })
      .finally(() => {
        this.setFetching(false);
        this.activePromise = null;
      }) as any);
  }

  public delete(): Promise<any> {
    if (!this.isInited) {
      throw new Error("Crud is not initialized");
    }
    this.setFetching(true);

    if (!this.entity._id) return Promise.resolve({});

    return this.api
      .delete(this.entity._id)
      .then(() => this.entity)
      .finally(() => this.setFetching(false));
  }

  public save() {
    if (!this.isInited) {
      throw new Error("Crud is not initialized");
    }

    const valueChanges = getNewContent(this.currentValue, this.entity.value);
    this.currentValue = { ...this.entity.value };

    // NO CHANGES
    if (!hasValue(valueChanges)) {
      return this.noop();
    }

    // CREATE OBJECT
    if (!hasValue(this.entity._id)) {
      return this.create(valueChanges);
    }

    // UPDATE OBJECT
    if (hasValue(this.entity._id)) {
      return this.update(this.entity._id, valueChanges);
    }

    return this.noop();
  }

  private noop() {
    return Promise.resolve(this.entity);
  }

  private create(model: any) {
    this.setFetching(true);
    return this.api
      .create(model)
      .then(({ _id }) => this.entity.setValue({ _id }))
      .then(() => this.entity)
      .finally(() => this.setFetching(false));
  }

  private update(id: string, changes: any) {
    this.setFetching(true);
    return this.api
      .update(id, changes)
      .then(() => this.entity)
      .finally(() => this.setFetching(false));
  }
}

export interface CrudService {
  create(model: { [key: string]: any }): Promise<any>;
  read(id: string): Promise<any>;
  update(id: string, model: { [key: string]: any }): Promise<any>;
  delete(id: string): Promise<any>;
}
