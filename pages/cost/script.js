import {
  loadingCost,
  deleteCost,
  updateCost,
  createCost
} from '../../services/cost'

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
      requiredRules: [
        v => !!v || 'Requerid filling'
      ],
      costCurrent: {},
      costData: [],
      headersTable: [{
        text: 'Data',
        value: 'date'
      }, {
        text: 'Description',
        value: 'description'
      }, {
        text: 'Sum',
        value: 'total'
      }, {
        value: 'edit_delete'
      }],
      dialogEditCreate: false,
      confirmDelete: false
    }
  },
  methods: {
    async loadCost() {
      try {
        await loadingCost().then(res => this.costData = res.data.cost)
      } catch (error) {
        throw error
      }
    },
    async deleteCostEvent() {
      try {
        await deleteCost(this.costCurrent._id).then(() => this.loadCost())
      } catch (error) {
        throw error
      }
    },
    async saveCost() {
      if (this.$refs.formCost.validate()) {
        this.dialogEditCreate = false
        if (this.costCurrent.action === 'update') {
          try {
            return await updateCost(this.costCurrent).then(() => this.costCurrent = {})
          } catch (error) {
            throw error
          }
        }
        try {
          return await createCost(this.costCurrent).then(() => this.costCurrent = {}, this.costData.push(this.costCurrent))
        } catch (error) {
          throw error
        }
      }


    },
  },
  watch: {
    dialogEditCreate: function (val) {
      if (!val) this.costCurrent = {}
    }
  },
  mounted() {
    this.loadCost()
  }
}
