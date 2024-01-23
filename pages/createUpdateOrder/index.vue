<template>
  <v-container>
    <h2 class="mb-5 pb-5">{{ action === 'create' ? 'REGISTER ORDER' : 'ATUALIZAR UPDATE ORDER'}}</h2>
    <v-form class="mt-5 formOrder" ref="formOrder">
      <v-row>
        <v-col cols="12" lg="9">
          <v-text-field label="Customer" v-model="order.client" :rules="requiredRules" dense />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field label="Phone" v-model="order.phone" :rules="requiredRules" dense />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8">
          <v-text-field label="Street" v-model="order.streetAddress" dense />
        </v-col>
        <v-col cols="4" lg="1">
          <v-text-field label="Nº" type="number" v-model="order.numberAddress" dense />
        </v-col>
        <v-col cols="8" lg="3">
          <v-text-field label="Neighborhood" v-model="order.districtAddress" dense />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <input-date label="Delivery" @date="val => order.deliveryDate = val" />
        </v-col>
        <v-col cols="12" lg="3">
          <v-select
            :items="deliveryForm"
            v-model="order.deliveryType"
            label="Delivery method"
            :rules="requiredRules"
            dense
          />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field label="Shipping" v-model="order.deliveryFee" type="number" prefix="$" dense />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <v-select
            :items="paymentForm"
            v-model="order.payment"
            label="Payment method"
            :rules="requiredRules"
            dense
          />
        </v-col>
        <v-col cols="12" lg="3" v-show="/cartão/i.test(order.payment) || /link/i.test(order.payment)">
          <v-text-field
            v-model="order.rateCard"
            label="Card fee"
            suffix="%"
            type="number"
            dense
          />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            v-model="order.discount"
            label="Discount"
            prefix="$"
            type="number"
            dense
          />
        </v-col>
      </v-row>
      <v-row class="align-baseline">
        <v-col cols="12" lg="6">
          <v-autocomplete
            v-model="order.gift"
            :items="productsItems"
            :search-input.sync="searchGift"
            color="white"
            hide-no-data
            hide-selected
            item-text="text"
            item-value="_id"
            label="Treat"
            return-object
          ><v-icon slot="append" @click="() => order.gift = {}">mdi-close</v-icon></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="align-baseline">
        <v-col cols="12" lg="6">
          <v-autocomplete
            v-model="orderInput.product"
            :items="productsItems"
            :search-input.sync="searchProduct"
            color="white"
            hide-no-data
            hide-selected
            item-text="text"
            item-value="_id"
            label="Product"
            return-object
          ></v-autocomplete>
        </v-col>
        <v-col cols="8" lg="3">
          <v-text-field type="number" label="Quantity" v-model="orderInput.amount" dense />
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
                <div
                  class="ml-4"
                >Order: {{ product.description + (product.color ? ' - ' + product.color : '') + (product.brand ? ' - ' + product.brand : '') }}</div>
                <div class="ml-auto">Quantity: {{ product.amount }}</div>
                <div class="ml-auto">Value: {{ formatValue(product.value) }}</div>
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
        <div class="text-subtitle-1 text-uppercase mr-5 pr-5">
          Sum: {{ formatValue((order.items.reduce((acc, {
          value,
          amount
          }) => acc + (amount * value), 0) + parseFloat(order.deliveryFee) - order.discount) * ((100 - order.rateCard) / 100)) }}
        </div>
        <c-button
          class="mr-4"
          text="Back"
          :border="true"
          colorText="black--text"
          @clicked="$router.push({ name:'order' })"
        />
        <c-button @clicked="submit" text="Save" />
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
          <c-button text="Back" @clicked="dialogAlert = false" />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss"/>