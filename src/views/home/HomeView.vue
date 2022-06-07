<template>
  <v-container class="full-page">
    <v-row>
      <v-col cols="12" md="8">
        <div class="map-section">
          <div class="map-header">
            <h2>Casos de COVID-19 por Município</h2>
          </div>

          <div class="map-container">
            <l-map v-model="zoom" v-model:zoom="zoom" :center="center">
              <l-tile-layer :url="url" />
              <l-control-layers />

              <l-circle-marker
                :color="circle.color"
                :lat-lng="circle.center"
                :radius="circle.radius"
              />
            </l-map>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <multiselect
          v-model="diseaseChosen"
          :options="diseases"
          class="mb-4"
          label="name"
          object
          placeholder="Doenças"
          value-prop="id"
        />

        <multiselect
          v-model="stateChosen"
          :options="filteredStates"
          class="my-4"
          label="name"
          object
          placeholder="Estado"
          value-prop="abbreviation"
        />

        <multiselect
          v-model="cityChosen"
          :options="filteredCities"
          class="mt-4"
          label="name"
          object
          placeholder="Cidade"
          value-prop="id"
        />

        <info-card
          v-for="item in covidData"
          :key="item.title"
          :color="item.color"
          :data="item.data"
          :title="item.title"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  LCircleMarker,
  LControlLayers,
  LMap,
  LTileLayer,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import Multiselect from "@vueform/multiselect";
import { mapActions, mapState } from "pinia";

import type { City, Disease } from "@/stores";
import { useDiseaseStore, useNavBarStore } from "@/stores";
import type { State } from "./types";

import { InfoCard } from "@/components";
import "./styles.scss";

export default defineComponent({
  name: "HomeView",

  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LControlLayers,
    InfoCard,
    Multiselect,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 4,
      center: [-15.474279, -58.084098],
      circle: {
        center: [-15.474279, -58.084098],
        radius: 6,
        color: "red",
      },
      geoJson: null,
      diseaseChosen: null as Disease | null,
      stateChosen: null,
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
      cityChosen: null,
      covidData: [
        {
          title: "Óbitos confirmados",
          color: "#9b59b6",
          data: [
            {
              id: 1,
              value: 657102,
              name: "Óbitos confirmados",
            },
            {
              id: 2,
              value: 304,
              name: "Casos novos",
            },
            {
              id: 3,
              value: "2.2%",
              name: "Letalidade",
            },
            {
              id: 4,
              value: 312.7,
              name: "Mortalidade",
            },
          ],
        },
        {
          title: "Casos confirmados",
          color: "#16a085",
          data: [
            {
              id: 5,
              value: 29617266,
              name: "Acumulado",
            },
            {
              id: 6,
              value: 44154,
              name: "Casos novos",
            },
            {
              id: 7,
              value: 14093.6,
              name: "Incidência",
            },
          ],
        },
      ],
    };
  },

  computed: {
    ...mapState(useDiseaseStore, ["diseases"]),

    filteredCities(): City[] {
      let cities: City[] = [];

      if (this.diseaseChosen) {
        cities = this.diseaseChosen.cities;
      } else {
        this.diseases.forEach((disease) => {
          disease.cities.forEach((city) => {
            if (!cities.find(({ id }) => city.id === id)) {
              cities.push(city);
            }
          });
        });
      }

      cities = cities.filter((city) =>
        this.filteredStates.find((state) => state.abbreviation === city.state)
      );

      return cities;
    },

    filteredStates(): State[] {
      const states: State[] = [];

      if (this.diseaseChosen) {
        this.diseaseChosen.cities.forEach((city) => {
          const state = this.states.find(
            ({ abbreviation }) => city.state === abbreviation
          );

          if (state) {
            states.push(state);
          }
        });
      } else {
        this.diseases.forEach((disease) => {
          disease.cities.forEach((city) => {
            const state = this.states.find(
              ({ abbreviation }) => city.state === abbreviation
            );

            if (state) {
              states.push(state);
            }
          });
        });
      }

      return states;
    },

    totalCases() {
      let result = 0;

      this.filteredCities.forEach((city) => {
        city.cases.forEach(({ total }) => {
          result += total;
        });
      });

      return result;
    },
  },

  async mounted() {
    this.setShowNavBar(false);
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
  },
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
