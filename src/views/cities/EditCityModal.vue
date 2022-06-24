<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn color="warning" icon="mdi-pencil" size="x-small" v-bind="props" />
    </template>

    <v-card class="card">
      <v-card-title>
        <h3>Editar cidade</h3>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                density="comfortable"
                hide-details
                label="Nome"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="ibgeCode"
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
                v-model="state"
                density="comfortable"
                hide-details
                label="Estado"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="population"
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
                v-model="latitude"
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
                v-model="longitude"
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
        <v-btn color="grey" text @click="dialog = false"> Close</v-btn>

        <v-btn color="primary" text @click="dialog = false"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

import type { City } from "@/stores";

export default defineComponent({
  name: "EditCityModal",

  props: {
    data: { type: Object as PropType<City>, required: true },
  },

  data() {
    return {
      dialog: false,
      id: this.data.id,
      name: this.data.name,
      ibgeCode: this.data.ibgeCode,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      population: this.data.population,
      state: this.data.state,
    };
  },
});
</script>
