<template>
  <div>
    <div class="text-end mb-5">
      <b-button v-b-modal.modal-airport variant="primary"
        >Create new Airport</b-button
      >
    </div>
    <!-- Creating modal -->
    <b-modal
      id="modal-airport"
      title="Create"
      hide-header-close
      @ok="handleOk"
      @cancel="handleCancel"
      @hide="handleCancel"
    >
      <!-- Input form that binded to local this.newData -->
      <b-row class="my-2">
        <b-col sm="2" class="my-auto">
          <label for="input-default">Airport name:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input v-model="newData.name" size="sm"></b-form-input>
        </b-col>
      </b-row>
      <!--  -->
      <b-row class="my-2">
        <b-col sm="2" class="my-auto">
          <label for="input-default">Country</label>
        </b-col>
        <b-col sm="10">
          <b-form-select
            v-model="newData.country"
            :options="countryData"
          ></b-form-select>
        </b-col>
      </b-row>
      <!--  -->
      <b-row class="my-2" v-if="!loading">
        <b-col sm="2" class="my-auto">
          <label for="input-default">Latitude</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            v-model="newData.location.lat"
            readonly
            size="sm"
          ></b-form-input>
        </b-col>
        <b-col sm="2" class="my-auto">
          <label for="input-default">Longitude</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            v-model="newData.location.lng"
            readonly
            size="sm"
          ></b-form-input>
        </b-col>
      </b-row>

      <!-- Google map that emit back Lat and Lng of click event -->
      <p class="text-danger">Click the map to set Lat and Lng</p>
      <google-map @emitLocation="updateLocation"></google-map>
    </b-modal>
  </div>
</template>

<script>
import googleMap from "./googleMap.vue";
export default {
  components: { googleMap },
  data() {
    return {
      newData: {
        name: "",
        country: {},
        location: {
          lat: 0,
          lng: 0,
        },
        airlines: [],
      },
      loading: false,
    };
  },
  props: {
    countryData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    updateLocation(locationData) {
      this.loading = true;
      this.newData.location = locationData;
      this.loading = false;
    },
    // Emit data
    handleOk() {
      this.$emit("postAirlines", this.newData);
    },
    // Reset input data if modal is close/hide
    handleCancel() {
      this.newData = {
        name: "",
        country: {},
        location: {
          lat: 0,
          lng: 0,
        },
        airlines: [],
      };
    },
  },
};
</script>

<style></style>
