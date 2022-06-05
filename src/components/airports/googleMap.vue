<template>
  <div>
    <!-- Simple google map API, rendered using vue2-google-maps library  -->
    <!-- click event of the map are implemented-->
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
    // Function from Google map API: MapMouseEvent
    // https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng
    getLocation(locationData) {
      this.$emit("emitLocation", locationData.latLng.toJSON());
    },
  },
};
</script>
