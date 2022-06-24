<template>
  <v-container class="full-page">
    <div>
      <h2 class="mb-4">Lista de cidades</h2>

      <update-create-city />

      <v-table class="table" fixed-header height="500px">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Código IBGE</th>
            <th>Estado</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>População</th>
            <th>Ações</th>
          </tr>

          <tr v-for="city in cities" :key="city.id">
            <td>{{ city.id }}</td>
            <td>{{ city.name }}</td>
            <td>{{ city.ibgeCode }}</td>
            <td>{{ city.state }}</td>
            <td>{{ city.latitude }}</td>
            <td>{{ city.longitude }}</td>
            <td>{{ city.population }}</td>
            <td>
              <update-create-city :data="city" :edit="true" />

              <v-btn
                class="ml-2"
                color="error"
                icon="mdi-trash-can-outline"
                size="x-small"
                @click="() => deleteCity(city.id)"
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

import { useCitiesStore, useNavBarStore } from "@/stores";
import UpdateCreateCity from "./UpdateCreateCity.vue";

import "./styles.scss";
import { CitiesService } from "@/services";

export default defineComponent({
  name: "CitiesView",

  components: {
    UpdateCreateCity,
  },

  data() {
    return {
      page: 1,
    };
  },

  async mounted() {
    this.setShowNavBar(true);
    await this.loadCities(this.page);
  },

  computed: {
    ...mapState(useCitiesStore, ["cities", "next", "count"]),
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
    ...mapActions(useCitiesStore, ["loadCities", "removeCity"]),

    async changePage(value: number) {
      this.page += value;

      await this.loadCities(this.page);
    },

    async deleteCity(id: number) {
      const result = await this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: "Você deseja mesmo deletar esse registro?",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        CitiesService.remove(id)
          .then(() => {
            this.removeCity(id);

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
