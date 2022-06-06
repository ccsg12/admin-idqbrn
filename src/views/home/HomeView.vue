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

              <l-geo-json :geojson="geoJson" />
            </l-map>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <v-form>
          <v-select
            v-model="diseaseFilter"
            :items="diseases"
            bg-color="#fff"
            density="compact"
            label="Doença"
            variant="outlined"
          />

          <v-select
            v-model="stateFilter"
            :items="states"
            bg-color="#fff"
            density="compact"
            label="Estado"
            variant="outlined"
          />

          <v-select
            v-model="cityFilter"
            :items="cities"
            bg-color="#fff"
            density="compact"
            label="Cidade"
            variant="outlined"
          />
        </v-form>

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
  LGeoJson,
  LMap,
  LTileLayer,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { mapActions, mapState } from "pinia";

import { useDiseaseStore, useNavBarStore } from "@/stores";

import { InfoCard } from "@/components";
import "./styles.scss";

export default defineComponent({
  name: "HomeView",

  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LGeoJson,
    LControlLayers,
    InfoCard,
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
      diseaseFilter: "Covid19",
      diseases: ["Covid19", "Gripe", "Dengue"],
      stateFilter: "",
      states: [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins",
      ],
      cityFilter: "",
      cities: [],
      teste: null,
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
  },

  async mounted() {
    this.setShowNavBar(false);

    const response = await fetch(
      "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-33-mun.json"
    );
    this.geoJson = await response.json();
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
  },
});
</script>
