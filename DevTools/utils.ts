export const joinValues = (currentValue, newValue) => {
  if (newValue === null || newValue === undefined) return currentValue;
  if (currentValue === null || currentValue === undefined) return newValue;

  if (newValue.constructor === Object) {
    if (currentValue.constructor !== Object) return { ...newValue };
    else {
      for (const key in newValue) {
        currentValue[key] = joinValues(currentValue[key], newValue[key]);
      }
    }
  }

  if (newValue.constructor === Array) {
    return [...newValue];
  }

  return newValue;
};

export const hasNewContent = (currentValue, newValue) => {
  if (currentValue === null || currentValue === undefined) return true;

  if (newValue.constructor === Object) {
    if (currentValue.constructor !== Object) return true;
    else {
      for (const key in newValue) {
        if (hasNewContent(currentValue[key], newValue[key])) return true;
      }
    }
  } else if (newValue.constructor === Array) {
    if (currentValue.constructor !== Array) return true;
    else if (currentValue.length !== newValue.length) return true;
    else
      for (const key in newValue) {
        if (hasNewContent(currentValue[key], newValue[key])) return true;
      }
  } else if (newValue.constructor === Date) {
    if (currentValue.constructor !== Date) return true;
    else {
      return newValue.getTime() !== currentValue.getTime();
    }
  } else {
    return currentValue !== newValue;
  }

  return false;
};

export const getNewContent = (currentValue, newValue) => {
  const newContent = {};

  for (const key in newValue) {
    if (hasNewContent(currentValue[key], newValue[key])) {
      newContent[key] = newValue[key];
    }
  }

  return newContent;
};

export const hasValue = (value: any) => {
  if (value === undefined || value === null) return false;

  if (value.constructor === Object) {
    return Object.keys(value).length > 0;
  } else if (typeof value === "string" || value.constructor === Array) {
    return value.length > 0;
  }

  return true;
};

export const Event = (options: { debounceTime?: number } = {}) => {
  const listeners: any[] = [];

  const subscribe = (listener: any) => {
    listeners.push(listener);
  };

  let lastValue: any;
  const next = (value: any) => {
    if (hasValue(options.debounceTime)) {
      lastValue = value;
      setTimeout(() => {
        listeners.forEach(listener => listener(value));
      }, options.debounceTime);
    } else {
      listeners.forEach(listener => listener(value));
    }
  };

  return {
    subscribe,
    next,
  };
};
