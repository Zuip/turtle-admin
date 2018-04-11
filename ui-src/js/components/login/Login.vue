<template>
  <div>
    <h3>{{translations.login}}:</h3>
    <form>

      <p>
        {{translations.username}}:<br/>
        <input type="text"
               class="form-control"
               id="username"
               :placeholder="translations.username"
               v-model="username" />
      </p>

      <p>
        {{translations.password}}:<br />
        <input type="password"
               class="form-control"
               id="password"
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
    data: {
      username: '',
      password: ''
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.login;
      }
    },
    methods: {
      login: function(event) {
        event.preventDefault();
        fetch(
          '/login',
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })
          }
        ).then(function(data) {

        }).catch(function(error) {

        });
      }
    }
  }
</script>
