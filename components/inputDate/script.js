import formatDate from '../../mixins/formatDate'

export default {
  mixins: [formatDate],
  props: {
    label: {
      type: String
    },
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    }
  },
  data() {
    return {
      menu: false
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date: function () {
      this.$emit('date', this.date)
    }
  },
  mounted() {
    this.$emit('date', this.date)
  }
}
