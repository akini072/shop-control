import {
  loadingOrderAll,
  updateOrder
} from '../../services/order'

import formatValue from '../../mixins/formatValue'
import formatDate from '../../mixins/formatDate'

import inputDate from '../../components/inputDate'
import cButton from '../../components/button'

export default {
  mixins: [formatValue, formatDate],
  components: {
    inputDate,
    cButton
  },
  data() {
    return {
      now: new Date().toISOString(),
      dialogDatePayment: false,
      orderCurrent: {
        _id: '',
        paymentStatus: '',
        datePayment: ''
      },
      datePayment: new Date(),
      financeData: [],
      headersTable: [{
        text: 'Data Pedido',
        value: 'date'
      }, {
        text: 'Data Pagamento',
        value: 'datePayment'
      }, {
        text: 'Cliente',
        value: 'client'
      }, {
        text: 'Status',
        value: 'paymentStatus'
      }, {
        text: 'Pagamento',
        value: 'payment'
      }, {
        text: 'Total',
        value: 'total'
      }, ]
    }
  },
  methods: {
    async takePaymentStatus(item) {
      try {
        const data = {
          _id: item._id,
          paymentStatus: item.paymentStatus,
          datePayment: item.paymentStatus ? item.datePayment : ''
        }
        console.log(item)
        await updateOrder(data, 'payment')
        this.dialogDatePayment = false
        this.loadOrders()
      } catch (error) {
        throw error
      }
    },
    async loadOrders() {
      try {
        this.financeData = []
        await loadingOrderAll().then(res => {
          res.data.order.map((item, i) => {
            this.financeData.push({
              total: this.formatValue(item.items.reduce((acc, {
                value,
                amount
              }) => acc + (amount * value), 0) + item.deliveryFee),
              date: this.formatDate(item.deliveryDate),
              ...item,
              datePayment: item.datePayment
            });
          });
        });
      } catch (error) {
        throw error;
      }
    }
  },
  mounted() {
    this.loadOrders()
  }
}
