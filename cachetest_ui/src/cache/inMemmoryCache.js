import axios from "axios";

class inMemoryCache {
  constructor() {
    let me = this;
    me.keyPrefix = "mscache-";
    me.baseURL = "http://5d4d377404ba7100147039cc.mockapi.io/api/";
  }

  //#region Local variable

  cache = {}; // TODO: Bien nay co phai local khong?

  keyPrefix = "";

  baseURL = "";

  timeout = 0;

  debug = false;

  //#endregion

  initCache(options) {
    let me = this;
    if (options && me.validateOptions(options)) {
      for (let option of options) {
        me[option] = options[option];
      }
    }
  }

  validateOptions(options) {
    if (options) {
      // TODO: validate keyPrefix
      // TODO: validate baseURL
      // TODO: validate entityName
      // TODO: validate timeout
      // TODO: validate debug
    }

    return true;
  }

  setItem(key, value) {
    let me = this;
    me.cache[me.keyPrefix + key] = JSON.stringify(value);
  }

  getItem(key) {
    let me = this;
    return JSON.parse(me.cache[me.keyPrefix + key]);
  }

  removeItem(key) {
    let me = this;
    delete me.cache[key];
  }

  async fetchFromAPI(key) {
    let me = this;
    try {
      let res = await axios.get(me.baseURL + key);
      if (res) {
        return res.data;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  setCacheItem(key, value, timeout) {
    let me = this;

    if (me.debug) {
      console.log("caching: %s = %j (@%s)", key, value, timeout);
    }
    fetchFromAPI;
    let oldItem = me.getItem(key);
    if (oldItem) {
      clearTimeout(oldItem.timeoutFnc);
    }

    let item = {
      data: value,
      timeout: timeout
    };

    if (!isNaN(item.timeout)) {
      item.timeoutFnc = setTimeout(function() {
        me.removeCacheItem(key);
      }, timeout);
    }

    me.setItem(key, item);
  }

  async getCacheItem(key) {
    let me = this;
    let oldItem = me.getItem(key);
    if (oldItem) {
      return oldItem;
    } else {
      let newItem = me.fetchFromAPI(key);
      me.setCacheItem(newItem);
      return newItem;
    }
  }
  removeCacheItem(key) {
    let me = this;
    me.removeItem(key);
  }
  clearCache() {}
}

export default new inMemoryCache();