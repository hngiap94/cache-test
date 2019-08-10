class cacheManagement {
  constructor() {
    let me = this;
    me.keyPrefix = "mscache-";
  }

  /**
   * Sử dụng để khởi tạo cache
   * @param {Object} options các options
   */
  initCache(options) {
    let me = this;
    if (options) {
      for (let option in options) {
        me[option] = options[option];
      }
    }
  }

  isSupportStorage() {
    // TODO: Kiểm tra nếu trình duyệt hỗ trợ localStorage
  }

  isSupportJSON() {
    return window.JSON != null;
  }

  isOutOfSpace() {
    // TODO: Kiểm tra nếu storage bị đầy
  }

  isStorageAvailable() {
    // TODO: Kiểm tra nếu storage sẵn sàng để sử dụng, bao gồm hỗ trợ localStorage, JSON, có thể thêm 1 item
  }

  isCacheExpired(expTime) {
    let now = new Date(),
      currentTime = now.getTime();
    if (currentTime > expTime) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Set localStorage Item
   * @param {String} entityName key
   * @param {*} value value
   */
  setItem(entityName, value) {
    let me = this;
    value = JSON.stringify(value);
    try {
      localStorage.setItem(me.keyPrefix + entityName, value);
      return true;
    } catch (e) {
      // TODO: Kiểm tra nếu storage đầy thì xóa bớt cache cũ đi
      console.log(e);
      return false;
    }
  }

  /**
   * Get localStorage Item
   * @param {String} entityName key
   */
  getItem(entityName) {
    let me = this,
      cachedValue = JSON.parse(localStorage.getItem(me.keyPrefix + entityName));
    if (cachedValue) {
      if (!me.isCacheExpired(cachedValue.expiration)) {
        return cachedValue.data;
      }
    }
    return null;
  }

  /**
   * Remove localStorage Item
   * @param {String} entityName key
   */
  removeItem(entityName) {
    let me = this;
    localStorage.removeItem(me.keyPrefix + entityName);
  }

  /**
   * Kiểm tra nếu item đã được cache
   * @param {String} entityName
   */
  isCached(entityName) {
    let me = this;
    try {
      // TODO: Kiểm tra nếu item quá hạn thì xóa đi, return false
      let item = me.getItem(entityName);
      if (item !== null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Set cache item
   * @param {String} entityName
   * @param {*} value
   * @param {Date} expTime
   * @return {Boolean} true nếu set thành công, false nếu có lỗi xảy ra
   */
  setCacheItem(entityName, data, time) {
    // TODO: Kiểm tra storage available
    let me = this,
      cacheValue = {};

    // Nếu undefined, chuyển thành null
    if (data === undefined) {
      data = null;
    }
    cacheValue.data = data;

    if (time) {
      // time: miliseconds
      // Lưu thông tin về thời gian hết hạn cache
      let now = new Date(),
        currentTime = now.getTime(),
        expTime = currentTime + time;
      cacheValue.expiration = expTime;
    }
    return me.setItem(entityName, cacheValue);
  }

  getCacheItem(entityName) {
    return this.getItem(entityName);
  }
  removeCacheItem() {}
  removeAllCacheItem() {}
}

export default new cacheManagement();
