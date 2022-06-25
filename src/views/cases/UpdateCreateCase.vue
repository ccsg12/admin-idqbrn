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
        <h3 v-if="edit">Editar casos</h3>
        <h3 v-else>Adicionar casos</h3>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <multiselect
                v-model="diseaseChosen"
                :disabled="data.diseaseId"
                :options="resumedDiseases"
                label="name"
                object
                placeholder="Doença"
                value-prop="id"
              />
            </v-col>

            <v-col cols="12" md="6">
              <multiselect
                v-model="cityChosen"
                :disabled="data.cityId"
                :options="resumedCities"
                label="name"
                object
                placeholder="Cidade"
                value-prop="id"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="occurrences"
                bg-color="white"
                density="dense"
                hide-details
                label="Quantidade"
                required
                type="number"
                variant="solo"
              />
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
import { mapActions, mapState } from "pinia";
import Multiselect from "@vueform/multiselect";

import type { Case, ResumedCity, ResumedDisease } from "@/stores";
import { useCasesStore, useCitiesStore, useDiseaseStore } from "@/stores";
import { CasesService } from "@/services";
import { TypesHelper } from "@/helpers";

export default defineComponent({
  name: "UpdateCreateCase",

  components: { Multiselect },

  props: {
    data: {
      type: Object as PropType<Case>,
      default: () => ({
        id: null,
        cityId: null,
        diseaseId: null,
        total: null,
      }),
    },
    edit: { type: Boolean, default: false },
  },

  data() {
    return {
      dialog: false,
      diseaseChosen: null as ResumedDisease | null,
      cityChosen: null as ResumedCity | null,
      occurrences: this.data.total,
    };
  },

  mounted() {
    if (this.data?.diseaseId) {
      this.diseaseChosen =
        this.resumedDiseases.find(({ id }) => id === this.data.diseaseId) ??
        null;
    }

    if (this.data?.cityId) {
      this.cityChosen =
        this.resumedCities.find(({ id }) => id === this.data.cityId) ?? null;
    }
  },

  computed: {
    ...mapState(useDiseaseStore, ["resumedDiseases"]),
    ...mapState(useCitiesStore, ["resumedCities"]),
  },

  methods: {
    ...mapActions(useCasesStore, ["createCase", "updateCase"]),

    create() {
      this.dialog = false;

      if (this.diseaseChosen && this.cityChosen) {
        const payload: Case = {
          id: 0,
          total: this.occurrences,
          diseaseId: this.diseaseChosen.id,
          cityId: this.cityChosen.id,
        };

        CasesService.create(TypesHelper.caseToApiCase(payload))
          .then((response) => {
            this.createCase(TypesHelper.apiCaseToCase(response));

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
      }
    },

    update() {
      this.dialog = false;

      if (
        this.data?.id &&
        this.occurrences &&
        this.cityChosen &&
        this.diseaseChosen
      ) {
        const payload: Case = {
          id: this.data.id,
          total: this.occurrences,
          diseaseId: this.diseaseChosen.id,
          cityId: this.cityChosen.id,
        };

        CasesService.update(TypesHelper.caseToApiCase(payload))
          .then(() => {
            this.updateCase(payload);

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
      }
    },
  },
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
