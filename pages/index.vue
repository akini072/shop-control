<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-card width="400px" class="mt-5 pt-5">
        <v-card-title>LOGIN</v-card-title>
        <v-card-text>
          <v-form ref="fLogin">
            <v-text-field
              label="Email"
              v-model="user.email"
              prepend-icon="mdi-account"
              :rules="emailRules"
              required
            />
            <v-text-field
              label="Senha"
              v-model="user.password"
              type="password"
              prepend-icon="mdi-key-minus"
              required
            />
            <p class="red--text">{{ msg }}</p>
            <v-btn width="100%" color="black" class="white--text" @click="submitForm()">ENtrar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script src="./script.js" />