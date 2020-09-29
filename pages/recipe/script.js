import {loadingOrderAll} from '../../services/order'

import formatValue from '../../mixins/formatValue'
import formatDate from '../../mixins/formatDate'

export default {
    mixins : [
        formatValue, formatDate
    ],
    data() {
        return {
            recipeData: [],
            headersTable: [
                {
                    text: 'Data',
                    value: 'date'
                }, {
                    text: 'Cliente',
                    value: 'client'
                }, {
                    text: 'Pagamento',
                    value: 'payment'
                }, {
                    text: 'Quantidade',
                    value: 'qtd'
                }, {
                    text: 'SubTotal',
                    value: 'subTotal'
                }, {
                    text: 'Frete',
                    value: 'fee'
                }, {
                    text: 'Total',
                    value: 'total'
                }
            ]
        }
    },
    methods : {
        async loadOrders() {
            try {
                await loadingOrderAll().then(res => {
                    res
                        .data
                        .order
                        .map((item, i) => {
                            this
                                .recipeData
                                .push({
                                    qtd: item
                                        .items
                                        .reduce((acc, {amount}) => acc + parseFloat(amount), 0),
                                    subTotal: this.formatValue(item.items.reduce((acc, {value, amount}) => acc + (amount * value), 0)),
                                    fee: this.formatValue(item.deliveryFee),
                                    total: this.formatValue((item.items.reduce((acc, {value, amount}) => acc + (amount * value), 0) + parseFloat(item.deliveryFee || 0) - (item.discount || 0)) * ((100 - item.rateCard) / 100)),
                                    date: this.formatDate(item.deliveryDate),
                                    ...item
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
