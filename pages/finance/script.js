import { loadingOrderAll, updateOrder } from "../../services/order";

import formatValue from "../../mixins/formatValue";
import formatDate from "../../mixins/formatDate";

import inputDate from "../../components/inputDate";
import cButton from "../../components/button";

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
        _id: "",
        paymentStatus: "",
        amountPaid: 0,
        datePayment: ""
      },
      datePayment: new Date(),
      financeData: [],
      headersTable: [
        {
          text: "Data Pedido",
          value: "date"
        },
        {
          text: "Data Pagamento",
          value: "datePayment"
        },
        {
          text: "Cliente",
          value: "client"
        },
        {
          text: "Status",
          value: "paymentStatus"
        },
        {
          text: "Pagamento",
          value: "payment"
        },
        {
          text: "Valor pago",
          value: "amountPaid"
        },
        {
          text: "Valor total",
          value: "total"
        },
        {
          sortable: false,
          value: "edit",
          align: "right"
        }
      ]
    };
  },
  methods: {
    selectOrder(item) {
      if (!item.paymentStatus) {
        this.dialogDatePayment = true;
        this.orderCurrent = item;
        this.orderCurrent.datePayment = now;
      } else {
        item.paymentStatus = false;
        takePaymentStatus(item);
      }
    },
    async takePaymentStatus(item) {
      try {
        const data = {
          _id: item._id,
          paymentStatus: item.paymentStatus,
          amountPaid: item.amountPaid,
          datePayment: item.paymentStatus ? item.datePayment : ""
        };
        await updateOrder(data, "payment");
        this.dialogDatePayment = false;
        this.loadOrders();
      } catch (error) {
        throw error;
      }
    },
    async loadOrders() {
      try {
        this.financeData = [];
        await loadingOrderAll().then(res => {
          res.data.order.map((item, i) => {
            this.financeData.push({
              total: this.formatValue(
                (item.items.reduce(
                  (acc, { value, amount }) => acc + amount * value,
                  0
                ) +
                  parseFloat(item.deliveryFee || 0) -
                  (item.discount || 0)) *
                  ((100 - (item.rateCard || 0)) / 100)
              ),
              date: this.formatDate(item.deliveryDate),
              ...item,
              amountPaid: item.amountPaid || 0,
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
    this.loadOrders();
  }
};
