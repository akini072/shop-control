import inputDate from '../../components/inputDate'
import cButton from '../../components/button'
import modalAlert from '../../components/modalConfirm'

import {
  createOrder,
  loadingOrderId,
  updateOrder
} from '../../services/order'

import {
  loadingStock,
} from '../../services/stock'

export default {
  components: {
    inputDate,
    modalAlert,
    cButton
  },
  data() {
    return {
      dialogAlert: false,
      msgAlert: '',
      stock: [],
      products: [],
      action: '',
      requiredRules: [
        v => !!v || 'Preenchimento obrigatório'
      ],
      orderInput: {
        product: {},
        amount: 1
      },
      order: {
        client: '',
        phone: '',
        streetAddress: '',
        numberAddress: '',
        districtAddress: '',
        deliveryDate: new Date().toISOString().substr(0, 10),
        deliveryType: '',
        deliveryFee: 0,
        payment: '',
        items: []
      },
      deliveryForm: ['Retirar', 'Entregar'],
      paymentForm: ['Transferência', 'Boleto', 'Cartão de crédito', 'Cartão de débito', 'Link crédito', 'Dinheiro']
    }
  },
  methods: {
    async submit() {
      if (this.$refs.formOrder.validate() && this.order.items.length > 0) {
        if (this.action === 'create') {
          try {
            return await createOrder(this.order).then(() => {
              this.$router.push({
                path: "/"
              })
            })
          } catch (error) {
            throw error
          }
        }

        try {
          return await updateOrder(this.order, 'updateOrder').then(() => {
            this.$router.push({
              path: "/"
            })
          })
        } catch (error) {
          throw error
        }
      }

    },
    async loadOrderUpdate(id) {
      try {
        await loadingOrderId(id).then(res => this.order = res.data.order)

      } catch (error) {
        return error
      }
    },
    addOrderItem(orderInput) {
      const exists = this.order.items.findIndex(({
        _id
      }) => _id === this.stock[orderInput.product]._id)

      if (orderInput.product >= 0) {
        if (this.stock[orderInput.product].amount < orderInput.amount) {
          this.msgAlert = 'A quantidade selecionada não está disponível em estoque'
          return this.dialogAlert = true
        }

        if (exists !== -1) {
          this.msgAlert = 'O produto já foi selecionado, para alteral exclua e adicione novamente'
          return this.dialogAlert = true
        }

        //add in pedido
        return this.order.items.push({
          _id: this.stock[orderInput.product]._id,
          product: this.stock[orderInput.product].product,
          value: this.stock[orderInput.product].value,
          amount: orderInput.amount
        })
      }

    },
    removeOrderItem(idx) {
      this.order.items.splice(idx, 1)
    },
    async loadingStock() {
      try {
        await loadingStock().then(res => this.stock = res.data.stocks)

        this.formatOptions(this.stock)
      } catch (error) {
        throw error
      }
    },
    formatOptions() {
      this.stock.map((product, i) => {
        this.products.push({
          value: i,
          text: product.product,
        })
      })
    }
  },
  mounted() {
    this.action = this.$route.query.action

    if (!this.action) {
      this.loadOrderUpdate(this.$route.query.id)
    }

    this.loadingStock()
  }
}
