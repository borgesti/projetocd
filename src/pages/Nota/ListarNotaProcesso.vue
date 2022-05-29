<template>

  <b-container fluid>
   

    <b-row>
        <b-col    col sm="10" offset-sm="1"  md="8"     offset-md="2" col-lg="8" offset-lg="2">
            <!-- "col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8   col-lg-offset-2" -->
            <div v-if=mostrarAlert >
                <Notificacao
                    :tipoAlert      = tipoAlert
                    :msgAlert       = msgAlert
                    :mostrarAlert   = mostrarAlert      
                    :btnFecharAlert = btnFecharAlert    
                    :timeOutAlert   = timeOutAlert
                >
                </Notificacao>
            </div>
   
            <div class="page-header">
                <h1>Gerenciar Notas</h1>
            </div>
            

            <div class="panel panel-default">
                <div class="panel-body">
                    
                    <HeaderProcesso 
                        :numeroProcesso = numProcesso
                        :desTitulo      = desTitulo
                        :desProcedencia = desProcedencia
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
                    <b-button id="show-btn" @click="$bvModal.show('bv-modal-incluirNota')">Incluir Nota</b-button>              
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
                                @excluir="abrirModalExcluirNota($event)"
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
        
         

        </b-col>    
   </b-row>
    





    <!-- ###################### Modal ################### -->


    <!-- Modal Bootstrap VUE Incluir Nota -->
    <b-modal 
        id="bv-modal-incluirNota" 
        size="lg" 
        hide-footer
        no-close-on-backdrop
        title="Incluir Nota"

    >
        <div class="d-block text-center">
            <h3></h3>
        </div>

        <form>
            <b-form-group
            label="Nota"
            >
                <b-form-textarea
                id="descricaoNota"
                v-model="nota.desNota"
                placeholder="Descrição da nota..."
                rows="5"
                max-rows="10"
                required
                >
                </b-form-textarea>                             
            </b-form-group>
        </form>
        
        <div class="espacoBtn">
            <button 
                class="btn btn-primary " 
                type="submit"
                @click="confirmarInclusaoNota()"
                >Incluir
            </button>

            <b-button 
                class="btn btn-secondary btn-cancelar" 
                block 
                @click="$bvModal.hide('bv-modal-incluirNota')"
            >Cancelar
            </b-button>
        </div>

    </b-modal>



 
    <!-- Modal Bootstrap VUE Excluir Nota -->
    <b-modal 
        id="bv-modal-excluirNota" 
        size="sm" 
        hide-footer
        no-close-on-backdrop
        title="Excluir Nota"

    >
        <div class="d-block text-center">
            <h3></h3>
        </div>

        <div class="d-block text-center">
            <h3>Atenção!</h3>
        </div>
        
        <div>
            <p class="texto-info">            
                Tem certeza que deseja excluir a Nota do Processo?
            </p>
        
        </div>

        <div class="espacoBtn">

            <button 
                class="btn btn-primary" 
                type="submit"
                @click="confirmarExclusaoNota(nota.id)"
                >Excluir
            </button>
            
            
            <b-button 
                class="btn btn-secondary btn-cancelar" 
                block 
                @click="$bvModal.hide('bv-modal-excluirNota')"
            >
                Cancelar
            </b-button>
        </div>

    </b-modal>

 
 


  




  </b-container>
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
                msgAlert      : "",
                tipoAlert     : "",
                mostrarAlert  : false,
                btnFecharAlert: false,
                timeOutAlert  : 0,

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
                desTitulo: "Iluminação",
                desProcedencia: "Maria",
                

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
            Notificacao,            
            HeaderProcesso,
            ItemListarNotaProcesso,
            Paginacao,
        },
  
        methods: {

            inicializar() {
                this.carregaNotas();          
            },



            /* Carregar Notas  */
            carregaNotas() {
                this.loading = true;

                notasService
                    .listarNotas(this.itensPorPagina , this.pagina)
                    .then(res => {
                        if (res.length <= 0) {                         
                            this.tipoAlert      = "warning"
                            this.msgAlert       = "Não há nenhuma nota cadastrada para esse processo"
                            this.mostrarAlert   = true
                            this.btnFecharAlert = false
                            this.timeOutAlert   = 5                                                            
                        
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
                        this.loading      = false
                          
                    });
            },       
            
            
            /* Incluir Nota */
            abrirModalIncluirNota() {
                this.nota = {};                    
                this.$bvModal.show('bv-modal-incluirNota')
                
            },

            confirmarInclusaoNota() { 
                console.log(this.nota.desNota)               ;
                this.incluirNota(); 
            }, 


            incluirNota() {
                notasService
                    .salvarNota(this.nota)
                        
                    .then((res) => {
                        this.tipoAlert      = "success"
                        this.msgAlert       = "Nota incluída com sucesso"
                        this.mostrarAlert   = true
                        this.btnFecharAlert = false
                        this.timeOutAlert   = 5

                        this.carregaNotas()

                    })
                    .catch(erro => {
                        this.tipoAlert      = "error"
                        this.msgAlert       = "Não foi possível incluir a Nota"
                        this.mostrarAlert   = true
                        this.btnFecharAlert = false
                        this.timeOutAlert   = 5

                    })
                    .finally(                         
                        this.$bvModal.hide('bv-modal-incluirNota'),
                        this.nota={},
                        this.mostrarAlert   = false
                    );
             
            }, 


            
            
            /* Excluir Nota */
            abrirModalExcluirNota(nota){
                this.notaExcluir = {};                                
                this.notaExcluir = nota;
                this.$bvModal.show('bv-modal-excluirNota')
            },



            confirmarExclusaoNota() {
                console.log("Nota ecluir d: " + this.notaExcluir.id)
                this.excluirNota(this.notaExcluir); 
            }, 


            excluirNota(nota) {
                let idNotaExcluir = nota.id

                console.log("Nota ecluir: " + idNotaExcluir)
                notasService
                    .excluirNotaService(idNotaExcluir)
                        
                    .then((res) => {
                        this.tipoAlert      = "success"
                        this.msgAlert       = "Nota excluída com sucesso"
                        this.mostrarAlert   = true
                        this.btnFecharAlert = false
                        this.timeOutAlert   = 5
                        this.carregaNotas();
                    })
                    .catch(erro => {
                        this.tipoAlert      = "error"
                        this.msgAlert       = "Não foi possível excluir a Nota"
                        this.mostrarAlert   = true
                        this.btnFecharAlert = false
                        this.timeOutAlert   = 5                        

                    })
                    .finally(
                        this.$bvModal.hide('bv-modal-excluirNota'),
                        this.mostrarAlert= false                         
                        );

                                    
            }, 

            


         /* Visualizr Nota */
            visualizarNota(nota) {
                let idNotaVisualizar = nota.id                                
                notasService
                    .visualizarNotaService(idNotaVisualizar)
                        
                    .then((res) => {
                        if (res.length <= 0) {
                            this.tipoAlert      = "warning"
                            this.msgAlert       = "Não foi possível visualizar nota selecionada"
                            this.mostrarAlert   = true
                            this.btnFecharAlert = false
                            this.timeOutAlert   = 5  

                        } else {
                            this.nota = res;
                        }                        
    
                    })
                    .catch(erro => {
                        this.tipoAlert      = "warning"
                        this.msgAlert       = "Não foi possível visualizar nota selecionada"
                        this.mostrarAlert   = true
                        this.btnFecharAlert = false
                        this.timeOutAlert   = 5  

                    })
                    .finally(
                        this.mostrarAlert   = false
                    );

                                    
            }, 

            clickPagina(pagina) {

                notasService
                    .listarNotas(this.itensPorPagina , pagina)
                    .then(res => {
                        if (res.length <= 0) {
                            this.tipoAlert      = "warning"
                            this.msgAlert       = "Não há nenhuma nota cadastrada para esse processo"
                            this.mostrarAlert   = true
                            this.btnFecharAlert = false
                            this.timeOutAlert   = 5                             

                        } else {
                            this.listaDeNotas = res.content;
                            this.totalDeRegistros = res.totalElements;
                             console.log("total de registro: "+res.totalElements);
                                
                        }
                    })
                    .catch(erro => {
                        console.log(erro);
                    })
                    .finally(
                        this.mostrarAlert   = false
                    );

                
            },

            setFocus(elemId) {                
                setTimeout(() => { document.querySelector(elemId).focus() }, 0);
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

    .espacoBtn{
        margin-top: 3rem;
    }

    .btn-cancelar{
        margin-left: 2rem;
    }

  
</style>