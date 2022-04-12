<template>
  <v-card class="info-card">
    <v-card-header class="card-header">
      <v-card-title :style="{ color: this.color }" class="card-title"
        >{{ title }}
      </v-card-title>

      <div :style="iconContainerStyle" class="icon-container">
        <v-icon :color="color">mdi-arrow-down</v-icon>
      </div>
    </v-card-header>

    <v-card-text class="d-flex flex-wrap">
      <div v-for="item in data" :key="item.id" class="data-container">
        <span class="data-value">{{ item.value }}</span>
        <span class="data-name">{{ item.name }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

import "./styles.scss";
import type { Data } from "./props.types";

export default defineComponent({
  name: "InfoCard",

  props: {
    title: { type: String, required: true },
    data: { type: Object as PropType<Data>, required: true },
    color: String,
  },

  computed: {
    iconContainerStyle() {
      return { backgroundColor: this.color + "1F" };
    },
  },
});
</script>
