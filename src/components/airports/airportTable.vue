<template>
  <div>
    <!-- Render table with prop data from parent, fields options are declared localy -->
    <b-table :items="tableData" :fields="fields" striped responsive>
      <!-- Custom render header of the table -->
      <template #head(airlines)>
        <div class="text-center">No. Airlines</div>
      </template>
      <template #cell(airlines)="row">
        <div class="text-center">{{ row.item.airlines.length }}</div>
      </template>

      <!-- Show associated airlines of airports-->
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
        <!-- associated airlines are rendered with an addition table -->
        <!-- Data is prop with airlines of current row airports: row.item-->
        <connected-airlines :tableData="row.item.airlines"></connected-airlines>
      </template>

      <!-- Edit button will open another child modal, all data is processed locally before emitting and submiting to db-->
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

      <!-- Delete current airport by querry airport id -->
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

    <!-- Edit modal -->
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
