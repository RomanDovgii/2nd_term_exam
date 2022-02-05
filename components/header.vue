<template>
  <div v-frag>
    <v-app-bar style="max-height: 64px;">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        <div>
          <NuxtLink to="/" style="text-decoration: none; color: #fff">
          Регистрация погодных событий на Марсе "Илонус"
          </NuxtLink>
        </div>
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list>
        <div v-if="!side_panel.events">
          <v-progress-circular
          indeterminate
          color="red"
          >
          </v-progress-circular>
        </div>
        <div v-else>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title>
                Registered events: {{side_panel.events}}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import frag from "vue-frag";

  export default {
    directives: {
      frag
    },
    name: `Header`,
    data: () => ({
      drawer: false,
    }),
    computed: {
      side_panel: function () {
        this.$store.dispatch('GET_SIDE_DATA');
        return this.$store.getters.GET_SIDE_DATA;
      }
    }
  };
</script>
