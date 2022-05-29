<template>
  <!-- Informações de Rodapé -->
  <div class="rodape" role="contentinfo" aria-labelledby="foot-info">
    <div class="dir" id="foot-info">
      Produzido por
      <span>Ditec</span>
    </div>
     
    <div class="esq">
      <span class="sigla">COPAD</span>
      <span class="divisor">-</span>
      <span class="nomeSetor">Soluções de Tic para as Áreas Política e Administrativa</span>
      <span class="versao">{{version}}</span>
    </div>
  </div>
  <!-- /rodapé -->
</template>



<script> 
    export default {
      name: "Footer",
      data() {
          return {
          version: process.env.VUE_APP_VERSION
          };
      }
    };
</script>

<style>
</style>
