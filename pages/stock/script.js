import {
  loadingStock,
  deleteStock,
  updateStock,
  createStock
} from '../../services/stock'

import formatValue from '../../mixins/formatValue'
import formatDate from '../../mixins/formatDate'

import inputDate from '../../components/inputDate'
import modalConfirm from '../../components/modalConfirm'
import cButton from '../../components/button'

export default {
  mixins: [formatValue, formatDate],
  components: {
    modalConfirm,
    inputDate,
    cButton
  },
  data() {
    return {
      filterSearch: '',
      requiredRules: [
        v => !!v || 'Preenchimento obrigatório'
      ],
      stockCurrent: {},
      stockData: [],
      headersTable: [{
          text: 'Descrição',
          value: 'description'
        }, {
          text: 'Marca',
          value: 'brand'
        }, {
          text: 'Cor',
          value: 'color'
        }, {
          text: 'Preço',
          value: 'value'
        }, {
          text: 'Quantidade',
          value: 'amount'
        },
        {
          text: 'Total',
          value: 'total'
        }, {
          value: 'edit_delete'
        }
      ],
      dialogEditCreate: false,
      confirmDelete: false
    }
  },
  methods: {
    async loadStock() {
      try {
        this.stockData = []
        await loadingStock().then(res => {
          res.data.stocks.map(stock => {
            this.stockData.push({
              ...stock,
              total: stock.amount * stock.value
            })
          })
        })
      } catch (error) {
        throw error
      }
    },
    async deleteStockEvent() {
      try {
        await deleteStock(this.stockCurrent._id).then(() => this.loadStock())
      } catch (error) {
        throw error
      }
    },
    async saveStock() {
      if (this.$refs.formStock.validate()) {

        try {
          this.dialogEditCreate = false

          if (this.stockCurrent.action === 'update') {
            return await updateStock(this.stockCurrent).then(() => this.stockCurrent = {})
          }
          await createStock(this.stockCurrent).then(() => this.loadStock(), this.stockCurrent = {})

        } catch (error) {
          throw error
        }

      }


    },
  },
  watch: {
    dialogEditCreate: function (val) {
      if (!val) this.stockCurrent = {}
    }
  },
  mounted() {
    this.loadStock()
  }
}
