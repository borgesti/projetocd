<template>
  <!-- Header -->
  <div id="banner">
    <header>

      <div id="cabecalho" class="container-fluid">
        <div class="topoAplicacao">
          <a class="identAplicacao" href="/">
            <span class="sigla">Presidência Digital</span>
            <span class="nome">Plataforma Digital de trabalho da Presidência</span>
          </a>
          <!-- PONTO DE INSERÇÃO DAS FERRAMENTAS DE SUPORTE GLOBAL -->
          <!--
          <div class="suporteGlobal">
            <ul class="funcoesGlobais">
              <li>
                <span class="semLink usuario">
                  <span class="nome">usuario</span>
                  <span class="separador">/</span>
                  usuario (
                  <a
                    href="/"
                  
                  >SAIR</a>)
                </span>
              </li>
              <li class="menuSuporte menuConfiguracoes">
                <a href="#" id="config" >Configurações</a>
              </li>

              <li class="menuSuporte dropdown">
                <a href="#"  id="menuAjuda">Ajuda</a>
                  <div class="dropdown-content">
                    <a href="#">Manual do Sistema</a>
                    <a href="#">Sobre o Sistema</a>
                  </div>
              </li>
              
              <li class="menuSuporte">
              </li>
              <li class="menuSuporte">
                <a href="#" id="menuTemas">Temas</a>
              </li>
            </ul>
          </div>
          -->
        </div>
      </div>
      <div class="seloAmbiente posFinal">Teste</div>
      <!-- PONTO DE INSERÇÃO DO MENU GLOBAL -->
      <MenuGlobal/>

    </header>
  </div>
</template>



<script>
import MenuGlobal from '@/components/MenuGlobal.vue'

export default {
  name: 'Header',
   components: {
    MenuGlobal
  }
  
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
