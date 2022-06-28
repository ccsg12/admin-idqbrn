<template>
  <v-container class="full-page">
    <div>
      <h2 class="mb-4">Lista de doenças</h2>

      <update-create-disease />

      <v-table class="table" fixed-header height="400px">
        <thead>
          <tr>
            <th class="table-title">Id</th>
            <th class="table-title">Nome</th>
            <th class="table-title">Prevenção</th>
            <th class="table-title">Tratamento</th>
            <th class="table-title">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="disease in diseases" :key="disease.id">
            <td>{{ disease.id }}</td>
            <td>{{ disease.name }}</td>
            <td>
              {{
                disease.prevention.length > 23
                  ? disease.prevention.slice(0, 20) + "..."
                  : disease.prevention
              }}
            </td>
            <td>
              {{
                disease.treatment.length > 23
                  ? disease.treatment.slice(0, 20) + "..."
                  : disease.treatment
              }}
            </td>
            <td>
              <update-create-disease :data="disease" :edit="true" />

              <v-btn
                class="ml-2"
                color="error"
                icon="mdi-trash-can-outline"
                size="x-small"
                @click="() => deleteDisease(disease.id)"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <div class="d-flex">
        <span
          v-if="page > 1"
          class="page-navigation"
          @click="() => changePage(-1)"
          >Anterior</span
        >

        <v-spacer />

        <span>
          {{ (page - 1) * perPage + 1 }} -
          {{ page * perPage < count ? page * perPage : count }} de
          {{ count }}
        </span>

        <v-spacer />

        <span v-if="next" class="page-navigation" @click="() => changePage(1)"
          >Próxima</span
        >
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";

import { useDiseaseStore, useNavBarStore } from "@/stores";
import UpdateCreateDisease from "./UpdateCreateDisease.vue";

import "./styles.scss";
import { DiseasesService } from "@/services";

export default defineComponent({
  name: "DiseasesView",

  components: {
    UpdateCreateDisease,
  },

  data() {
    return {
      page: 1,
      perPage: 20,
    };
  },

  async mounted() {
    this.setShowNavBar(true);
    await this.loadDiseases(this.page, this.perPage);
  },

  computed: {
    ...mapState(useDiseaseStore, ["diseases", "next", "count"]),
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
    ...mapActions(useDiseaseStore, ["loadDiseases", "removeDisease"]),

    async changePage(value: number) {
      this.page += value;

      await this.loadDiseases(this.page, this.perPage);
    },

    async deleteDisease(id: number) {
      const result = await this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: "Você deseja mesmo deletar esse registro?",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        DiseasesService.remove(id)
          .then(() => {
            this.removeDisease(id);

            this.$swal({
              icon: "success",
              title: "Sucesso",
              text: "Registro removido com sucesso.",
            });
          })
          .catch(() => {
            this.$swal({
              icon: "error",
              title: "Erro",
              text: "Ocorreu um erro ao tentar remover o registro.",
            });
          });
      }
    },
  },
});
</script>
