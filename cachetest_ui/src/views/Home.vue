<template>
  <div>
    <div>Home</div>
    <button @click="clickBtn">Click me</button>
  </div>
</template>

<script>
import axios from "axios";
import inMemmoryCache from "@/cache/inMemmoryCache.js";
export default {
  name: "home",
  components: {},
  mounted() {},
  methods: {
    clickBtn() {
      let me = this;
      me.getAllData();
    },
  },
  data() {
    return {
      entityName: "accountobject",
      baseURL: "http://5d4d377404ba7100147039cc.mockapi.io/api/"
    };
  }
};
</script>
