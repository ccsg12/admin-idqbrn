// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify/dist/vuetify";

const customTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F8FCFC",
    primary: "#219653",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
