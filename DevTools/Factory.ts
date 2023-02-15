import { Entity } from './Entity';

export class Factory {
  private static indexedItems: { [key: string]: Entity } = {};

  public static new(model: any, ctor: any) {
    if (typeof model === 'string') model = { _id: model };

    if (model?._id) {
      const cacheItem = Factory.addItem(model, ctor);

      if (Object.keys(cacheItem.value).length === 1) {
        cacheItem.load();
      }

      return cacheItem;
    } else {
      return new ctor(model);
    }
  }

  public static deleteItem(id) {}

  private static addItem(model, ctor) {
    if (!Factory.indexedItems[model._id]) {
      Factory.indexedItems[model._id] = new ctor(model);
    }

    return Factory.indexedItems[model._id];
  }
}
