<template>
  <v-container class="full-page d-flex">
    <v-row justify="center">
      <v-col class="d-flex flex-column justify-center" cols="12" md="6" xl="4">
        <div class="login-form-container">
          <div class="form-header">
            <h2 class="header-title">Entre no admin</h2>
            <span class="header-subtitle">Insira seu e-mail e senha</span>
          </div>

          <v-form>
            <v-text-field
              v-model="email"
              density="compact"
              label="E-mail"
              variant="outlined"
            />

            <v-text-field
              v-model="password"
              :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordVisible ? 'text' : 'password'"
              density="compact"
              label="Senha"
              variant="outlined"
              @click:append-inner="passwordVisible = !passwordVisible"
            />
          </v-form>

          <v-btn
            block
            class="app-button"
            color="primary"
            rounded="lg"
            size="large"
            @click="login"
            >Entrar
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";

import { useNavBarStore, useUserStore } from "@/stores";

import "./styles.scss";

export default defineComponent({
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
      passwordVisible: false,
    };
  },

  mounted() {
    this.navBarStore.setShowNavBar(false);
  },

  computed: {
    ...mapStores(useNavBarStore, useUserStore),
  },

  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      await this.userStore.login(payload);
      await this.$router.push({ name: "upload" });
    },
  },
});
</script>
