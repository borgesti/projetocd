<template>
    <div v-if="loading"
      class="loader"
      aria-busy="true"
      aria-label="Carregando..."
      title="Carregando..."
    >
      <div class="maskLoaderPic maskAbsolute invert">
        <div class="loaderPic spinGrd"></div>
      </div>
    </div>

</template>

<script>

    export default ({
        nome: "compLoading",
        props: {
          loading: {
            type: Boolean,
            default: false
          }
        }
    })

</script>

<style>
</style>