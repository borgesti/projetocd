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
                    <b-button id="show-btn" @click="abrirModalIncluirNota()">Incluir Nota</b-button>              
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


    <!-- Modal Bootstrap VUE Incluir Nota -->
    <b-modal 
        id="bv-modal-incluirNota" 
        size="lg" 
        hide-footer
        title="Incluir Nota"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
    >
        <div class="d-block text-center">
            <h3></h3>
        </div>

        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
            label="Nota"
            label-for="nota-input"
            invalid-feedback="A nota é de preenchimento obrigatório!"
            :state="nameState"
            >
                <b-form-textarea
                id="descricaoNota"
                v-model="nota.desNota"
                placeholder="Descrição da nota..."
                rows="5"
                max-rows="10"
                required
                :state="nameState"
                ></b-form-textarea>                             
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
                this.nota = {};    
                this.$bvModal.show('bv-modal-incluirNota')
                
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
                        this.$bvModal.hide('bv-modal-incluirNota')
                        // this.fecharModalIncluirNota() 
                    );
             
            }, 
            
            fecharModalIncluirNota(){
                $('#modalIncluirNota').modal('hide') 
                this.nota={}
            },
            
            abrirModalconfirmarExclusaoNota(nota) {
                this.notaExcluir = {};                                
                this.notaExcluir = nota;
                this.$bvModal.show('bv-modal-excluirNota')
            },



            confirmarExclusaoNota() {
                console.log("Nota ecluir d: " + this.notaExcluir.id)
                this.excluirNota(this.notaExcluir); 
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
                        this.$bvModal.hide('bv-modal-excluirNota')                          
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

    .espacoBtn{
        margin-top: 3rem;
    }

    .btn-cancelar{
        margin-left: 2rem;
    }

  
</style>