<template>
  <v-app>
    <Header/>
    <v-main>
      <div v-if="(!Object.keys(homeContent) === 0) && (events.length === 0)">
        <v-progress-circular
        indeterminate
        color="red"
        >
        </v-progress-circular>
      </div>
      <div v-else>
      <v-container>
        <v-container>
          <v-img v-bind:src="homeContent.image" style="background-color: #ffffff; height: 200px; object-fit: cover;"></v-img>
          <p v-html="homeContent.text">
          </p>
        </v-container>
      </v-container>
      <v-container>
        <Form/>
      </v-container>
      <div v-if="events.length !== 0">
        <v-container>
          <v-row align="stretch">
            <v-col
              v-for="event in events"
              v-bind:key="event.id"
              cols = 2
              >
                <div v-if="event.acid_power">
                  <EventCard
                  v-bind:type = event.type
                  v-bind:acid_power = event.acid_power
                  v-bind:victims = event.victims
                  v-bind:date = event.date
                  v-bind:id = event.id
                  />
                </div>
                <div v-if="event.earthquake_power">
                  <EventCard
                  v-bind:type = event.type
                  v-bind:earthquake_power = event.earthquake_power
                  v-bind:victims = event.victims
                  v-bind:date = event.date
                  v-bind:id = event.id
                  />
                </div>
                <div v-if="event.wind_speed">
                  <EventCard
                  v-bind:type = event.type
                  v-bind:wind_speed = event.wind_speed
                  v-bind:victims = event.victims
                  v-bind:date = event.date
                  v-bind:id = event.id
                  />
                </div>
                
            </v-col>
          </v-row>
        </v-container>
      </div>
      </div>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
  import EventCard from '../components/event-card.vue';
  import Header from '../components/header.vue';
  import Footer from '../components/footer.vue';
  import Form from '../components/form.vue';

  export default {
    components: {
      Header,
      Footer,
      EventCard,
      Form
    },
    computed: {
      homeContent: function () {
        this.$store.dispatch('GET_HOME_DATA');
        return this.$store.getters.GET_HOME_DATA;
      },
      events: function () {
        this.$store.dispatch('GET_EVENTS_DATA');
        return this.$store.getters.GET_EVENTS_DATA;
      }
    }
  };
</script>
