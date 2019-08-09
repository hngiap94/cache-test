// TODO: Không sử dụng JSON.stringify nếu value là string
// TODO: Viết hàm init cache rong đó có keyPrefix;
function initCache() {}

function setItem(entityName, value) {
  localStorage.removeItem(keyPrefix + entityName);
  localStorage.setItem(keyPrefix + entityName, value);
}

function getItem(entityName) {
  return localStorage.getItem(keyPrefix + entityName);
}

function removeItem(entityName) {
  localStorage.removeItem(keyPrefix + entityName);
}

function isCached(entityName) {
  try {
    // TODO: Kiểm tra nếu item quá hạn thì xóa đi, return false
    getItem(entityName);
    return true;
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

  if(expTime){
    // Lưu thông tin về thời gian hết hạn cache
    // setItem(...)
  } else{
    // Xóa thông tin cache trong trường hợp trước đó có set thời gian
    // removeItem(...)
  }
  return true;
}

function getCacheItem(entityName) {}
var cacheManagement = {
  isCached: isCached
};
export default cacheManagement;
