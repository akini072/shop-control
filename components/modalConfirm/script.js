export default {
  props: {
    modalConfirm: {
      type: Boolean,
      required: true
    },
    msg: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  watch: {
    modalConfirm: function () {
      this.$emit('value', this.modalConfirm)
    }
  }
}
