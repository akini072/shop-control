import { loadingOrderAll } from "../../services/order";
import { loadingCost } from "../../services/cost";

import formatValue from "../../mixins/formatValue";

export default {
  mixins: [formatValue],
  data() {
    return {
      totalFinance: 0,
      totalRecipe: 0,
      totalCost: 0,
      tableFinanceProfit: [],
      tableRecipeProfit: [],
      headers: [
        {
          text: "",
          value: "description"
        },
        {
          text: "",
          value: "total"
        }
      ]
    };
  },
  methods: {
    async init() {
      await this.loadCost();
      await this.loadOrder();

      this.tableFinanceProfit = [
        {
          description: "Financial",
          total: this.totalFinance
        },
        {
          description: "Costs",
          total: this.totalCost
        }
      ];

      this.tableRecipeProfit = [
        {
          description: "Income",
          total: this.totalRecipe
        },
        {
          description: "Costs",
          total: this.totalCost
        }
      ];
    },
    async loadCost() {
      try {
        await loadingCost().then(res => {
          this.totalCost = res.data.cost.reduce(
            (acc, { total }) => acc + parseFloat(total),
            0
          );
        });
      } catch (error) {
        throw error;
      }
    },
    async loadOrder() {
      try {
        await loadingOrderAll().then(res => {
          this.totalFinance = res.data.order.reduce(
            (acc, { amountPaid }) => acc + amountPaid,
            0
          );

          this.totalRecipe = res.data.order.reduce(
            (acc, { items, deliveryFee, discount, rateCard }) =>
              parseFloat(
                acc +
                  (items.reduce(
                    (acc, { amount, value }) =>
                      acc + parseFloat(amount * value),
                    0
                  ) +
                    parseFloat(deliveryFee || 0) -
                    (discount || 0)) *
                    ((100 - rateCard) / 100)
              ),
            0
          );
        });
      } catch (error) {
        throw error;
      }
    }
  },
  mounted() {
    this.init();
  }
};
