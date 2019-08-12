import axios from "axios";

class cacheManagementV2 {
  constructor() {
    let me = this;
    me.keyPrefix = "ms-cache-";
  }

  keyPrefix = "";

  baseURL = "";

  entityName = "";

  timeInterval = 0;

  storageAvailable = false;

  isCacheInitialized = false;

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

    // Nếu chưa khởi tạo thành công, skip
    if (!me.isSuccessInitialized()) {
      return;
    }

    // Tự động gọi API nếu storage khả dụng và có cài đặt thời gian
    if (me.isStorageAvailable() && me.timeInterval) {
      setInterval(function() {
        let value = me.getItemFromAPI();
        if (value) {
          me.setCacheItem(value);
        }
      }, me.timeInterval);
    }
  }

  /**
   * Kiểm tra cache đã khởi tạo thành công chưa
   */
  isSuccessInitialized() {
    let me = this;
    if (me.baseURL && me.entityName) {
      me.isCacheInitialized = true;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Kiểm tra nếu trình duyệt hỗ  trợ localStorage
   * Một số trình duyệt báo lỗi khi truy cập localStorage
   */
  isSupportStorage() {
    try {
      return (
        typeof localStorage !== undefined &&
        "setItem" in localStorage &&
        !!localStorage.setItem
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * Kiểm tra nếu trình duyệt hỗ trợ JSON
   */
  isSupportJSON() {
    return window.JSON != null;
  }

  /**
   * Kiểm tra nếu local storage đầy
   * @param {Error} e
   */
  isOutOfSpace(e) {
    return (
      e &&
      (e.name === "QUOTA_EXCEEDED_ERR" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
        e.name === "QuotaExceededError")
    );
  }

  /**
   * Kiểm tra tính khả dụng của localStorage
   */
  isStorageAvailable() {
    let me = this,
      testKey = "test-key",
      testValue = "test-value";

    if (me.isSupportStorage() && me.isSupportJSON()) {
      try {
        me.setItem(testKey, testValue);
        me.removeItem(testKey);
        me.storageAvailable = true;
        return true;
      } catch (e) {
        if (me.isOutOfSpace(e) && localStorage.length) {
          me.storageAvailable = true;
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  /**
   * Set localStorage Item
   * @param {String} key
   * @param {*} value
   */
  setItem(key, value) {
    let me = this;
    localStorage.removeItem(me.keyPrefix + key);
    localStorage.setItem(me.keyPrefix + key, value);
  }

  /**
   * Get localStorage Item
   * @param {String} key
   */
  getItem(key) {
    let me = this;
    return localStorage.getItem(me.keyPrefix + key);
  }

  removeItem(key) {
    let me = this;
    localStorage.removeItem(me.keyPrefix + key);
  }

  /**
   * Gọi API lấy dữ liệu
   */
  async getItemFromAPI() {
    let me = this;
    try {
      let res = await axios.get(me.baseURL + me.entityName);
      if (res) {
        // me.setCacheItem(res.data);
        // await setTimeout(function(){
        //   console.log('API')
        // }, 5000);
        return res.data;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Set cache item
   * Nếu bộ nhớ cache đầy thì xóa bớt cache cũ đi
   * @param {*} value
   */
  setCacheItem(value) {
    let me = this;
    value = JSON.stringify(value);

    try {
      me.setItem(me.entityName, value);
    } catch (e) {
      // TODO: Kiểm tra nếu storage đầy thì xóa bớt cache cũ đi
      if (me.isOutOfSpace(e)) {
        console.log("Đầy bộ nhớ localStorage");
      } else {
        console.log("Không thể thêm item:", e);
      }
    }
  }

  /**
   * get cache item
   * Chưa khởi tạo cache sẽ thông báo cho dev
   * Nếu storage không khả dụng sẽ chỉ gọi API lấy dữ liệu
   * Nếu chưa được cache sẽ gọi API lấy dữ liệu đồng thời cache lại dữ liệu
   */
  getCacheItem() {
    let me = this;

    // Kiểm tra đã khởi tạo chưa
    if (!me.isCacheInitialized) {
      alert("Cache chưa khởi tạo hoặc khởi tạo không đúng cách!!!");
      return;
    }

    // Nếu storage không khả dụng, chỉ gọi API lấy dữ liệu
    // TODO: Kiểm tra lại luồng async
    // TODO: chuyển hàm thành async và trả về một promise
    if (me.storageAvailable) {
      let value = me.getItem(me.entityName);
      if (value) {
        return JSON.parse(value);
      } else {
        return me.getItemFromAPI();
      }
    } else {
      return me.getItemFromAPI();
    }
  }
}
export default new cacheManagementV2();
