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
          @change="selectFile($event)"
        ></v-file-input>
      </div>

      <div class="d-flex justify-center">
        <v-btn class="app-button confirm-button" color="primary" @click="upload"
          >Confirmar Adição
        </v-btn>
      </div>
    </div>
    <v-text-field
                v-model="message"
                bg-color="#fff"
                density="compact"
                label="Quantidade"
                type="number"
                variant="outlined"
              />
    <v-alert v-if="message" color="blue-grey" dark>
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";

import { useNavBarStore } from "@/stores";
import UploadService from "@/services/UploadFilesService";

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
        text:"",
      },
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: []
    };
  },

  mounted() {
    this.setShowNavBar(true);
  
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
    selectFile(event: { target: { files: undefined[]; }; }) {
      this.progress = 0;
      this.currentFile = event?.target?.files[0];
      console.log("foi");
    },
    upload() {
      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }
      this.message = "";
      UploadService.upload(this.currentFile, (event: { loaded: number; total: number; }) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          return;
        })
        
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });
    },
  },
});
</script>
