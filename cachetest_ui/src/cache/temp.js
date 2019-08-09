export default class cacheManagement {
    cachePrefix = "mscache-";
    cacheSufix = "-cacheexpiration";
    expTime = null;
    reloadTime = null;
  
    /**
     * Kiểm tra nếu có thể sử dụng localStorage
     */
    isSupportStorage() {
      return true;
    }
    /**
     * Kiểm tra nếu storage bị đầy
     */
    isOutOfSpace() {
      return false;
    }
  
    /**
     * Kiểm tra nếu trình duyệt hỗ trợ JSON
     */
    isSupportJSON() {
      return true;
    }
  
    /**
     * Trả về giá trị key cho item có thời hạn
     * @param {String} key
     */
    getExpirationKey(key) {
      return key + this.cacheSufix;
    }
  
    getItem(key) {
      return localStorage.getItem(this.cachePrefix + key);
    }
    setItem(key, value) {
      localStorage.removeItem(this.cachePrefix + key);
      localStorage.setItem(this.cachePrefix + key, value);
    }
    removeItem(key) {
      localStorage.removeItem(this.cachePrefix + key);
    }
  
    setCacheItem(key, value, time) {
      if (!this.isSupportStorage()) return false;
      if (!this.isSupportJSON()) return false;
  
      try {
        value = JSON.stringify(value);
      } catch (e) {
        return false;
      }
  
      try {
        this.setItem(key, value);
      } catch (e) {
        // TODO: Kiểm tra nếu storage đầy thì xóa bớt các item cũ đi
        console.log(e);
      }
    }
    getCacheItem(key) {
      if (!this.isSupportStorage()) return false;
      if (!this.isSupportJSON()) return false;
  
      // TODO: Nếu item đã hết hạn, remove và gọi lại api
      // if (flushExpiredItem(key)) {
      // }
  
      let value = getItem(key);
      try {
        return JSON.parse(value);
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  
    removeCacheItem(key) {
      if (!this.isSupportStorage()) return;
      this.removeItem(key);
    }
  
    removeAllItems() {}
  
    removeExpiredItem() {}
  }
  