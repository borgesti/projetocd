<template>
    <div class="row">
        <div class="col-xs-6 col-md-3">
            <div class="form-group">
                Nº Processo eDoc
                <!--<input v-model="numeroProcesso" type="text" class="form-control" name="numeroProcesso" id="numeroProcesso" readonly>-->
                <p type="text" name="numeroProcesso" id="numeroProcesso" ><strong>{{ numeroProcesso }}</strong></p>
            </div>
        </div>
        
        <div class="col-xs-6 col-md-3">
            <div class="form-group">
                Titulo
                <!--<input v-model="desTitulo" type="text" class="form-control" name="desTitulo" id="desTitulo" readonly>-->
                <p type="text" name="desTitulo" id="desTitulo" ><strong>{{ desTitulo }}</strong></p>
            </div>
        </div>  

        <div class="col-sm-12 col-xs-12 col-md-6">
            <div class="form-group">
                Procedência
                <!--<input v-model="desProcedencia" type="text" class="form-control" name="desProcedencia" id="desProcedencia" readonly>-->
                <p type="text" name="desProcedencia" id="desProcedencia" ><strong>{{ desProcedencia }}</strong></p>
            </div>
        </div>  
    </div>    
</template>


<script>
    export default ({
        nome: "HeaderProcesso",
        props: ["numeroProcesso", "desTitulo", "desProcedencia"],
    })
</script>


<style>

</style>
