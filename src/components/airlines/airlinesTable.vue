<template>
  <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
        <template #cell(test)="row">
        {{row.item}}
      </template>
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Cancel" : "Edit Details" }} 
        </b-button>
      </template>
      <template #cell(delete)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            Delete
        </b-button>

      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
      
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["first_name", "last_name", "test","show_details", "delete"],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        {
          isActive: false,
          age: 89,
          first_name: "Geneva",
          last_name: "Wilson",
          _showDetails: true,
        },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>
