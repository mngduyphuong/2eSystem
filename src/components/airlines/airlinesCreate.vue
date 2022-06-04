<template>
  <div>
    <div class="text-end mb-5">
      <b-button v-b-modal.modal-1 variant="primary" >Create new Airline</b-button>
    </div>

    <b-modal id="modal-1" title="Create" hide-header-close @ok="handleOk">
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
      <template #modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button variant="danger" @click="cancel()"> Cancel </b-button>
        <b-button variant="primary" @click="ok()"> Submit </b-button>
        <!-- Button with custom close trigger value -->
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
    handleOk() {
      this.$emit("postAirlines", this.newData);
    },
  },
};
</script>

<style></style>
