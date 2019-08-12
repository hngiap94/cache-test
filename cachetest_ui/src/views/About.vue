<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="testFnc">test</button>
    <button @click="initCache">init cache</button>
    <button @click="getItem">get cache item</button>
  </div>
</template>
<script>
import cacheManagementV2 from "@/cache/cacheManagementV2.js";
export default {
  methods: {
    testFnc() {
      console.log(cacheManagementV2.keyPrefix);
      console.log(cacheManagementV2.baseURL);
      console.log(cacheManagementV2.entityName);
      console.log(cacheManagementV2.timeInterval);
      console.log(cacheManagementV2.storageAvailable);
      console.log(cacheManagementV2.isCacheInitialized);
    },
    initCache() {
      cacheManagementV2.initCache({
        baseURL: "http://5d4d377404ba7100147039cc.mockapi.io/api/",
        entityName: "accountobject"
      });
    },
    // async getItem(){
    //   let data = await cacheManagementV2.getCacheItem();
    //   console.log(data);
    // }
    getItem() {
      let data = cacheManagementV2.getCacheItem().then(res => {
        console.log(res);
      });
    }
  }
};
</script>