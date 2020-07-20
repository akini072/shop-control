<template>
  <v-dialog v-model="modalConfirm" max-width="450px">
    <v-card class="pa-4" style="border-radius:15px">
      <v-card-title class="mb-5">
        <v-row justify="center">
          <v-icon color="red" size="80">{{ icon }}</v-icon>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="8" class="font-weight-medium text-center">{{ msg }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          width="100%"
          class="white--text pb-1"
          color="#E34E4E"
          @click="() => { $emit('confirm'), modalConfirm = false }"
        >Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script src="./script.js" />

<style>
.card-border-radius {
  border-radius: 20px;
}
</style>