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
import localStorageCache from "@/cache/localStorageCache.js";
import inMemmoryCache from "@/cache/inMemmoryCache.js";
export default {
  methods: {
    async testFnc() {
      
    },
    initCache() {
      // localStorageCache.initCache({
      //   baseURL: "http://5d4d377404ba7100147039cc.mockapi.io/api/",
      //   entityName: "accountobject",
      //   timeInterval: 20000
      // });
    },
    getItem() {
      let data = inMemmoryCache.getCacheItem('accountobject');
      // localStorageCache.getCacheItem();
    }
  }
};
</script>