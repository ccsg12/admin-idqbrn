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
        <h3 v-if="edit">Editar doença</h3>
        <h3 v-else>Adicionar doença</h3>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="disease.name"
                density="comfortable"
                hide-details
                label="Nome"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="disease.prevention"
                density="comfortable"
                hide-details
                label="Prevenção"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="disease.treatment"
                density="comfortable"
                hide-details
                label="Tratamento"
                required
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

import type { Disease } from "@/stores";
import { useDiseaseStore } from "@/stores";
import { DiseasesService } from "@/services";
import { TypesHelper } from "@/helpers";

export default defineComponent({
  name: "EditUpdateDisease",

  props: {
    data: {
      type: Object as PropType<Disease>,
      default: () => ({
        id: null,
        name: "",
        prevenção: "",
        tratamento: "",
      }),
    },
    edit: { type: Boolean, default: false },
  },

  data() {
    return {
      dialog: false,
      disease: {
        id: this.data.id,
        name: this.data.name,
        prevention: this.data.prevention,
        treatment: this.data.treatment
      },
    };
  },

  methods: {
    ...mapActions(useDiseaseStore, ["createDisease", "updateDisease"]),

    create() {
      this.dialog = false;

      DiseasesService.create(
        TypesHelper.diseaseToApiDisease({ ...this.disease, cities: undefined })
      )
        .then((response) => {
          this.createDisease(TypesHelper.apiDiseaseToDisease(response));

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

      DiseasesService.update(
        TypesHelper.diseaseToApiDisease({ ...this.disease, cities: undefined })
      )
        .then(() => {
          this.updateDisease(this.disease);

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
