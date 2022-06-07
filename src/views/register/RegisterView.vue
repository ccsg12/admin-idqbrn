<template>
  <v-container class="full-page d-flex">
    <v-row justify="center">
      <v-col class="d-flex flex-column justify-center" cols="12" md="6" xl="4">
        <div class="register-form-container">
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

            <v-select
              v-model="roleChosen"
              :items="rolesNames"
              density="compact"
              label="Função"
              no-data-text="Nenhuma função foi carregada."
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
            @click="registerUser"
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

import { useNavBarStore, useUserStore } from "@/stores";

import "./styles.scss";
import { UsersService } from "@/services";

export default defineComponent({
  name: "RegisterView",

  data() {
    return {
      name: "",
      email: "",
      roleChosen: "",
      roles: [
        {
          id: 1,
          role: "Administrador",
        },
        {
          id: 2,
          role: "Editor",
        },
      ],
      password: "",
      passwordVisible: false,
    };
  },

  mounted() {
    this.navBarStore.setShowNavBar(false);
  },

  computed: {
    ...mapStores(useNavBarStore, useUserStore),

    rolesNames(): string[] {
      return this.roles.map(({ role }) => role);
    },

    role(): number | undefined {
      return this.roles.find(({ role }) => role === this.roleChosen)?.id;
    },
  },

  methods: {
    async registerUser() {
      const payload = {
        email: this.email,
        name: this.name,
        password: this.password,
        role: this.role,
      };

      await UsersService.registerUser(payload);
    },
  },
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
