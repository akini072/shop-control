import {
  loginUser
} from '../services/user'
import {
  saveToken
} from '../services/authenticate'

export default {
  layout: 'login',
  data() {
    return {
      msg: '',
      user: {
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    async submitForm() {
      if (this.$refs.fLogin.validate()) {
        await loginUser(this.user).then(({
            data
          }) => this.authenticateUser(data))
          .then(() =>
            this.$router.push({
              name: "order"
            })
          ).catch(() => this.msg = "Email ou senha inválidos")
      }
    },
    authenticateUser(data) {
      saveToken(data.token);
    }
  }
}
