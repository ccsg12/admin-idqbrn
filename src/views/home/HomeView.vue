<template>
  <v-container class="full-page">
    <v-row>
      <v-col cols="12" md="8">
        <div class="map-section">
          <div class="map-header">
            <h2>Casos de COVID-19 por Município</h2>
          </div>

          <div class="map-container">
            <l-map
              v-model="zoom"
              v-model:zoom="zoom"
              :center="center"
              :min-zoom="4"
            >
              <l-tile-layer :url="url" />
              <l-control-layers />

              <template v-for="city in filteredCities" :key="city.id">
                <l-circle-marker
                  :color="mapCircleStyle.color"
                  :fill="true"
                  :fill-color="mapCircleStyle.fillColor"
                  :fill-opacity="mapCircleStyle.fillOpacity"
                  :lat-lng="cityCoordinates(city.latitude, city.longitude)"
                  :radius="mapCircleStyle.radius"
                >
                  <l-tooltip>
                    <div v-for="disease in city.casesDetails" :key="disease.id">
                      {{ disease.disease }}: {{ disease.total }}
                    </div>
                  </l-tooltip>
                </l-circle-marker>
              </template>
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
          @select="updateCitiesValues"
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
import { latLng } from "leaflet";
import {
  LCircleMarker,
  LControlLayers,
  LMap,
  LTileLayer,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import Multiselect from "@vueform/multiselect";
import { mapActions, mapState } from "pinia";

import { useDiseaseStore, useNavBarStore } from "@/stores";
import type {
  CityDetails,
  DiseaseDetails,
  MapCircleStyle,
  State,
} from "./types";

import { InfoCard } from "@/components";
import "./styles.scss";

export default defineComponent({
  name: "HomeView",

  components: {
    LMap,
    LTileLayer,
    LTooltip,
    LCircleMarker,
    LControlLayers,
    InfoCard,
    Multiselect,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 4,
      center: latLng(-15.474279, -58.084098),
      geoJson: null,
      diseaseChosen: null as DiseaseDetails | null,
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
      cityChosen: null as CityDetails | null,
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

    filteredCities(): CityDetails[] {
      let cities: CityDetails[] = [];

      if (this.diseaseChosen) {
        cities = this.diseaseChosen.cities;
      } else {
        this.diseases.forEach((disease) => {
          disease.cities.forEach((city) => {
            const filteredCity = cities.find(({ id }) => city.id === id);

            if (!filteredCity) {
              cities.push({
                ...city,
                casesDetails: [
                  {
                    ...city.cases,
                    disease: disease.name,
                  },
                ],
              });
            } else {
              filteredCity.casesDetails.push({
                ...city.cases,
                disease: disease.name,
              });
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

    mapCircleStyle(): MapCircleStyle {
      return {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 2 * this.zoom,
      };
    },

    totalCases() {
      let result = 0;

      this.filteredCities.forEach((city) => {
        result += this.cityCases(city);
      });

      return result;
    },
  },

  async mounted() {
    this.setShowNavBar(false);
  },

  watch: {
    cityChosen() {
      this.updateMapOptions();
    },
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),

    cityCases(city: CityDetails): number {
      let result = 0;

      city.casesDetails.forEach(({ total }) => {
        result += total;
      });

      return result;
    },

    cityCoordinates(latitude: number, longitude: number) {
      return latLng(latitude, longitude);
    },

    updateCitiesValues() {
      if (this.diseaseChosen) {
        this.diseaseChosen.cities.forEach((city) => {
          city.casesDetails = [
            {
              ...city.cases,
              disease: this.diseaseChosen?.name,
            },
          ];
        });
      }
    },

    updateMapOptions() {
      if (this.cityChosen) {
        this.zoom = 9;
        this.center = latLng(
          this.cityChosen?.latitude,
          this.cityChosen?.longitude
        );
      } else {
        this.zoom = 4;
        this.center = latLng(-15.474279, -58.084098);
      }
    },
  },
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
