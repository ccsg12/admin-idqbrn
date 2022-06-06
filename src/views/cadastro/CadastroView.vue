<template>
  <v-container class="full-page d-flex">
    <v-row justify="center">
      <v-col class="d-flex flex-column justify-center" cols="12" md="6" xl="4">
        <div class="login-form-container">
          <div class="form-header">
            <h2 class="header-title">Cadastro de novo usuário</h2>
            <span class="header-subtitle">Insira os dados do novo usuário</span>
          </div>

          <v-form>
            <v-text-field
              v-model="name"
              density="compact"
              label="Nome"
              placeholder="Joao Antunes"
              variant="outlined"
            />

            <v-text-field
              v-model="funcao"
              density="compact"
              label="Função ID"
              placeholder=""
              variant="outlined"
            />

            <v-text-field
              v-model="email"
              density="compact"
              label="E-mail"
              placeholder="joao@email.com"
              variant="outlined"
            />

            <v-text-field
              v-model="password"
              :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordVisible ? 'text' : 'password'"
              density="compact"
              label="Senha"
              placeholder="********"
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
            >Cadastrar
          </v-btn>
          
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";


import type { User } from "@/stores";
import { useNavBarStore, useUserStore } from "@/stores";

import "./styles.scss";

export default defineComponent({
  name: "CadastroView",

  data() {
    return {
      name: "",
      email: "",
      funcao:"",
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
    login() {
     
    },
  },
});
</script>
