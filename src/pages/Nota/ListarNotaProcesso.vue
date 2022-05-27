<template>

  <div class="container-fluid">
    <!--
    <AppLoading 
        :loading="loading" 
    >
    </AppLoading>     
    -->
    

    <div class="row">
        <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">

            <Notificacao
                :type   =  type
                :msgNot =  msgNot
                :showMSG=  showMSG
                :timeOut=  timeOut
            >
            </Notificacao>
            
            <div class="page-header">
                <h1>Gerenciar Notas</h1>
            </div>
            


            <div class="panel panel-default">
                <div class="panel-body">
                             
                    <HeaderProcesso 
                        :numeroProcesso = numProcesso
                        :desTitulo= desTitulo
                        :desProcedencia= desProcedencia
                    >                        
                    </HeaderProcesso>
                   
                </div>
            </div> 

       
            <div class="row SubsubTitulo">
                <div class="col-lg-1 col-sm-2 col-md-2">
                    <img src="@/assets/images/VectorListaNota.png"  alt="">
                </div>                
                <div class="subTitulo col-lg-8 col-sm-6 col-md-6">
                    <h2>Lista de Notas</h2>
                </div>                    
                <div class="btnIncluirNota">
                    <button 
                        type="button"
                        class="btn btn-secondary" 
                       
                        data-toggle="modal" 
                        @click="abrirModalIncluirNota()"                                
                    >Incluir Nota</button>          
                </div>                
            </div>               

            
            <!-- Iníco da Grade Listar Notas-->
            <div class="row">
                <div class="col-lg-12">  

                    <table class="table table-bordered table-container table-hover" >
                        <thead>
                            <tr>
                                <th>Nota</th>
                                <th>Data de inclusão</th>                                
                                <th>Servidor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>

                            <ItemListarNotaProcesso
                                v-for="nota in listaDeNotas"
                                :key="nota.index"
                                :nota="nota"
                                @excluir="abrirModalconfirmarExclusaoNota($event)"
                            >
                            </ItemListarNotaProcesso>    
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
            

            <div class="row">
                <div class="col-md-12 col-sm-12 mg-top btnVisualizarEdoc">
                    <a href="" class="btn btn-success">Visualizar no eDoc</a>
                </div>
            </div>    
        
         

        </div>    
    </div>
    
    
    <!-- ###################### Modal ################### -->

    <div class="modal fade" id="modalIncluirNota" tabindex="-1" role="dialog" aria-labelledby="modalIncluirNota"  aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Incluir Nota</h4>
                </div>

                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="descricaoNota" class="col-form-label">Nota:</label>
                            <textarea 
                                v-model="nota.desNota"
                                id="descricaoNota"
                                class="form-control"                                
                            >
                            </textarea>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button 
                        class="btn btn-primary" 
                        type="submit"
                        @click="confirmarInclusaoNota()"
                        >Incluir
                    </button>   

                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>

                </div>

            </div>
        </div>
    </div>     



    <div class="modal fade" id="modalConfirmarExclusaoNota" tabindex="-1" role="dialog" aria-labelledby="modalConfirmarExclusaoNota"  aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Excluir Nota</h4>
                </div>

                <div class="modal-body">
                    <form>
                        <p class="texto-info">
                            <strong class="info-titulo">Atenção!</strong>
                            Tem certeza que deseja excluir a Nota do Processo?
                        </p>
                    </form>
                </div>

                <div class="modal-footer">
                    <button 
                        class="btn btn-primary" 
                        type="submit"
                        @click="confirmarExclusaoNota(nota.id)"
                        >Excluir
                    </button>   

                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>

                </div>

            </div>
        </div>
    </div>     
 


    <!-- Fim da Modal Nota -->


    
  </div>
</template>


