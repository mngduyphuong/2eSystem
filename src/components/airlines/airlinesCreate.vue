<template>
  <div>
    <!-- Create Button -->
    <div class="text-end mb-5">
      <b-button v-b-modal.modal-1 variant="primary"
        >Create new Airline</b-button
      >
    </div>
    <!-- Pop-up modal to input data -->
    <b-modal
      id="modal-1"
      title="Create"
      hide-header-close
      @ok="handleOk"
      @cancel="handleCancel"
      @hide="handleCancel"
    >
      <!-- Data form, new Airline details are binded to this.newData object -->
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-right"><b>Airline Name:</b></b-col>
        <b-col><b-form-input v-model="newData.name"></b-form-input></b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-right"><b>Country:</b></b-col>
        <b-col
          ><b-form-select
            v-model="newData.country"
            :options="countryData"
          ></b-form-select
        ></b-col>
      </b-row>

      <!-- Custom modal footer, buttons -->
      <template #modal-footer="{ cancel, ok }">
        <b-button variant="danger" @click="cancel()"> Cancel </b-button>
        <b-button
          variant="primary"
          @click="ok()"
          :disabled="!newData.name || !newData.country"
        >
          Submit
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newData: {},
    };
  },
  props: {
    countryData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // Emit back to parent with data from the form
    handleOk() {
      this.$emit("postAirlines", this.newData);
    },
    // Reset input if modal is close/hide
    handleCancel() {
      this.newData = {};
    },
  },
};
</script>

<style></style>
