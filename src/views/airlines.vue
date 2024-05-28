<template>
  <div>
    <h2 class="text-center text-danger my-4">
      Create, Edit, Update and Delete airlines
    </h2>

    <!-- Create function in pop-up modal, data from child then emit to parent to process -->
    <airlines-create
      :countryData="countryData"
      @postAirlines="postAirline"
    ></airlines-create>

    <!-- Loading when API is calling and waiting for result -->
    <!-- Re-render the table after loading -->
    <div class="text-center" v-if="this.loading">
      <b-spinner variant="primary"></b-spinner>
    </div>

    <!-- Table with Airlines data-->
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
    //init required data in created hook
    this.getDataAirline();
    this.getDataCountry();
  },
  methods: {
    //Init data: current airlines and countries
    getDataAirline() {
      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_API_URL}/api/airline`)
        .then((response) => {
          this.tableData = response.data.results;
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDataCountry() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/api/country`)
        .then((response) => {
          // Process response data to match Vue-Boostrap select input
          this.countryData = response.data.results.map((item) => {
            const tempData = {};
            tempData.text = item.name;
            tempData.value = item;
            return tempData;
          });
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // Data is process in childs and emit back to parent to process: PUT,POST,DELETE
    async postAirline(postData) {
      await axios({
        method: "post",
        url: `${process.env.VUE_APP_API_URL}/api/airline`,
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
        url: `${process.env.VUE_APP_API_URL}/api/airline/${id}`,
        data: {
          name: name,
          country: country,
        },
      });
      this.getDataAirline();
    },
    async deleteAirline(id) {
      await axios({
        method: "delete",
        url: `${process.env.VUE_APP_API_URL}/api/airline/${id}`,
      });
      this.getDataAirline();
    },
  },
};
</script>
