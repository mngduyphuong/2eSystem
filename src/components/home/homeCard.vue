<template>
  <b-row>
    <b-col sm class="align-items-stretch d-flex">
      <b-card
        title="Managing Airlines"
        :img-src="require('../../assets/airlines.jpg')"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="my-4 mx-auto align-items-stretch"
        footer-bg-variant="white"
      >
        <b-card-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, enim
          adipisci vel eaque voluptatum consequuntur
        </b-card-text>
        <template #footer>
          <b-button to="/airlines" variant="primary" class="py-2"
            >Managing Airlines</b-button
          >
        </template>
      </b-card>
    </b-col>
    <b-col sm class="align-items-stretch d-flex">
      <b-card
        title="Managing Airports"
        :img-src="require('../../assets/airports.jpg')"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="my-4 mx-auto"
        footer-bg-variant="white"
      >
        <b-card-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, enim
          adipisci vel eaque voluptatum consequuntur
        </b-card-text>
        <template #footer>
          <b-button to="/airports" variant="primary" class="py-2"
            >Managing Airports</b-button
          >
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {};
</script>

<style></style>
