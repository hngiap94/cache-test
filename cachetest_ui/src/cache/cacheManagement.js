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
    me.isCacheInitialized = true;

    // Tự động gọi API nếu storage khả dụng và có cài đặt thời gian
    if (me.isStorageAvailable() && me.timeInterval) {
      setInterval(function() {
        me.getItemFromAPI()
          .then(res => {
            me.setCacheItem(res);
            console.log("set interval:", res);
          })
          .catch(err => {
            console.log(err);
          });
      }, me.timeInterval);
    }
  }

  /**
   * Kiểm tra cache đã khởi tạo thành công chưa
   */
  isSuccessInitialized() {
    let me = this;
    if (me.baseURL && me.entityName) {
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

  key(n) {
    let me = this;
    return localStorage.key(n);
  }

  keys() {
    let me = this,
      length = localStorage.length,
      keys = [];

    for (let i = 0; i < length; i++) {
      let itemKey = me.key(i); // Lấy ra key của từng item
      if (itemKey.indexOf(me.keyPrefix) === 0) {
        keys.push(itemKey.substring(me.keyPrefix.length));
      }
    }

    return keys;
  }

  /**
   * Gọi API lấy dữ liệu
   */
  async getItemFromAPI() {
    let me = this;
    try {
      let res = await axios.get(me.baseURL + me.entityName);
      if (res) {
        return res.data;
      }
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
    let me = this,
      now = new Date(),
      currentTime = now.getTime();
    let item = {
      data: value,
      timestamp: currentTime
    };
    item = JSON.stringify(item);

    try {
      me.setItem(me.entityName, item);
    } catch (e) {
      if (me.isOutOfSpace(e)) {
        let storedItems = [],
          itemKeys = me.keys();
        for (let key in itemKeys) {
          let item = me.getItem(key);
          storedItems.push({
            key: key,
            size: (item || "").length,
            timestamp: item.timestamp
          });
        }
        storedItems.sort(function(firstItem, secondItem) {
          return secondItem.timestamp - firstItem.timestamp;
        });

        let targetSize = (value || "").length;

        while (storedItems.length && targetSize > 0) {
          let storedItem = storedItems.pop();
          console.log(
            `Cache đầy, đang tiến hành xóa item với key là: '${key}'`
          );
          me.removeItem(key);
          targetSize -= storedItem.size;
        }

        try {
          me.setItem(me.entityName, value);
        } catch (e) {
          console.log("Không thể thêm item, có thể do kích thước quá lớn!!!");
        }
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
    if (me.storageAvailable) {
      let item = me.getItem(me.entityName);
      if (item) {
        item = JSON.parse(item);
        console.log("cached:", item.data);
        // return item.data;
      } else {
        me.getItemFromAPI().then(res => {
          me.setCacheItem(res);
          console.log("uncached:", res);
          // return res;
        });
      }
    } else {
      // me.getItemFromAPI().then(res => {
      //   return res;
      // });
    }
  }
}
export default new cacheManagementV2();

// TODO: Sửa lại luồng implement hàm async getItemFromAPI
// TODO: Test trường hợp storage đầy
// TODO: Test trường hợp storage không khả dụng
// TODO: Thêm hàm tính size để nếu sau này sử dụng tới
// TODO: Thêm một số hàm cơ bản của storage API (vd remove all, ...)