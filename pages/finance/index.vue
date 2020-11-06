<template>
  <v-container>
    <v-row justify="space-between" class="mb-5 pb-5 ml-2 mr-2">
      <h2>FINANCEIRO</h2>
    </v-row>
    <v-data-table
      :headers="headersTable"
      :items="financeData"
      mobile-breakpoint="0"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:item.datePayment="{ item }">
        <div>{{ formatDate(item.datePayment) }}</div>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-icon @click="(dialogDatePayment = true), (orderCurrent = item)"
          >mdi-pencil</v-icon
        >
      </template>
      <template v-slot:item.amountPaid="{ item }">
        <div>{{ formatValue(item.amountPaid) }}</div>
      </template>
      <template v-slot:item.paymentStatus="{ item }">
        <div :class="item.paymentStatus ? 'success--text' : 'red--text'">
          {{ item.paymentStatus ? "Recebido" : "Pendente" }}
        </div>
      </template>

      <template v-slot:item.payment="{ item }">
        <v-btn
          @click="() => selectOrder(item)"
          class="text-capitalize ma-3"
          :color="item.paymentStatus ? 'error' : 'success'"
          >{{
            item.paymentStatus ? "Cancelar pagamento" : "Confirmar pagamento"
          }}</v-btn
        >
      </template>

      <template v-slot:body.append>
        <tr style="background-color: #f5f5f5">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="success--text font-weight-medium">
            {{
              formatValue(
                financeData.reduce((acc, { amountPaid }) => acc + amountPaid, 0)
              )
            }}
          </td>
          <td class="success--text font-weight-medium">
            {{
              formatValue(
                financeData.reduce(
                  (acc, { total, paymentStatus, datePayment }) =>
                    acc +
                    parseFloat(
                      `${
                        paymentStatus && new Date() >= new Date(datePayment)
                          ? total
                              .replace("R$", "")
                              .replace(/\./g, "")
                              .replace(",", ".")
                          : 0
                      }`
                    ),
                  0
                )
              )
            }}
          </td>
          <td></td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDatePayment" max-width="400px">
      <v-card class="pa-5">
        <v-card-title>
          <v-row justify="space-between">
            Data do pagamento
            <v-icon @click="dialogDatePayment = false">mdi-close</v-icon>
          </v-row>
        </v-card-title>
        <v-card-text>
          <input-date @date="(val) => (orderCurrent.datePayment = val)" />
        </v-card-text>
        <v-card-title>
          <v-row justify="space-between"> Valor Pago </v-row>
        </v-card-title>
        <v-card-text>
          <v-text-field type="number" v-model="orderCurrent.amountPaid" />
        </v-card-text>
        <v-card-actions class="px-5">
          <v-spacer />
          <c-button
            text="Confirmar"
            @clicked="
              (orderCurrent.paymentStatus = true),
                takePaymentStatus(orderCurrent)
            "
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./script.js" />