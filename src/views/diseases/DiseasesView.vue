<template>
  <v-container class="full-page">
    <div>
      <h2 class="mb-4">Lista de doenças</h2>

      <update-create-disease />

      <v-table class="table" fixed-header height="500px">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Prevenção</th>
            <th>Tratamento</th>
            <th>Ações</th>
          </tr>

          <tr v-for="disease in diseases" :key="disease.id">
            <td>{{ disease.id }}</td>
            <td>{{ disease.name }}</td>
            <td>{{ disease.prevention }}</td>
            <td>{{ disease.treatment}}</td>
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
        </thead>
      </v-table>

      <div class="d-flex">
        <span
          v-if="page > 1"
          class="page-navigation"
          @click="() => changePage(-1)"
          >Anterior</span
        >

        <v-spacer></v-spacer>

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
    };
  },

  async mounted() {
    this.setShowNavBar(true);
    await this.loadDiseases(this.page);
  },

  computed: {
    ...mapState(useDiseaseStore, ["diseases", "next", "count"]),
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
    ...mapActions(useDiseaseStore, ["loadDiseases", "removeDisease"]),

    async changePage(value: number) {
      this.page += value;

      await this.loadDiseases(this.page);
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
