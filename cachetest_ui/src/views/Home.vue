<template>
<div>
  <div>Home</div>
  <p>{{books}}</p>
</div>
  
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  components: {},
  methods: {
    getAll() {
      axios
        .get(`http://localhost:5000/api/books`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.books = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  data() {
    return {
      books: [],
      errors: []
    };
  },
  created() {
    this.getAll();
  }
};
</script>
