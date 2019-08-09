<template>
  <div>
    <div>Home</div>
  </div>
</template>

<script>
import axios from "axios";
import cacheManagement from "@/cache/cacheManagement.js";
export default {
  name: "home",
  components: {},
  mounted() {
    debugger;
  },
  methods: {
    getAllData() {
      let me = this,
        data = null;
      if (cacheManagement.isCached()) {
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
          cacheManagement.cacheItem(me.entityName, data);
          return data;
        })
        .catch(e => {
          debugger;
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
