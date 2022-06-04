<template>
  <div class="text-center">
    <b-img
      :src="require('../assets/airplane.png')"
      width="500px"
      fluid
      class="my-5"
    ></b-img>
    <h1>Welcome to 2E Airports management system</h1>
    <h3 class="text-danger">Making your business fly with 2e Systems</h3>
    <homeCard></homeCard>
  </div>
</template>

<script>
// @ is an alias to /src
import homeCard from "@/components/home/homeCard.vue";

export default {
  name: "Home",
  components: {homeCard},
};
</script>
