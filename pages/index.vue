<template>
  <v-container>
    <v-row justify="space-between" class="mb-5 pb-5 ml-2 mr-2">
      <h2>PEDIDOS</h2>
      <v-btn
        class="white--text text-button pa-5"
        color="black"
        :to="{ name: 'createUpdateOrder', query:{action: 'create'}}"
      >Novo Pedido</v-btn>
    </v-row>
    <table-order />
  </v-container>
</template>

<script>
import tableOrder from "../components/tableOrder";

export default {
  components: {
    tableOrder
  }
};
</script>

