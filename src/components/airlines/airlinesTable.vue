<template>
  <div>
    <b-table :items="tableData" :fields="fields" striped responsive>
      <template #cell(Edit)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          variant="primary"
          class="mr-2"
        >
          {{ row.detailsShowing ? "Cancel" : "Edit Details" }}
        </b-button>
      </template>
      <template #cell(Delete)="row">
        <b-button
          size="sm"
          @click="submitDelete(row.item.id)"
          variant="danger"
          class="mr-2"
        >
          Delete
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Airline Name:</b></b-col>
            <b-col
              ><b-form-input v-model="row.item.edit_name"></b-form-input
            ></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Country:</b></b-col>
            <b-col
              ><b-form-select
                v-model="row.item.edit_country"
                :options="countryData"
              ></b-form-select
            ></b-col>
          </b-row>
          <!-- {{row.item.edit_name}}
          {{row.item.edit_country}} -->

          <div class="text-center">
            <b-button
              size="sm"
              @click="
                submitEdit(
                  row.item.id,
                  row.item.edit_name,
                  row.item.edit_country
                )
              "
              variant="success"
              :disabled="!row.item.edit_name || !row.item.edit_country"
              >Submit</b-button
            >
          </div>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Airline name",
        },
        {
          key: "country.name",
          label: "Country",
        },
        {
          key: "country.country_code",
          label: "Country Code (ISO)",
          class: "text-center",
        },
        "Edit",
        "Delete",
      ],
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
  },
  methods: {
    submitEdit(id, name, country) {
      this.$emit("editAirlines", id, name, country);
    },
    submitDelete(id) {
      this.$emit("deleteAirlines", id);
    },
  },
};
</script>
