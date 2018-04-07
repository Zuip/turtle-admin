<template>
  <div>
    <h3>Kirjaudu sisään:</h3>
    <form>

      <p>
        Käyttäjätunnus:<br/>
        <input type="text"
               class="form-control"
               id="username"
               placeholder="Käyttäjätunnus"
               v-model="username" />
      </p>

      <p>
        Salasana:<br />
        <input type="password"
               class="form-control"
               id="password"
               placeholder="Salasana" />
      </p>

      <button class="btn btn-primary" v-on:click="login">Kirjaudu</button>

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
    methods: {
      login: function(event) {
        event.preventDefault();
        fetch(
          '/login',
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              username: this.username
            })
          }
        ).then(function(data) {

        }).catch(function(error) {

        });
      }
    }
  }
</script>
