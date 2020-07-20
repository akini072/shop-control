import {
  loadingOrderAll
} from '../../services/order'
import {
  loadingCost
} from '../../services/cost'

import formatValue from '../../mixins/formatValue'

export default {
  mixins: [formatValue],
  data() {
    return {
      totalFinance: 0,
      totalRecipe: 0,
      totalCost: 0,
      tableFinanceProfit: [],
      tableRecipeProfit: [],
      headers: [{
        text: '',
        value: 'description'
      }, {
        text: '',
        value: 'total'
      }]
    }
  },
  methods: {
    async init() {
      await this.loadCost()
      await this.loadOrder()

      this.tableFinanceProfit = [{
        description: 'Financeiro',
        total: this.totalFinance
      }, {
        description: 'Custos',
        total: this.totalCost
      }]

      this.tableRecipeProfit = [{
        description: 'Receita',
        total: this.totalRecipe
      }, {
        description: 'Custos',
        total: this.totalCost
      }]
    },
    async loadCost() {
      try {
        await loadingCost().then(res => {
          this.totalCost = res.data.cost.reduce((acc, {
            total
          }) => acc + parseFloat(total), 0)
        })
      } catch (error) {
        throw error
      }
    },
    async loadOrder() {
      try {
        await loadingOrderAll().then(res => {
          this.totalFinance = res.data.order.reduce((acc, {
            items,
            deliveryFee,
            paymentStatus,
            datePayment
          }) => acc + parseFloat(`${ paymentStatus && new Date() >= new Date(datePayment) ? items.reduce((acc, {
            amount,
            value
          }) => acc + parseFloat(amount * value), 0) + deliveryFee : 0 }`), 0)

          this.totalRecipe = res.data.order.reduce((acc, {
            items,
            deliveryFee
          }) => acc + parseFloat(items.reduce((acc, {
            amount,
            value
          }) => acc + parseFloat(amount) * value, 0) + deliveryFee), 0)
        })
      } catch (error) {
        throw error
      }
    }
  },
  mounted() {
    this.init()
  }
}
