<template>
  <v-app>
    <v-app-bar v-if="showNavBar" absolute flat>
      <v-app-bar-title
        >Sistema nacional de vigilância epidemiológica
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex justify-center">
        <v-btn color="primary" variant="text" @click="logout">Sair</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";

import { useNavBarStore, useUserStore } from "@/stores";

export default defineComponent({
  name: "App",

  mounted() {
    this.loadUserState();
  },

  computed: {
    ...mapState(useNavBarStore, ["showNavBar"]),
  },

  methods: {
    ...mapActions(useUserStore, ["loadUserState", "resetUserState"]),

    logout() {
      this.resetUserState();
      this.$router.push({ name: "home" });
    },
  },
});
</script>
