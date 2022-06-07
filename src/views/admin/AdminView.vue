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

              <multiselect
                v-model="newCase.state"
                :options="states"
                class="mb-4"
                label="name"
                object
                placeholder="Estado"
                value-prop="abbreviation"
              />
            </v-col>

            <v-col cols="12" md="6">
              v-

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

    <v-alert v-if="message" color="blue-grey" dark>
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import Multiselect from "@vueform/multiselect";

import { useCitiesStore, useDiseaseStore, useNavBarStore } from "@/stores";
import { UploadFilesService } from "@/services";

import "./styles.scss";

const uploadFilesService = new UploadFilesService();

export default defineComponent({
  name: "AdminView",

  components: {
    Multiselect,
  },

  data() {
    return {
      states: [
        {
          name: "Acre",
          abbreviation: "AC",
        },
        {
          name: "Alagoas",
          abbreviation: "AL",
        },
        {
          name: "Bahia",
          abbreviation: "BA",
        },
        {
          name: "Ceará",
          abbreviation: "CE",
        },
        {
          name: "Distrito Federal",
          abbreviation: "DF",
        },
        {
          name: "Espírito Santo",
          abbreviation: "ES",
        },
        {
          name: "Goiás",
          abbreviation: "GO",
        },
        {
          name: "Maranhão",
          abbreviation: "MA",
        },
        {
          name: "Mato Grosso",
          abbreviation: "MT",
        },
        {
          name: "Mato Grosso do Sul",
          abbreviation: "MS",
        },
        {
          name: "Minas Gerais",
          abbreviation: "MG",
        },
        {
          name: "Pará",
          abbreviation: "PA",
        },
        {
          name: "Paraíba",
          abbreviation: "PB",
        },
        {
          name: "Paraná",
          abbreviation: "PR",
        },
        {
          name: "Pernambuco",
          abbreviation: "PE",
        },
        {
          name: "Piauí",
          abbreviation: "PI",
        },
        {
          name: "Rio de Janeiro",
          abbreviation: "RJ",
        },
        {
          name: "Rio Grande do Norte",
          abbreviation: "RN",
        },
        {
          name: "Rio Grande do Sul",
          abbreviation: "RS",
        },
        {
          name: "Rondônia",
          abbreviation: "RO",
        },
        {
          name: "Roraima",
          abbreviation: "RR",
        },
        {
          name: "Santa Catarina",
          abbreviation: "SC",
        },
        {
          name: "São Paulo",
          abbreviation: "SP",
        },
        {
          name: "Sergipe",
          abbreviation: "SE",
        },
        {
          name: "Tocantins",
          abbreviation: "TO",
        },
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
      message: "",
      fileInfos: [],
    };
  },

  async mounted() {
    this.setShowNavBar(true);
    // await this.loadUserDetails();
    await this.loadCities();
  },

  computed: {
    ...mapState(useCitiesStore, ["cities"]),
    ...mapState(useDiseaseStore, ["diseases"]),
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
    ...mapActions(useCitiesStore, ["loadCities"]),
    // ...mapActions(useUserStore, ["loadUserDetails"]),

    selectFile(event: { target: { files: undefined[] } }) {
      this.progress = 0;
      this.currentFile = event?.target?.files[0];
    },

    upload() {
      if (!this.currentFile) {
        this.message = "Por favor selecione um arquivo.";
        return;
      }

      this.message = "";

      uploadFilesService
        .upload(this.currentFile, (event) => {
          this.progress = Math.round((100 * event.loaded) / event.total);
        })
        .then((response) => {
          this.message = response.data.message;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Não foi possível fazer o upload do arquivo.";
          this.currentFile = undefined;
        });
    },
  },
});
</script>
