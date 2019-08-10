// TODO: Không sử dụng JSON.stringify nếu value là string
// TODO: Viết hàm init cache trong đó có keyPrefix;
function initCache(options) {
  let me = this;
  if (options) {
    for (let option in options) {
      me[option] = options[option];
    }
  }
}

function setItem(entityName, value) {
  let me = this;
  localStorage.removeItem(me.keyPrefix + entityName);
  localStorage.setItem(me.keyPrefix + entityName, value);
}

function getItem(entityName) {
  let me = this;
  return localStorage.getItem(me.keyPrefix + entityName);
}

function removeItem(entityName) {
  let me = this;
  localStorage.removeItem(me.keyPrefix + entityName);
}

function isCached(entityName) {
  try {
    // TODO: Kiểm tra nếu item quá hạn thì xóa đi, return false
    let item = getItem(entityName);
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

function setCacheItem(entityName, value, expTime) {
  // TODO: Kiểm tra support storage
  // TODO: Kiểm tra support JSON

  // Nếu undefined, chuyển thành null
  if (value === undefined) {
    value = null;
  }
  value = JSON.stringify(value);
  try {
    setItem(entityName, value);
  } catch (e) {
    // TODO: Kiểm tra nếu storage đầy thì xóa bớt cache cũ đi
    console.log(e);
    return false;
  }

  if (expTime) {
    // Lưu thông tin về thời gian hết hạn cache
    // setItem(...)
  } else {
    // Xóa thông tin cache trong trường hợp trước đó có set thời gian
    // removeItem(...)
  }
  return true;
}

function getCacheItem(entityName) {}
var cacheManagement = {
  keyPrefix: "ms-cache",
  initCache: initCache,
  getItem: getItem,
  isCached: isCached
};
export default cacheManagement;
