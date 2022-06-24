<template>
  <v-container class="full-page">
    <div>
      <h2 class="mb-4">Lista de casos</h2>

      <update-create-case />

      <v-table class="table" fixed-header height="500px">
        <thead>
          <tr>
            <th>Doença</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>

          <tr v-for="item in detailedCases" :key="item.id">
            <td>{{ item.disease }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.total }}</td>
            <td>
              <update-create-case :data="item" :edit="true" />

              <v-btn
                class="ml-2"
                color="error"
                icon="mdi-trash-can-outline"
                size="x-small"
                @click="() => deleteCase(item.id)"
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
import { mapActions, mapGetters, mapState } from "pinia";

import { useCasesStore, useNavBarStore } from "@/stores";
import UpdateCreateCase from "./UpdateCreateCase.vue";

import "./styles.scss";
import { CasesService } from "@/services";

export default defineComponent({
  name: "CasesView",

  components: {
    UpdateCreateCase,
  },

  data() {
    return {
      page: 1,
    };
  },

  async mounted() {
    this.setShowNavBar(true);
    await this.loadCases(this.page);
  },

  computed: {
    ...mapState(useCasesStore, ["next", "count"]),
    ...mapGetters(useCasesStore, ["detailedCases"]),
  },

  methods: {
    ...mapActions(useNavBarStore, ["setShowNavBar"]),
    ...mapActions(useCasesStore, ["loadCases", "removeCase"]),

    async changePage(value: number) {
      this.page += value;

      await this.loadCases(this.page);
    },

    async deleteCase(id: number) {
      const result = await this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: "Você deseja mesmo deletar esse registro?",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        CasesService.remove(id)
          .then(() => {
            this.removeCase(id);

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
