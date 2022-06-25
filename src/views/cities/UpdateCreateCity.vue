<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="edit"
        color="warning"
        icon="mdi-pencil"
        size="x-small"
        v-bind="props"
      />
      <v-btn v-else color="primary" v-bind="props">Adicionar</v-btn>
    </template>

    <v-card class="card">
      <v-card-title>
        <h3 v-if="edit">Editar cidade</h3>
        <h3 v-else>Adicionar cidade</h3>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="city.name"
                density="comfortable"
                hide-details
                label="Nome"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="city.ibgeCode"
                density="comfortable"
                hide-details
                label="Código IBGE"
                required
                type="number"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="city.state"
                density="comfortable"
                hide-details
                label="Estado"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="city.population"
                density="comfortable"
                hide-details
                label="População"
                required
                type="number"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="city.latitude"
                density="comfortable"
                hide-details
                label="Latitude"
                required
                type="number"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="city.longitude"
                density="comfortable"
                hide-details
                label="Longitude"
                required
                type="number"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="dialog = false">Fechar</v-btn>

        <v-btn
          color="primary"
          text
          @click="
            () => {
              edit ? update() : create();
            }
          "
          >Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import { mapActions } from "pinia";

import type { City } from "@/stores";
import { useCitiesStore } from "@/stores";
import { CitiesService } from "@/services";
import { TypesHelper } from "@/helpers";

export default defineComponent({
  name: "UpdateCreateCity",

  props: {
    data: {
      type: Object as PropType<City>,
      default: () => ({
        id: null,
        name: "",
        ibgeCode: null,
        latitude: null,
        longitude: null,
        population: null,
        state: "",
      }),
    },
    edit: { type: Boolean, default: false },
  },

  data() {
    return {
      dialog: false,
      city: {
        id: this.data.id,
        name: this.data.name,
        ibgeCode: this.data.ibgeCode,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        population: this.data.population,
        state: this.data.state,
      },
    };
  },

  methods: {
    ...mapActions(useCitiesStore, ["createCity", "updateCity"]),

    create() {
      this.dialog = false;

      CitiesService.create(
        TypesHelper.cityToApiCity({ ...this.city, cases: undefined })
      )
        .then((response) => {
          this.createCity(TypesHelper.apiCityToCity(response));

          this.$swal({
            icon: "success",
            title: "Sucesso",
            text: "Cidade criada com sucesso.",
          });
        })
        .catch(() => {
          this.$swal({
            icon: "error",
            title: "Erro",
            text: "Ocorreu um erro na criação.",
          });
        });
    },

    update() {
      this.dialog = false;

      CitiesService.update(
        TypesHelper.cityToApiCity({ ...this.city, cases: undefined })
      )
        .then(() => {
          this.updateCity(this.city);

          this.$swal({
            icon: "success",
            title: "Sucesso",
            text: "Cidade atualizada com sucesso.",
          });
        })
        .catch(() => {
          this.$swal({
            icon: "error",
            title: "Erro",
            text: "Ocorreu um erro na atualização.",
          });
        });
    },
  },
});
</script>
