<template>
  <v-container class="full-page d-flex flex-column justify-center">
    <div>
      <div>
        <h2 class="title mb-8">Adicionar novos casos</h2>

        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="newCase.disease"
                :items="diseases"
                bg-color="#fff"
                density="compact"
                disabled
                label="Doença"
                variant="outlined"
              />

              <v-select
                v-model="newCase.state"
                :items="states"
                bg-color="#fff"
                density="compact"
                disabled
                label="Estado"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="newCase.city"
                bg-color="#fff"
                density="compact"
                disabled
                label="Cidade"
                variant="outlined"
              />

              <v-text-field
                v-model="newCase.quantity"
                bg-color="#fff"
                density="compact"
                disabled
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
        <h3 class="title mb-8">(Apenas arquivos CSV)</h3>

        <v-file-input
          :loading="progress"
          accept=".csv"
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";

import { useNavBarStore } from "@/stores";
import { UploadFilesService } from "@/services";

import "./styles.scss";

const uploadFilesService = new UploadFilesService();

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
        text: "",
      },
      currentFile: undefined,
      progress: 0,
      fileInfos: [],
    };
  },

  async mounted() {
    this.setShowNavBar(true);
    // await this.loadUserDetails();
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
    // ...mapActions(useUserStore, ["loadUserDetails"]),

    selectFile(event: { target: { files: undefined[] } }) {
      this.progress = 0;
      this.currentFile = event?.target?.files[0];
    },

    upload() {
      if (!this.currentFile) {
        this.$swal({
          icon: "error",
          title: "Erro",
          text: "Por favor, selecione um arquivo válido.",
        });
        return;
      }

      uploadFilesService
        .upload(this.currentFile, (event) => {
          this.progress = Math.round((100 * event.loaded) / event.total);
        })
        .then((response) => {
          this.progress = 0;

          this.$swal({
            icon: "success",
            title: "Sucesso",
            text: response.message,
          });
        })
        .catch(() => {
          this.progress = 0;
          this.$swal({
            icon: "error",
            title: "Erro",
            text: "Não foi possível fazer o upload do arquivo.",
          });
          this.currentFile = undefined;
        });
    },
  },
});
</script>
