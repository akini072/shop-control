<template>
  <v-app>
    <nav-bar />
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navBar from "../components/navBar";

export default {
  components: {
    navBar
  }
};
</script>

<style>
h1 {
  font-family: "Charmonman";
  font-size: 30px;
  font-weight: normal;
  color: #fff;
}

h2 {
  font-weight: 500;
  font-size: 25px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 23px;
}

*{
  font-family: "Darker Grotesque";
  font-size: 20px;
}

.v-btn__content,
.v-label,
.v-list--dense .v-list-item .v-list-item__title {
  font-size: 20px;
}

.v-dialog .v-card .v-card__title {
  font-size: 28px;
  font-weight: 600;
}

</style>