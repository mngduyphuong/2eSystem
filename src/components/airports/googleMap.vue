<template>
  <div>
    <gmap-map
      :zoom="10"
      :center="center"
      style="width: 100%; height: 300px"
      @click="getLocation"
    >
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "AddGoogleMap",
  data() {
    return {
      center: {
        lat: -37.813629,
        lng: 144.963058,
      },
    };
  },
  methods: {
    getLocation(locationData) {
      this.$emit("emitLocation", locationData.latLng.toJSON());
    },
  },
};
</script>
