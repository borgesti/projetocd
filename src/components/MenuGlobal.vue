<template>
  <div id="pic-menu-global">
 <div>
  <b-navbar class="navbar navbar-default">
      <b-navbar-nav>
        <b-nav-item router-link to="/HomePage">Início</b-nav-item>
        <b-nav-item href="#" >UT Unidades Tramitadoras</b-nav-item>
        <!--<b-nav-item router-link to="/ListarNota">Notas</b-nav-item>-->
        <b-nav-item router-link to="/ListarNotaProcesso">Notas</b-nav-item>
      </b-navbar-nav>
  </b-navbar>
</div>
  </div>
</template>

<script>
export default {
  name: "MenuGlobal"
}
</script>

<style scoped>
</style>