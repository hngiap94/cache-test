<template>
  <div>
    <div>Home</div>
    <button @click="clickBtn">Click me</button>
  </div>
</template>

<script>
import axios from "axios";
import cacheManagement from "@/cache/cacheManagement.js";
export default {
  name: "home",
  components: {},
  mounted() {},
  methods: {
    clickBtn() {
      let me = this;
      this.getAllData();
    },
    getAllData() {
      let me = this,
        data = null;
      if (cacheManagement.isCached(me.entityName)) {
        data = cacheManagement.getCacheItem(me.entityName);
      } else {
        data = me.callAPI();
      }
    },
    callAPI() {
      let me = this,
        data = null;
      axios
        .get(me.baseURL + me.entityName)
        .then(response => {
          // JSON responses are automatically parsed.
          data = response.data;
          cacheManagement.setCacheItem(me.entityName, data, 20*1000);
          return data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  data() {
    return {
      entityName: "accountobject",
      baseURL: "http://5d4d377404ba7100147039cc.mockapi.io/api/"
    };
  }
};
</script>
