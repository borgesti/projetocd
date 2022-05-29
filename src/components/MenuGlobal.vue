<template>
  <!--
  <div id="pic-menu-global">
    <div>
      <b-navbar class="navbar navbar-default">
          <b-navbar-nav>
            <b-collapse id="nav-collapse" is-nav>
              <b-nav-item router-link to="/HomePage">Início</b-nav-item>
              <b-nav-item router-link to="/UnidadeTramitadora">UT Unidades Tramitadoras</b-nav-item>
              <b-nav-item router-link to="/ListarNotaProcesso">Notas</b-nav-item>
            </b-collapse>
          </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
  -->
  <div id="pic-menu-global">
  <b-navbar class="navbar-default" toggleable="sm" type="light" variant="light">
      <!--<b-navbar-brand router-link to="/HomePage">Início</b-navbar-brand>-->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item router-link to="/HomePage">Início</b-nav-item>
          <b-nav-item router-link to="/UnidadeTramitadora">UT Unidades Tramitadoras</b-nav-item>
          <b-nav-item router-link to="/ListarNotaProcesso">Notas</b-nav-item>

          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Usuário</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>  
    </div>
</template>

<script>
export default {
  name: "MenuGlobal"
}
</script>

<style scoped>
</style>