<template>
  <div>
    <h2 class="text-center text-danger my-4">
      Create, Edit, Update and Delete airports
    </h2>
    <airportCreate
      :countryData="countryData"
      @postAirlines="postAirport"
    ></airportCreate>
    <div class="text-center" v-if="this.loading">
      <b-spinner variant="primary"></b-spinner>
    </div>
    <airport-table
      v-else
      :tableData="tableData"
      :countryData="countryData"
      @editAirport="putAirport"
      @deleteAirport="deleteAirport"
    ></airport-table>
  </div>
</template>

<script>
const axios = require("axios").default;
// @ is an alias to /src
import airportCreate from "@/components/airports/airportCreate.vue";
import airportTable from "@/components/airports/airportTable.vue";
export default {
  name: "Home",
  components: { airportTable, airportCreate},
  data() {
    return {
      loading: true,
      tableData: [],
      countryData: [],
    };
  },
  created() {
    this.getDataAirport();
    this.getDataCountry();
  },
  methods: {
    getDataAirport() {
      this.loading = true;
      axios
        .get("/api/airport")
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
