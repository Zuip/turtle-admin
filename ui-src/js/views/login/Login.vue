<template>
  <div>
    <h3>Kirjaudu sisään:</h3>
    <form>

      <p>
        Käyttäjätunnus:<br/>
        <input type="text"
               class="form-control"
               id="username"
               placeholder="Käyttäjätunnus" />
      </p>

      <p>
        Salasana:<br />
        <input type="password"
              class="form-control"
              id="password"
              placeholder="Salasana" />
      </p>

      <a class="btn btn-primary" href="#" role="button">Kirjaudu</a>
      
    </form>
  </div>
</template>

<script>
  export default {
    components: { }
  }
</script>
