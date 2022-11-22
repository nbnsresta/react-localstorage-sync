export type LSValue = string | null;
export type Listener = (value: LSValue) => void;

type LSSubscription = {
  unsubscribe: VoidFunction;
};

class LSStore {
  private _values: Record<string, LSValue> = {};
  private _callbacks: Record<string, Listener[]> = {};

  private constructor() {
    this._init();
  }

  private _init() {
    window.addEventListener('storage', this._changeHandler);
  }

  private _removeListener(key: string, listener: Listener) {
    const listeners = this._callbacks[key].filter(function(l) {
      return l !== listener;
    });
    if (listeners.length < 1) {
      this.removeKeyValues(key);
    }
  }

  private _changeHandler = () => {
    Object.keys(this._values).forEach(storeKey => {
      const storeValue = localStorage.getItem(storeKey);
      this._values[storeKey] = storeValue;
      this._callbacks[storeKey].forEach(function(listener) {
        listener(storeValue);
      });
    });
  };

  private removeKeyValues = (key: string) => {
    delete this._values[key];
    delete this._callbacks[key];
  };

  subscribe = (key: string, listener: Listener): LSSubscription => {
    const storeValue = localStorage.getItem(key);

    if (!(key in this._values)) {
      this._values[key] = storeValue;
      this._callbacks[key] = [];
    }

    this._callbacks[key].push(listener);

    return {
      unsubscribe: () => {
        this._removeListener(key, listener);
      },
    };
  };

  publish = (key: string, value: string) => {
    localStorage.setItem(key, value);
    this._values[key] = value;
    this._callbacks[key].forEach(function(listener) {
      listener(value);
    });
  };

  private static instance: LSStore;
  static getInstance() {
    if (!this.instance) {
      this.instance = new LSStore();
    }
    return this.instance;
  }
}

export default LSStore;
