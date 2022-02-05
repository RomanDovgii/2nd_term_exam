<template>
  <v-app>
    <Header/>
    <v-main>
      <div v-if="!aboutContent">
        <v-progress-circular
        indeterminate
        color="red"
        >
        </v-progress-circular>
      </div>
      <div v-else>
      <div v-if="aboutContent">
        <v-container>
            <p v-html="aboutContent.text"></p>
        </v-container>
      </div>
      </div>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
  import Header from '../components/header.vue';
  import Footer from '../components/footer.vue';

  export default {
    components: {
      Header,
      Footer
    },
    computed: {
      aboutContent: function () {
        this.$store.dispatch('GET_ABOUT_DATA');
        return this.$store.getters.GET_ABOUT_US_DATA;
      },
    }
  };
</script>
