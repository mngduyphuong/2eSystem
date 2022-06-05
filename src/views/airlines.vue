<template>
  <div>
    <h2 class="text-center text-danger my-4">
      Create, Edit, Update and Delete airlines
    </h2>
    <airlines-create
      :countryData="countryData"
      @postAirlines="postAirline"
    ></airlines-create>
    <div class="text-center" v-if="this.loading">
      <b-spinner variant="primary"></b-spinner>
    </div>
    <airlines-table
      v-else
      :tableData="tableData"
      :countryData="countryData"
      @editAirlines="putAirline"
      @deleteAirlines="deleteAirline"
    ></airlines-table>
  </div>
</template>
<script>
const axios = require("axios").default;
// @ is an alias to /src
import airlinesTable from "@/components/airlines/airlinesTable.vue";
import airlinesCreate from "@/components/airlines/airlinesCreate.vue";

export default {
  name: "Home",
  components: { airlinesTable, airlinesCreate },
  data() {
    return {
      loading: true,
      tableData: [],
      countryData: [],
    };
  },
  created() {
    this.getDataAirline();
    this.getDataCountry();
  },
  methods: {
    getDataAirline() {
      this.loading = true;
      axios
        .get("/api/airline")
        .then((response) => {
          // handle success
          this.tableData = response.data.results;
          this.loading = false;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    getDataCountry() {
      axios
        .get("/api/country")
        .then((response) => {
          // handle success
          this.countryData = response.data.results.map((item) => {
            const tempData = {};
            tempData.text = item.name;
            tempData.value = item;
            return tempData;
          });
          this.loading = false;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    async postAirline(postData) {
      await axios({
        method: "post",
        url: `/api/airline`,
        data: {
          name: postData.name,
          country: postData.country,
        },
      });
      this.getDataAirline();
    },
    async putAirline(id, name, country) {
      await axios({
        method: "put",
        url: `/api/airline/${id}`,
        data: {
          name: name,
          country: country,
        },
      });
      this.getDataAirline();
    },
    async deleteAirline(id) {
      // console.log(id)
      await axios({
        method: "delete",
        url: `/api/airline/${id}`,
      });
      this.getDataAirline();
    },
  },
};
</script>
