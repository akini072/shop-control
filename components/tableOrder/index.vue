<template>
  <v-container>
    <v-card>
      <v-card-title class="mx-5">
        <v-row align="center">
          <div>from</div>
          <v-col lg="2">
            <input-date
              :date="filter.dateStart"
              @date="val => [filter.dateStart = val, formatQuery(filter)]"
            />
          </v-col>
          <div>to</div>

          <v-col lg="2">
            <input-date
              :date="filter.dateEnd"
              @date="val => [filter.dateEnd = val, formatQuery(filter)]"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col lg="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headersTable"
        :items="orderData"
        :single-expand="true"
        :expanded.sync="expanded"
        mobile-breakpoint="0"
        item-key="_id"
        show-expand
        class="elevation-1"
      >
        <template v-slot:item.edit_delete="{item}">
          <v-icon
            v-show="!finishOrder"
            @click="confirmDelete = true, idOrderCurrent = item._id"
          >mdi-delete</v-icon>

          <v-icon v-show="!finishOrder" @click="updateOrderEvent(item._id)">mdi-pencil</v-icon>
        </template>
        <template v-slot:item.date="{item}">
          <v-chip v-if="!finishOrder" :color="getColorDate(item.date)">{{ formatDate(item.date) }}</v-chip>
          <v-chip v-else>{{ formatDate(item.date) }}</v-chip>
        </template>

        <template v-slot:expanded-item="{headers, item}">
          <td :colspan="headers.length - 1">
            <v-container class="tableItem">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="(item) in item.items" :key="item._id">
                      <td>{{ item.amount }}</td>
                      <td class="d-flex align-center">
                        <div>{{ item.description }}</div>
                        <div class="ml-2" v-show="item.color">{{ ' - ' + item.color }}</div>
                        <div class="ml-2" v-show="item.brand">{{ ' - ' + item.brand }}</div>
                      </td>
                      <td>{{ formatValue(item.value * item.amount) }}</td>
                    </tr>
                    <tr v-if="item.gift">
                      <td><v-icon>mdi-gift</v-icon></td>
                      <td class="d-flex align-center">
                        <div>{{ item.gift.description }}</div>
                        <div class="ml-2" v-show="item.gift.color">{{ ' - ' + item.gift.color }}</div>
                        <div class="ml-2" v-show="item.gift.brand">{{ ' - ' + item.gift.brand }}</div>
                      </td>
                    </tr>
                    <tr v-if="item.deliveryFee">
                      <td>
                        <v-icon>mdi-truck-delivery-outline</v-icon>
                      </td>
                      <td>Shipping</td>
                      <td>{{ formatValue(item.deliveryFee) }}</td>
                    </tr>
                    <tr v-if="item.streetAddress">
                      <td>
                        <v-icon>mdi-map-marker</v-icon>
                      </td>
                      <td>{{ item.streetAddress }}, {{ item.numberAddress }} - {{ item.districtAddress }}</td>
                      <td />
                    </tr>
                    <tr>
                      <td>
                        <v-icon>mdi-cash-multiple</v-icon>
                      </td>
                      <td>{{ item.payment }}</td>
                      <td />
                    </tr>
                    <tr v-if="item.rateCard">
                      <td>
                        <v-icon>mdi-percent</v-icon>
                      </td>
                      <td>Card fee</td>
                      <td>{{ item.rateCard.toFixed(2) }} %</td>
                    </tr>
                    <tr v-if="item.discount">
                      <td>
                        <v-icon>mdi-window-minimize</v-icon>
                      </td>
                      <td>Discount</td>
                      <td>{{ formatValue(item.discount) }}</td>
                    </tr>
                    <tr>
                      <td>
                        <v-icon>mdi-phone</v-icon>
                      </td>
                      <td>{{ item.phone }}</td>
                      <td />
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-container>
          </td>
          <td :colspan="2" v-show="!finishOrder">
            <c-button
              class="ml-auto"
              @clicked="confirmFinish = true, idOrderCurrent = item._id"
              text="Complete order"
            />
          </td>
        </template>
      </v-data-table>
      <!-- modal Confirm excluir -->
      <modal-confirm
        :modalConfirm="confirmDelete"
        @value="val => confirmDelete = val"
        @confirm="deleteOrderEvent(idOrderCurrent)"
        icon="mdi-close-circle-outline"
        msg="Are you sure you want to delete order?"
      />
      <!-- modal Confirm Complete order -->
      <modal-confirm
        :modalConfirm="confirmFinish"
        @value="val => confirmFinish = val"
        @confirm="finishOrderEvent(idOrderCurrent)"
        icon="mdi-alert-circle-outline"
        msg="Are you sure you want complete the order?"
      />
    </v-card>
  </v-container>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss" />