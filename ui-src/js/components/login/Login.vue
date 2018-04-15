<template>
  <div>
    <h3>{{translations.login}}:</h3>
    <form>

      <div class="alert alert-danger" role="alert" v-if="loginFailed">
        <p>
          <strong>{{translations.loginFailedTopic}}</strong><br />
          {{translations.loginFailedExplanation}}
        </p>
      </div>

      <p>
        {{translations.username}}:<br/>
        <input type="text"
               class="form-control"
               :placeholder="translations.username"
               v-model="username" />
      </p>

      <p>
        {{translations.password}}:<br />
        <input type="password"
               class="form-control"
               :placeholder="translations.password"
               v-model="password" />
      </p>

      <button class="btn btn-primary" v-on:click="login">{{translations.loginShort}}</button>

    </form>
  </div>
</template>

<script>
  export default {
    components: { },
    data: function() {
      return {
        username: '',
        password: '',
        loginFailed: false
      }
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.login;
      }
    },
    methods: {
      login: function(event) {

        event.preventDefault();
        this.loginFailed = false;

        let contentLoadingName = 'login';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        fetch(
          '/api/login',
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            }),
            credentials: 'same-origin'
          }
        ).then(
          data => data.json()
        ).then(data => {
          
          if(data.success === true) {
            this.$store.dispatch('login', { username: data.username });
          } else {
            this.loginFailed = true;
          }

          this.$store.dispatch('endContentLoading', contentLoadingName);

        }).catch(error => {

        });
      }
    }
  }
</script>
