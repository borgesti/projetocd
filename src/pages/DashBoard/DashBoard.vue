<template>
    <div class="container-fluid">

        <AppLoading 
            :loading="loading" 
        >
        </AppLoading> 
              
        <div class="row">
            <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
                
                <!-- Início dos Card -> Small - Pequeno -->
                <div class="row">
                    <div class="col-xs-12 col-md-6 col-lg-4 col-right">
                        <DashCard 
                            tipoInfo='processosEnviados' 
                            modificador="small" 
                            :numero="50" 
                            texto="Processos Enviados e NÃO RECEBIDOS no Destino" 
                            icone="VectorProcessoEnviado.png" 
                            idCard="ProcessoEnviado"
                            @click="selecaoCard()"
                        />
                    </div>

                    <div class="col-xs-12 col-md-6 col-lg-4 col-right">
                        <DashCard 
                            tipoInfo='processosReceber' 
                            modificador="small"  
                            :numero="2" 
                            texto="Processos a Receber" 
                            icone="VectorProcessReceber.png" 
                            idCard="ProcessoReceber"
                             @click="selecaoCard()"
                        />
                    </div>

                    <div class="col-xs-12 col-md-6 col-lg-4 col-right">
                        <DashCard 
                            tipoInfo='documentosPendentesAssinatura' 
                            modificador="small" 
                            :numero="15" 
                            texto="Documentos pendentes de Assinatura" 
                            icone="VectorDocumentoPendente.png" 
                            idCard="DocumentoPendente"
                            @click="selecaoCard()"
                        />
                    </div>


                </div>
                <!-- Fim dos Card -->

                <div class="row">
                    <h1>Título</h1>  
                </div>

                
                
                <!-- Iníco da Grade Listar Notas-->
                <div class="row">
                    <div class="col-lg-12">  

                        <table class="table table-bordered table-container table-hover" >
                            <thead>
                                <tr>
                                    <th>Nº eDoc</th>
                                    <th>Tipo de Documento</th>
                                    <th>Título</th>
                                    <th>Interessado</th>
                                    <th>Data de Envio</th>
                                    <th>UT Origem</th>
                                    <th>UT a Receber</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                <ItemProcesso
                                    v-for="processo in listaProcesso"
                                    :key="processo.index"
                                    :processo="nota"
                                >
                                </ItemProcesso>    

                            </tbody>
                        </table>

                    </div>
                </div>   

                <div class="col-md-12">
                    <Paginacao 
                        :totalDeRegistros='totalDeRegistros' 
                        :pagina="pagina" 
                        :itensPorPagina='itensPorPagina' 
                        :clickCall='clickPagina'
                    >
                    </Paginacao>
                </div>  

                <!-- Fim da Grade Listar Notas-->                     
                
                <!-- Início da Grade Lista de Processos
                <div class="row">
                    <div class="col-lg-12">  

                        <table class="table table-bordered" >
                            <thead>
                                <tr>
                                <th>Nº eDoc</th>
                                <th>Tipo de Documento</th>
                                <th>Título</th>
                                <th>Interessado</th>
                                <th>Data de Envio</th>
                                <th>UT Origem</th>
                                <th>UT a Receber</th>
                                <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for='(doc, index) in listaProcesso' :key='index'>
                                    
                                    <td>{{ doc.numProcesso }}</td>
                                    <td>{{ doc.desTipoDocumento }}</td>
                                    <td>{{ doc.nomTitulo }}</td>
                                    <td>{{ doc.nomInteressado }}</td>
                                    <td>{{ doc.datEnvio }}</td>                    
                                    <td>{{ doc.desUtOrigem }}</td>                    
                                    <td>{{ doc.desUtDestino }}</td>                    

                                    <td>    
                                        <div class="text-right clearfix">
                                            <ul data-pic-actionsbar='{"type":"bar"}'>
                                                <li><a href="#modal-excluirNota">Excluir</a></li>
                                            </ul>
                                        </div>    
                                    </td>
                                
                                </tr>      
                            </tbody>
                        </table>

                    </div>

                </div>        
                Fim da Grade Lista de Processos-->                

            </div>

        </div>  

    
    </div>          
</template>

<script>
    import picActionsbar from "@/components/_picActionsbar"
    import AppLoading     from "@/components/Shared/AppLoading.vue"
    import Paginacao     from "@/components/Shared/Paginacao.vue"
    import DashCard      from "@/pages/DashBoard/components/DashCard.vue"

    export default {
        name: 'dashboard',
        data (){
            return{
                loading: false,
                listaProcesso: [
                    {
                    numProcesso: "5269/2019",
                    desTipoDocumento: "Memorando",
                    nomTitulo: "Iluminação",
                    nomInteressado: "Izabel",
                    datEnvio: "17/11/2019 15:15:15",
                    desUtOrigem: "Administrativo",
                    desUtDestino: "RES",                   
                    },
                    {
                    numProcesso: "Recebimento direto do solicitante",
                    desTipoDocumento: "Ofício",
                    nomTitulo: "Iluminação",
                    nomInteressado: "Alexandre",
                    datEnvio: "21/09/2019 11:15:37",
                    desUtOrigem: "Arquivo",
                    desUtDestino: "Administrativo",
                    }
                ],   
                
                parametros: {},
                itensPorPagina: 10,
                totalDeRegistros: 14,
                pagina: 1,                  
            }                

        },

        components: {
            picActionsbar, 
            AppLoading,
            Paginacao, 
            DashCard,
        },
        methods: {
            inicializar() {
            
             carregarLoad()       
            },

            /* Carregar Processos */
            carregarLoad()  {
            
                this.loading = false;
            },
            
            
        
            selecaoCard() {
                                        
                console.log("oooooooooo")
               
            },

                    
        },
        
        beforeMount() {

            this.inicializar()
     
            

        },        

    }
</script>


<style>

    
.card {
  background: #fff;
  position: relative;
  
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  min-width: 0;
  min-height:auto ;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  box-shadow: 5px 5px 5px rgba(0,0,0,.075);
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  overflow: hidden;
  flex-wrap: wrap;
}

.ativado {
    opacity: 1 !important;
    /* background: #173010 !important; */
    background: linear-gradient(90deg, #4A5C70 0%, #128EB6 94.27%)!important;
    color: #fff !important;
    
} 






/*
    - Geral 
*/

.pic-tema--altocontraste .link-cardSelecionado {
    background-color: #000;
    border: 1px solid #FFF;
    color: #FFF333;
}



.link-cardSelecionado__info {
    display: block;
    padding: 1rem 1.5rem;
}

@media(min-width: 768px) {
    .link-cardSelecionado__info {
        padding: 2rem 1.5rem;
    }
}

.link-cardSelecionado__titulo {
    display: block;
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 40px;
    letter-spacing: 1px;
}


.link-cardSelecionadoo__descricao {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 40px;
    letter-spacing: 1px;
}

@media(min-width: 768px) {
    .btn-devolver,
    .btn-transferir {
        width: auto;
        margin-top: 0;
    }
}

</style>