<script>
    import { notasService } from "@/pages/Nota/services/notasService";    
    import Notificacao      from "@/components/Shared/Notificacao"
    
    import HeaderProcesso from "@/components/Shared/HeaderProcesso"        
    import Paginacao      from "@/components/Shared/Paginacao"
    import ItemListarNotaProcesso   from '@/pages/Nota/components/ItemListarNotaProcesso.vue'

    export default {
        name: 'ListarNotaProcesso',
        data() {
            return {
                
                /*alert*/
                type: "",
                msgNot: "",
                showMSG: "",
                timeOut: 200,


                listaDeNotas: [],
                nota:{},
                notaExcluir:{},

                desNota: '',
                idNota: '',
                datInclusaoNota: '',
                desLoginResponsavel: '',
                desAnotacaoProcesso: '',
                datInclusaoAnotacaoProcesso: '',

                numProcesso: "100/2021",
                desProcedencia: "Maria",
                desTitulo: "Iluminação",

                parametros: {},
                itensPorPagina: 10,
                totalDeRegistros: 0,
                pagina: 0,                
            }

        },
        
        
        head: {
            title: {
            inner: "Presidência Digital",
            separator: " ",
            complement: " ",
            },
            meta: [
            {
                name: "description",
                content: "Presidência Digital",
            },
            ],
        },

        components: {
            
            //PicModal,
            //PicValidation,
            //PicAlert,
            //picActionsbar,
            //AppLoading,
            Notificacao,
            
            HeaderProcesso,
            ItemListarNotaProcesso,
            Paginacao,
        },
  
        methods: {
            setFocus(elemId) {
                setTimeout(() => { document.querySelector(elemId).focus() }, 800);
            },

            inicializar() {
                this.carregaNotas();          
            },


            formatarObjetoData(d) {
                if (!d) return d
                let data = new Date(d)
                if (!data instanceof Date || isNaN(data.valueOf()))
                    return d

                return data.toLocaleDateString('pt-BR', {timeZone: "America/Sao_Paulo"})
            },

            /* Carregar Notas  */
            carregaNotas() {
                this.loading = true;

                notasService
                    .listarNotas(this.itensPorPagina , this.pagina)
                    .then(res => {
                        if (res.length <= 0) {
                            this.type   = "warning"
                            this.msgNot = "Não há nenhuma nota cadastrada para esse processo"
                            this.showMSG=  true
                            this.timeOut= 200                            
                        
                        } else {
                            this.listaDeNotas = res.content;
                            this.totalDeRegistros = res.totalElements;
                            console.log("total de registro: "+res.totalElements);
                               
                        }
                    })
                    .catch(erro => {
                        console.log(erro);
                    })
                    .finally(() => {
                        this.loading = false;
                          
                    });
            },       
            
            
            /* incluir Nota */
            confirmarInclusaoNota() {                
                this.incluirNota(); 
            }, 

            abrirModalIncluirNota() {
                $('#modalIncluirNota').modal('show')
                
            },

            incluirNota() {
                notasService
                    .salvarNota(this.nota)
                        
                    .then((res) => {
                        this.type   = "success"
                        this.msgNot = "Nota incluída com sucesso"
                        this.showMSG=  true
                        this.timeOut= 200
                        this.carregaNotas()


                    })
                    .catch(erro => {
                        this.type   = "error"
                        this.msgNot = "Não foi possível incluir a Nota"
                        this.showMSG=  true
                        this.timeOut= 200

                    })
                    .finally(                         
                         this.fecharModalIncluirNota() 
                    );
             
            }, 
            
            fecharModalIncluirNota(){
                $('#modalIncluirNota').modal('hide') 
                this.nota={}
            },
            
            abrirModalconfirmarExclusaoNota(nota) {
                this.notaExcluir = {};                                
                this.notaExcluir = nota;
                $('#modalConfirmarExclusaoNota').modal('show')
            },



            confirmarExclusaoNota() {
                console.log("Nota ecluir d: " + this.notaExcluir.id)
                this.excluirNota(this.notaExcluir); 
                /*
                setTimeout(() => {
                    $('#modalConfirmarExclusaoNota').modal('hide');                    
                }, 200);
                */
            }, 


            /* Excluir Nota */
            excluirNota(nota) {
                let idNotaExcluir = nota.id
                /*Chamar o modal para confirmar a exclusão da nota*/
                //let idNotaExcluir = nota
                console.log("Nota ecluir: " + idNotaExcluir)
                notasService
                    .excluirNotaService(idNotaExcluir)
                        
                    .then((res) => {
                        this.type   = "success"
                        this.msgNot = "Nota excluída com sucesso"
                        this.showMSG=  true
                        this.timeOut= 200
                        this.carregaNotas();
                    })
                    .catch(erro => {
                        this.type   = "error"
                        this.msgNot = "Não foi possível excluir a Nota"
                        this.showMSG=  true
                        this.timeOut= 200

                    })
                    .finally(
                        $('#modalConfirmarExclusaoNota').modal('hide')                        
                        );

                                    
            }, 

            


         /* Visualizr Nota */
            visualizarNota(nota) {
                let idNotaVisualizar = nota.id                                
                notasService
                    .visualizarNotaService(idNotaVisualizar)
                        
                    .then((res) => {
                        if (res.length <= 0) {
                            this.type   = "warning"
                            this.msgNot = "Não foi possível visualizar nota selecionada"
                            this.showMSG=  true
                            this.timeOut= 200

                        } else {
                            this.nota = res;
                        }                        
    
                    })
                    .catch(erro => {
                        this.type   = "error"
                        this.msgNot = "Não foi possível visualizar a Nota"
                        this.showMSG=  true
                        this.timeOut= 200

                    })
                    .finally();

                                    
            }, 

            clickPagina(pagina) {

                notasService
                    .listarNotas(this.itensPorPagina , pagina)
                    .then(res => {
                        if (res.length <= 0) {
                            this.type   = "warning"
                            this.msgNot = "Não há nenhuma nota cadastrada para esse processo"
                            this.showMSG=  true
                            this.timeOut= 200

                        } else {
                            this.listaDeNotas = res.content;
                            this.totalDeRegistros = res.totalElements;
                             console.log("total de registro: "+res.totalElements);
                                
                        }
                    })
                    .catch(erro => {
                        console.log(erro);
                    })
                    .finally();

                
            },



        },

        beforeMount() {
              this.inicializar();
        },

    }

</script>

<style>
    .btnIncluirNota {
        margin-top: 1.5rem;
        margin-right: 2px;
        float:right !important;   
    }
    .SubsubTitulo{
        margin-top: 1.5rem;
        margin-bottom: 20px;
         margin-right: 0.2px!important; 
    } 
    .subTitulo{
        text-align: left;
        
    }   
    .btnVisualizarEdoc{
        margin-top: 5rem;
    }

  
</style>