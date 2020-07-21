import {
  loadingOrder,
  updateOrder,
  deleteOrder
} from '../../services/order';

import formatValue from '../../mixins/formatValue'
import formatDate from '../../mixins/formatDate'

import modalConfirm from '../modalConfirm';
import cButton from '../button';
import inputDate from '../inputDate';

export default {
  mixins: [formatValue, formatDate],
  components: {
    modalConfirm,
    cButton,
    inputDate
  },
  props: {
    finishOrder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      filter: {
        dateStart: '',
        dateEnd: ''
      },
      idOrderCurrent: '',
      confirmDelete: false,
      confirmFinish: false,
      headersTable: [{
          text: "Código",
          value: "id"
        },
        {
          text: "Cliente",
          value: "client"
        },
        {
          text: "Quantidade",
          value: "qtd"
        },
        {
          text: "Total",
          value: "totalValue"
        },
        {
          text: "Entrega",
          value: "date"
        }, {
          sortable: false,
          value: "edit_delete",
          align: 'right'
        },

      ],
      orderData: [],
      singleExpand: false,
      expanded: []
    }
  },
  methods: {
    async loadOrders(query = '') {
      try {
        this.orderData = []

        await loadingOrder(this.finishOrder, query).then(res => {
          res.data.order.map((item, i) => {
            this.orderData.push({
              _id: item._id,
              id: i + 1,
              client: item.client,
              qtd: item.items.reduce((acc, {
                amount
              }) => acc + parseFloat(amount), 0),
              totalValue: this.formatValue(item.items.reduce((acc, {
                value,
                amount
              }) => acc + (amount * value) + item.deliveryFee, 0)),
              date: item.deliveryDate,
              ...item
            });
          });
        });
      } catch (error) {
        throw error;
      }
    },
    updateOrderEvent(_id) {
      this.$router.push({
        name: 'createUpdateOrder',
        query: {
          id: _id
        }
      })
    },
    async deleteOrderEvent(_id) {
      try {
        await deleteOrder(_id).then(() => this.loadOrders())
      } catch (error) {
        throw error
      }
      this.disabled = false
    },
    async finishOrderEvent(_id) {
      try {
        const data = {
          deliveryStatus: true,
          _id: _id
        }
        await updateOrder(data, 'finishOrder').then(() => this.loadOrders())
      } catch (error) {
        throw error
      }
    },
    getColorDate(date) {
      const now = new Date(); // Data de hoje
      const deliveryDate = new Date(date); // Outra data 
      const diff = Math.abs(now.getTime() - deliveryDate.getTime()); // Subtrai uma data pela outra
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

      if (now > deliveryDate) return 'error'
      if (days > 3) return 'success'
      if (days > 0) return 'warning'
    },

    formatQuery(filter) {
      if (filter.dateEnd && filter.dateStart) {
        const query = `dateStart=${filter.dateStart}&&dateEnd=${filter.dateEnd}`

        this.loadOrders(query)
      }
    }
  },
  mounted() {
    this.loadOrders()
  }
}
