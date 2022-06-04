<template>
  <div class="about">
    <h2 class="text-center text-danger my-4">
      Create, Edit, Update and Delete airlines
    </h2>
    <div class="text-center" v-if="this.loading">
      <b-spinner variant="primary"></b-spinner>
    </div>
    <airlines-table v-else></airlines-table>
  </div>
</template>
<script>
const axios = require("axios").default;
// @ is an alias to /src
import airlinesTable from "@/components/airlines/airlinesTable.vue";

export default {
  name: "Home",
  components: { airlinesTable },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      axios
        .get("/api/country")
        .then((response) => {
          // handle success
          console.log(response);
          // this.setResults(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>
