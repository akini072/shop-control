<template>
  <div>
    <v-app-bar app color="#BE4C41">
      <v-app-bar-nav-icon @click="drawer = true" class="white--text"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <h1>Makeup 4k</h1>
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item to="/order">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Pedidos</v-list-item-title>
          </v-list-item>
          <v-list-item to="/stock">
            <v-list-item-icon>
              <v-icon>mdi-package-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Estoque</v-list-item-title>
          </v-list-item>
          <v-list-item to="/profit">
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Lucro</v-list-item-title>
          </v-list-item>
          <v-list-item to="/recipe">
            <v-list-item-icon>
              <v-icon>mdi-file-document</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Receita</v-list-item-title>
          </v-list-item>
          <v-list-item to="/finance">
            <v-list-item-icon>
              <v-icon>mdi-cash</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Financeiro</v-list-item-title>
          </v-list-item>
          <v-list-item to="/cost">
            <v-list-item-icon>
              <v-icon>mdi-cash-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Custos</v-list-item-title>
          </v-list-item>
          <v-list-item to="/finishOrder">
            <v-list-item-icon>
              <v-icon>mdi-check-all</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Pedidos Finalizados</v-list-item-title>
          </v-list-item>

          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-arrow-left-bold-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false
    };
  }
};
</script>
<style>
</style>