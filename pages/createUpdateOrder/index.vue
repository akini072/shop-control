<template>
  <v-container>
    <h2 class="mb-5 pb-5">{{ action === 'create' ? 'CADASTRAR PEDIDO' : 'ATUALIZAR PEDIDO'}}</h2>
    <v-form class="mt-5 formOrder" ref="formOrder">
      <v-row>
        <v-col cols="12" lg="9">
          <v-text-field label="Cliente" v-model="order.client" :rules="requiredRules" dense />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field label="Telefone" v-model="order.phone" :rules="requiredRules" dense />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8">
          <v-text-field label="Rua" v-model="order.streetAddress" dense />
        </v-col>
        <v-col cols="4" lg="1">
          <v-text-field label="Nº" type="number" v-model="order.numberAddress" dense />
        </v-col>
        <v-col cols="8" lg="3">
          <v-text-field label="Bairro" v-model="order.districtAddress" dense />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <input-date label="Entrega" @date="val => order.deliveryDate = val" />
        </v-col>
        <v-col cols="12" lg="3">
          <v-select
            :items="deliveryForm"
            v-model="order.deliveryType"
            label="Forma de entrega"
            :rules="requiredRules"
            dense
          />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field label="Frete" v-model="order.deliveryFee" type="number" prefix="R$" dense />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <v-select
            :items="paymentForm"
            v-model="order.payment"
            label="Forma de pagamento"
            :rules="requiredRules"
            dense
          />
        </v-col>
      </v-row>
      <v-row class="align-baseline">
        <v-col cols="12" lg="6">
          <v-select :items="products" label="Produto" dense v-model="orderInput.product" />
        </v-col>
        <v-col cols="8" lg="3">
          <v-text-field type="number" label="Quantidade" v-model="orderInput.amount" dense />
        </v-col>
        <v-col>
          <v-btn color="success" @click="addOrderItem(orderInput)">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="align-baseline mt-4" v-for="(product, i) in order.items" :key="i">
        <v-col cols="12" lg="9" class="pa-0 pl-3 pr-3">
          <v-list-item style="background-color:#f5f5f5">
            <v-list-item-content>
              <v-list-item-title class="d-flex flex-nowrap">
                <div class="ml-4">Pedido: {{ product.product }}</div>
                <div class="ml-auto">Quantidade: {{ product.amount }}</div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col class="pa-0 pl-3 mt-4">
          <v-btn color="error" class="white--text" @click="removeOrderItem(i)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-5 mb-5" justify="end">
        <c-button
          class="mr-4"
          text="Voltar"
          :border="true"
          colorText="black--text"
          @clicked="$router.push({ name:'order' })"
        />
        <c-button @clicked="submit" text="Salvar" />
      </v-row>
    </v-form>
    <v-dialog v-model="dialogAlert" max-width="400px">
      <v-card class="pa-5 rounded-xl">
        <v-card-title>
          <v-row justify="center">
            <v-icon color="red" size="80px">mdi-alert-circle-outline</v-icon>
          </v-row>
        </v-card-title>
        <v-card-text class="text-center">{{ msgAlert }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <c-button text="Voltar" @clicked="dialogAlert = false" />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss"/>