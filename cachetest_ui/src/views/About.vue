<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="testFnc">test</button>
    <button @click="initCache">init cache</button>
    <button @click="getItem">get cache item</button>
  </div>
</template>
<script>
import axios from "axios";
import cacheManagement from "@/cache/cacheManagementV2.js";
export default {
  methods: {
    async testFnc() {
      console.log(cacheManagement.keyPrefix);
      console.log(cacheManagement.baseURL);
      console.log(cacheManagement.entityName);
      console.log(cacheManagement.timeInterval);
      console.log(cacheManagement.storageAvailable);
      console.log(cacheManagement.isCacheInitialized);
    },
    initCache() {
      cacheManagement.initCache({
        baseURL: "http://5d4d377404ba7100147039cc.mockapi.io/api/",
        entityName: "accountobject",
        timeInterval: 20000
      });
    },
    // async getItem(){
    //   let data = await cacheManagement.getCacheItem();
    //   console.log(data);
    // }
    // getItem() {
    //   let data = cacheManagement.getCacheItem().then(res => {
    //     console.log(res);
    //   });
    // }
    getItem() {
      cacheManagement.getCacheItem();
    }
  }
};
</script>