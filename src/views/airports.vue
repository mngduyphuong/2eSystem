<template>
  <div>
    <h2 class="text-center text-danger my-4">
      Create, Edit, Update and Delete airports
    </h2>

    <!-- Create new airport pop-up modal, data from child then emit to parent to process  -->
    <airportCreate
      :countryData="countryData"
      @postAirlines="postAirport"
    ></airportCreate>

    <!-- Loading when API is calling and waiting for result -->
    <!-- Re-render the table after loading -->
    <div class="text-center" v-if="this.loading">
      <b-spinner variant="primary"></b-spinner>
    </div>

    <!-- Prop: current airports, data of airlines and countries-->
    <airport-table
      v-else
      :tableData="tableData"
      :countryData="countryData"
      :airlineData="airlineData"
      @editAirport="putAirport"
      @deleteAirport="deleteAirport"
    ></airport-table>
  </div>
</template>

<script>
const axios = require("axios").default;
import airportCreate from "@/components/airports/airportCreate.vue";
import airportTable from "@/components/airports/airportTable.vue";

export default {
  name: "Home",
  components: { airportTable, airportCreate },
  data() {
    return {
      loading: true,
      tableData: [],
      countryData: [],
      airlineData: [],
    };
  },
  async created() {
    // Init required data: current airports; countries and airlines for select input
    await this.getDataAirport();
    this.getDataCountry();
    this.getDataAirline();
  },
  methods: {
    //Get required data
    getDataAirport() {
      this.loading = true;
      axios
        .get("/api/airport")
        .then((response) => {
          this.tableData = response.data.results;
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // Airlines and Countries data are processed to match Boostrap select input
    getDataAirline() {
      this.loading = true;
      axios
        .get("/api/airline")
        .then((response) => {
          this.airlineData = response.data.results.map((item) => {
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
    getDataCountry() {
      axios
        .get("/api/country")
        .then((response) => {
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

    // PUT,POST,DELETE data emitted from child
    async postAirport(postData) {
      await axios({
        method: "post",
        url: `/api/airport`,
        data: {
          name: postData.name,
          country: postData.country,
          location: postData.location,
          airlines: [],
        },
      });
      this.getDataAirport();
    },
    async putAirport(id, name, country, location, airlines) {
      await axios({
        method: "put",
        url: `/api/airport/${id}`,
        data: {
          name: name,
          country: country,
          location: location,
          airlines: airlines,
        },
      });
      this.getDataAirport();
    },
    async deleteAirport(id) {
      await axios({
        method: "delete",
        url: `/api/airport/${id}`,
      });
      this.getDataAirport();
    },
  },
};
</script>

<style></style>
