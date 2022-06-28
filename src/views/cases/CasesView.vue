<template>
  <v-container class="full-page">
    <div>
      <h2 class="mb-4">Lista de casos</h2>

      <!--      <update-create-case />-->

      <v-table class="table" fixed-header height="400px">
        <thead>
          <tr>
            <th class="table-title">Doença</th>
            <th class="table-title">Cidade</th>
            <th class="table-title">Estado</th>
            <th class="table-title">Quantidade</th>
            <th class="table-title">Ações</th>
          </tr>
        </thead>

        <tbody>
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
        </tbody>
      </v-table>

      <div class="d-flex">
        <span
          v-if="page > 1"
          class="page-navigation"
          @click="() => changePage(-1)"
          >Anterior</span
        >

        <v-spacer />

        <span>
          {{ (page - 1) * perPage + 1 }} -
          {{ page * perPage < count ? page * perPage : count }} de
          {{ count }}
        </span>

        <v-spacer />

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
      perPage: 50,
    };
  },

  async mounted() {
    this.setShowNavBar(true);
    await this.loadCases(this.page, this.perPage);
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

      await this.loadCases(this.page, this.perPage);
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
