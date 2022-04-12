<template>
  <v-container class="full-page">
    <div>
      <div class="d-flex justify-center mb-10">
        <h2>Adicionar novos casos</h2>
      </div>

      <v-form>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="newCase.disease"
              :items="diseases"
              density="compact"
              label="Doença"
              variant="outlined"
            />

            <v-select
              v-model="newCase.state"
              :items="states"
              density="compact"
              label="Estado"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="newCase.city"
              density="compact"
              label="Cidade"
              variant="outlined"
            />

            <v-text-field
              v-model="newCase.quantity"
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
      <div class="d-flex justify-center mb-10">
        <h2>Adicionar novos casos via upload</h2>
      </div>

      <v-file-input variant="outlined"></v-file-input>
    </div>

    <div class="d-flex justify-center">
      <v-btn class="app-button confirm-button" color="primary"
        >Confirmar Adição
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import "./styles.scss";

export default defineComponent({
  name: "RegisterDiseaseView",
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
});
</script>
