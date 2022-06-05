<template>
  <div>
    <b-table :items="tableData" :fields="fields" striped responsive>
      <template #cell(details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
          variant="primary"
        >
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>
      <template #row-details="row">
        <connected-airlines :tableData="row.item.airlines"></connected-airlines>
      </template>

      <template #head(airlines)>
        <div class="text-center">No. Airlines</div>
      </template>
      <template #cell(airlines)="row">
        <div class="text-center">{{ row.item.airlines.length }}</div>
      </template>

      <template #cell(edit)="row">
        <b-button
          size="sm"
          v-b-modal.modal-1
          class="mr-2"
          variant="info"
          @click="setModalData(row.item)"
        >
          Edit
        </b-button>
      </template>

      <template #cell(delete)="row">
        <b-button
          size="sm"
          class="mr-2"
          variant="danger"
          @click="submitDelete(row.item.id)"
        >
          Delete
        </b-button>
      </template>
    </b-table>
    <airport-modal
      :modalData="modalData"
      :countryData="countryData"
      :airlineData="airlineData"
      @editAirport="submitEdit"
    ></airport-modal>
  </div>
</template>

<script>
import connectedAirlines from "./connectedAirlines.vue";
import airportModal from "./airportModal.vue";

export default {
  components: { connectedAirlines, airportModal },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Airport name",
        },
        {
          key: "country.name",
          label: "Country",
        },
        {
          key: "country.country_code",
          label: "Country Code",
          class: "text-center",
        },
        {
          key: "location.lat",
          label: "Latitude",
          class: "text-center",
        },
        {
          key: "location.lng",
          label: "Longitude",
          class: "text-center",
        },
        "airlines",
        "details",
        "edit",
        "delete",
      ],
      editModal: false,
      modalData: {},
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
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
  methods: {
    setModalData(data) {
      this.modalData = data;
    },
    submitEdit(id, name, country, location, airlines) {
      this.$emit("editAirport", id, name, country, location, airlines);
    },
    submitDelete(id) {
      this.$emit("deleteAirport", id);
    },
  },
};
</script>
