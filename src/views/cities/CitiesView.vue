<template>
  <v-container class="full-page">
    <div>
      <h2>Lista de cidades</h2>

      <v-table fixed-header height="500px">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código IBGE</th>
            <th>Estado</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>População</th>
            <th>Ações</th>
          </tr>

          <tr v-for="city in cities" :key="city.id">
            <td>{{ city.name }}</td>
            <td>{{ city.ibgeCode }}</td>
            <td>{{ city.state }}</td>
            <td>{{ city.latitude }}</td>
            <td>{{ city.longitude }}</td>
            <td>{{ city.population }}</td>
            <td>
              <edit-city-modal :data="city" />
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
import EditCityModal from "./EditCityModal.vue";

import "./styles.scss";

export default defineComponent({
  name: "CitiesView",

  components: {
    EditCityModal,
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
    ...mapActions(useCitiesStore, ["loadCities"]),

    async changePage(value: number) {
      this.page += value;

      await this.loadCities(this.page);
    },
  },
});
</script>
