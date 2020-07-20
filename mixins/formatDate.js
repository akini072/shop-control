export default {
  methods: {
    formatDate(dateTime) {
      if (!dateTime) return null

      const [date, time] = dateTime.split('T')
      const [year, month, day] = date.split('-')

      return `${day}/${month}/${year}`
    },
  }
}
