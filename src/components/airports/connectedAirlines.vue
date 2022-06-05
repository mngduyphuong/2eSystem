<template>
  <div>
    <b-card bg-variant="light">
      <b-table hover :items="tableData" :fields="fields"></b-table>
    </b-card>
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
          key: "depart.name",
          label: "Depart from",
        },
        {
          key: "landing.name",
          label: "Landing to",
        },
       
      ],
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
