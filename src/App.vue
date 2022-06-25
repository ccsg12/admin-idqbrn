<template>
  <v-app>
    <v-app-bar v-if="showNavBar" absolute flat>
      <v-app-bar-nav-icon variant="text" @click="drawer = !drawer" />

      <v-app-bar-title
        >Sistema nacional de vigilância epidemiológica
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex justify-center">
        <v-btn color="primary" variant="text" @click="logout">Sair</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" bottom temporary>
      <v-list @click:select="(item) => goToPage(item.id)">
        <v-list-item prepend-icon="mdi-chart-bar" title="Casos" value="cases" />

        <v-list-item
          prepend-icon="mdi-virus"
          title="Doenças"
          value="diseases"
        />

        <v-list-item
          prepend-icon="mdi-home-city"
          title="Cidades"
          value="cities"
        />

        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Usuários"
          value="users"
        />

        <v-list-item prepend-icon="mdi-upload" title="Upload" value="upload" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";

import { useDiseaseStore, useNavBarStore, useUserStore } from "@/stores";

export default defineComponent({
  name: "App",

  data() {
    return {
      drawer: false,
    };
  },

  async mounted() {
    this.loadUserState();
    await this.loadDiseasesWithCities();
  },

  computed: {
    ...mapState(useNavBarStore, ["showNavBar"]),
  },

  methods: {
    ...mapActions(useUserStore, ["loadUserState", "resetUserState"]),
    ...mapActions(useDiseaseStore, ["loadDiseasesWithCities"]),

    logout() {
      this.resetUserState();
      this.$router.push({ name: "home" });
    },

    goToPage(page: string) {
      this.$router.push({ name: page });
    },
  },
});
</script>
