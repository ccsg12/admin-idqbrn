<template>
  <v-container class="full-page d-flex flex-column justify-center">
    <div>
      <div>
        <h2 class="title">Adicionar novos casos</h2>

        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="newCase.disease"
                :items="diseases"
                bg-color="#fff"
                density="compact"
                label="Doença"
                variant="outlined"
              />

              <v-select
                v-model="newCase.state"
                :items="states"
                bg-color="#fff"
                density="compact"
                label="Estado"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="newCase.city"
                bg-color="#fff"
                density="compact"
                label="Cidade"
                variant="outlined"
              />

              <v-text-field
                v-model="newCase.quantity"
                bg-color="#fff"
                density="compact"
                label="Quantidade"
                type="number"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-form>
      </div>

      <span class="separator">Ou</span>

      <div>
        <h2 class="title">Adicionar novos casos via upload</h2>

        <v-file-input
          bg-color="#fff"
          density="compact"
          variant="outlined"
        ></v-file-input>
      </div>

      <div class="d-flex justify-center">
        <v-btn class="app-button confirm-button" color="primary"
          >Confirmar Adição
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";

import { useNavBarStore } from "@/stores";

import "./styles.scss";

export default defineComponent({
  name: "AdminView",
  data() {
    return {
      diseases: ["Covid19", "Gripe", "Dengue"],
      states: [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins",
      ],
      newCase: {
        disease: "",
        state: "",
        quantity: 0,
        city: "",
      },
    };
  },

  mounted() {
    this.setShowNavBar(true);
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
  },
});
</script>
