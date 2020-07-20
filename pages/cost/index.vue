<template>
  <v-container>
    <v-row justify="space-between" class="mb-5 pb-5 ml-2 mr-2">
      <h2>CUSTOS</h2>
      <div @click="dialogEditCreate = true, costCurrent.action = 'create'">
        <c-button text="Novo custo" />
      </div>
    </v-row>
    <v-data-table
      :headers="headersTable"
      :items="costData"
      mobile-breakpoint="0"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:item.total="{item}">{{ formatValue(item.total) }}</template>
      <template v-slot:item.date="{item}">{{ formatDate(item.date) }}</template>
      <template v-slot:item.edit_delete="{item}">
        <v-icon @click="confirmDelete = true, costCurrent = item">mdi-delete</v-icon>
        <v-icon
          @click="dialogEditCreate = true, costCurrent = item, costCurrent.action = 'update'"
        >mdi-pencil</v-icon>
      </template>

      <template v-slot:body.append>
        <tr style="background-color:#f5f5f5">
          <td />
          <td class="font-weight-medium">Total</td>
          <td
            class="error--text font-weight-medium"
          >{{ formatValue(costData ? costData.reduce((acc, { total }) => acc + parseFloat(total), 0) : '')}}</td>
          <td />
        </tr>
      </template>
    </v-data-table>
    <!-- modal confirmar excluir -->
    <modal-confirm
      :modalConfirm="confirmDelete"
      @value="val => confirmDelete = val"
      @confirm="deleteCostEvent()"
      icon="mdi-close-circle-outline"
      msg="Tem certeza que deseja excluir o custo?"
    />
    <!-- modal edit -->
    <v-dialog v-model="dialogEditCreate" max-width="400px">
      <v-card class="pb-4">
        <v-card-title
          class="mb-3"
        >{{ costCurrent.action === 'create' ? 'Registrar custo' : 'Editar Custo'}}</v-card-title>
        <v-card-text>
          <v-form ref="formCost">
            <input-date :date="costCurrent.date" @date="val => costCurrent.date = val" />
            <v-text-field
              label="Descrição"
              v-model="costCurrent.description"
              :rules="requiredRules"
            />
            <v-text-field
              type="number"
              label
              prefix="R$"
              v-model="costCurrent.total"
              :rules="requiredRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEditCreate = false">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="() =>  saveCost() ">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./script.js" />