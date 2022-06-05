<template>
  <div>
    <b-modal
      id="modal-1"
      title="Editing airport"
      hide-header-close
      size="lg"
      @ok="handleOk"
    >
      <!-- !!!!!!!  All edited data are Binded to local this.tempData and process before emit !!!!!!!!  -->
      <!-- DATA ONLY EMITTED BACK TO PARENT IF USER CLICK OK ON 1ST-LAYER MODAL -->

      <!-- Edit name input -->
      <b-row class="my-2">
        <b-col sm="2" class="my-auto">
          <label for="input-default">Airport name:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input v-model="tempData.name" size="sm"></b-form-input>
        </b-col>
      </b-row>

      <!-- Edit available countries from db by select input -->
      <b-row class="my-2">
        <b-col sm="2" class="my-auto">
          <label for="input-default">Country</label>
        </b-col>
        <b-col sm="10">
          <b-form-select
            v-model="tempData.country"
            :options="countryData"
          ></b-form-select>
        </b-col>
      </b-row>

      <!--Lat and Lng are READONLY and set by clicking the map-->
      <b-row class="my-2" v-if="!loading">
        <b-col sm="2" class="my-auto">
          <label for="input-default">Latitude</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            v-model="newLocation.lat"
            readonly
            size="sm"
          ></b-form-input>
        </b-col>
        <b-col sm="2" class="my-auto">
          <label for="input-default">Longitude</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            v-model="newLocation.lng"
            readonly
            size="sm"
          ></b-form-input>
        </b-col>
      </b-row>
      <p class="text-danger">Click the map to set Lat and Lng</p>
      <!-- Google map that emit the Lat and Lng data -->
      <google-map @emitLocation="updateLocation"></google-map>
      <hr />

      <!--  -->
      <!-- Associated airlines: listed by table + Add function -->
      <b-row>
        <b-col><h4>Associated airlines</h4></b-col>
        <b-col class="text-end">
          <!-- Button to open 2nd layer modal to add new connected airlines -->
          <b-button
            size="sm"
            class="mr-2"
            variant="primary"
            v-b-modal.modal-add
          >
            Add new airlines</b-button
          >
        </b-col>
      </b-row>
      <!-- Re-render with loading key to update local data -->
      <div :key="loading">
        <b-table hover :items="tempData.airlines" :fields="fields" class="my-2">
          <!-- Delete current connected airlines -->
          <template #cell(delete)="row">
            <b-button
              size="sm"
              class="mr-2"
              variant="danger"
              @click="removeAirline(row.item)"
            >
              Delete
            </b-button>
          </template>

          <!-- Edit current connected airlines -->
          <template #cell(edit)="row">
            <b-button
              size="sm"
              class="mr-2"
              variant="info"
              @click="row.toggleDetails"
            >
              {{ row.detailsShowing ? "Hide" : "Edit" }}
            </b-button>
          </template>
          <!-- edit form -->
          <template #row-details="row">
            <b-card>
              <b-row class="my-2">
                <b-col class="my-auto">
                  <label for="input-default">Name</label><br />
                  <b-form-select
                    v-model="row.item.detail"
                    :options="airlineData"
                  ></b-form-select>
                </b-col>
                <b-col class="my-auto">
                  <label for="input-default">Depart</label><br />
                  <b-form-select
                    v-model="row.item.depart"
                    :options="countryData"
                  ></b-form-select>
                </b-col>
                <b-col class="my-auto">
                  <label for="input-default">Landing</label><br />
                  <b-form-select
                    v-model="row.item.landing"
                    :options="countryData"
                  ></b-form-select>
                </b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
      </div>
    </b-modal>

    <!--  -->
    <!-- 2nd layer modal to add new airlines-->
    <b-modal
      id="modal-add"
      size="sm"
      title="Add associated airlines"
      ok-only
      hide-header-close
      @ok="addNewAirline"
    >
      <label for="input-default">Name</label><br />
      <b-form-select
        v-model="addAirline.detail"
        :options="airlineData"
      ></b-form-select
      ><br />
      <label for="input-default">Depart</label><br />
      <b-form-select
        v-model="addAirline.depart"
        :options="countryData"
      ></b-form-select
      ><br />
      <label for="input-default">Landing</label><br />
      <b-form-select
        v-model="addAirline.landing"
        :options="countryData"
      ></b-form-select>
    </b-modal>
  </div>
</template>

<script>
import googleMap from "./googleMap.vue";
export default {
  components: { googleMap },
  data() {
    return {
      loading: 0,
      fields: [
        {
          key: "detail.name",
          label: "Airline name",
        },
        {
          key: "depart.name",
          label: "Depart from",
        },
        {
          key: "landing.name",
          label: "Landing to",
        },
        "edit",
        "delete",
      ],
      addAirline: {},
      newLocation: {},
    };
  },
  props: {
    modalData: {
      type: Object,
      default: () => {},
    },
    countryData: {
      type: Array,
      default: () => [],
    },
    airlineData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    tempData: {
      get: function () {
        return JSON.parse(JSON.stringify(this.modalData));
      },
    },
  },
  methods: {
    // Add/Delete airlines to local data this.tempData
    async addNewAirline() {
      this.loading = 1;
      await this.tempData.airlines.push(this.addAirline);
      this.addAirline = {};
      this.loading = 0;
    },
    removeAirline(airline) {
      this.loading = 1;
      // Filtering out airlines from local this.tempData with matching value
      this.tempData.airlines = this.tempData.airlines.filter(
        (item) => item !== airline
      );
      this.loading = 0;
    },

    // Update current location from GooogleMap click event
    updateLocation(locationData) {
      this.loading = true;
      this.newLocation = locationData;
      this.loading = false;
    },

    // Emit all local eddited data to parent to work with db
    handleOk() {
      this.$emit(
        "editAirport",
        this.tempData.id,
        this.tempData.name,
        this.tempData.country,
        this.newLocation,
        this.tempData.airlines
      );
    },
  },
};
</script>

<style></style>
