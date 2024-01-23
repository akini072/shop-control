<template>
  <v-container>
    <v-row justify="space-between" class="mb-5 pb-5 ml-2 mr-2">
      <h2>COMPLETED ORDERS</h2>
    </v-row>
    <table-order :finishOrder="true"/>
  </v-container>
</template>

<script>
import tableOrder from "../../components/tableOrder";
 
export default {
  components: {
    tableOrder
  }
};
</script>

<style>
</style>