<template>
  <v-card
    width="250px"
    margin-left="225px"
    height="100%"
  >

    <div v-if="acid_power">
      <v-img src="/rain_img.jpg"></v-img>
    </div>
    <div v-if="earthquake_power">
      <v-img src="/earthquake_img.jpg"></v-img>
    </div>
    <div v-if="wind_speed">
      <v-img src="/hurricane_img.jpg"></v-img>
    </div>

    
    <v-card-title>{{type}}</v-card-title>
    <v-card-text>Victims: {{victims}}</v-card-text>
    <div v-if="acid_power">
      <v-card-text>Acid Power: {{acid_power}}</v-card-text>
    </div>
    <div v-if="earthquake_power">
      <v-card-text>Earthquake Power: {{earthquake_power}}</v-card-text>
    </div>
    <div v-if="wind_speed">
      <v-card-text>Wind Speed: {{wind_speed}}</v-card-text>
    </div>
    <v-card-text>Date: {{date}}</v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: `EventCard`,
    props: [
      'type',
      'acid_power',
      'wind_speed',
      'acid_power',
      'earthquake_power',
      'victims',
      'date',
      'id',
    ]
  };
</script>
