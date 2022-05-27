
<template>
  <div class="container-fluid">
    
    <div class="page-header">
      <h1>Consultar Documentos</h1>
    </div>

    
    <section>
      <div class="col-lg-12">

          <legend class="sr-only">
              Data inicial e final do processo
          </legend>

          <div class="row">
              <div class="form-group col-xs-12 col-md-2">
                  <div class="input-group">
                      <label for="dataInicial">Data início</label>
                      <input v-model="picDataInicial" type="text" class="form-control" id="dataInicial" data-pic-datepicker @change='dataAlterada()' />
                  </div>
              </div>
              <div class="form-group col-xs-12 col-md-2">
                  <div class="input-group">
                      <label for="dataFinal">Data fim</label>
                      <input v-model="picDataFinal" type="text" class="form-control" id="dataFinal" data-pic-datepicker @change='dataAlterada()'/>                       
                  </div>
              </div>
          </div> 

          <div class="row">
              <div class="col-xs-6 col-md-2">
                  <div class="form-group">
                      <label for="tipo">Tipo</label>
                      <input v-model="tipoDocumento" type="text" class="form-control" name="tipo" id="tipo">
                  </div>
              </div>

              <div class="col-xs-6 col-md-2">
                  <div class="form-group">
                      <label for="assunto">Assunto</label>
                      <input type="text" class="form-control" name="assunto" id="assunto">
                  </div>
              </div>  
          </div>


          <div class="row">
              <div class="form-group col-xs-12 col-md-2">
                  <button @click="pesquisar()" class="btn btn-primary btn-block search-nota-tecnica"><span class="glyphicon glyphicon-search"></span> Pesquisar</button>
              </div>   
          </div>

      </div>
    </section>

    <section>
      <h2>Resultado da consulta</h2>
      <div class="row">
          <div class="col-lg-12">  
            
            <table class="table table-bordered" data-pic-datatable>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Tipo</th>
                  <th>Assunto</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for='(doc, index) in resultado' :key='index'>
                  <td>{{ doc.numeroDoc }}</td>
                  <td>{{ doc.tipoDoc }}</td>
                  <td>{{ doc.assuntoDoc }}</td>
                  <td>{{ doc.dataDoc }}</td>                    
                  <td>{{ doc.acoes }}</td>
                </tr>      
              </tbody>
            </table>

          </div>
      </div>        
    </section>

  </div>
</template>


<script>
import PicDatatable  from "@/components/_picDatatable";
import PicDatepicker from "@/components/_picDatepicker";


export default {
  name: "consultaDoc",
  head: {
    title: {
      inner: "Consulta Documento",
      separator: "-",
      complement: "Digital"
    },
    meta: [{ name: "description", content: "Componente Datatable" }]
  },
  components: {
    PicDatatable,
    PicDatepicker
  },


 
  
  data() {
    
    return {
      picDataInicial: '',
      picDataFinal:'',
      parametros: {},
      resultado: [],

      documentos: [
        {
          numeroDoc: "100/2021",
          tipoDoc: "Memorando",
          assuntoDoc: "Iluminação",
          dataDoc: "11/11/2019 21:27:22",
          acoes: "Excluir",
        },
        {
          numeroDoc: "100/2021",
          tipoDoc: "Ofício",
          assuntoDoc: "Pintura",
          dataDoc: "10/06/2020 18:26:47",
          acoes: "Excluir",
        },
        {
          numeroDoc: "100/2021",
          tipoDoc: "Ofício",
          assuntoDoc: "Objetos de Decoração",
          dataDoc: "15/07/2019 14:03:57",
          acoes: "Excluir",
        },
        {
          numeroDoc: "101/2021",
          tipoDoc: "Ato Presidente",
          assuntoDoc: "Mês comemorativo",
          dataDoc: "27/06/2019 12:12:39",
          acoes: "Excluir",
        },
        {
          numeroDoc: "102/2021",
          tipoDoc: "Ato Presidente",
          assuntoDoc: "Pintura",
          dataDoc: "04/09/2019 11:27:34",
          acoes: "Excluir",
        },
        {
          numeroDoc: "103/2021",
          tipoDoc: "Memorando",
          assuntoDoc: "Objetos",
          dataDoc: "24/06/2020 17:58:13",
          acoes: "Excluir",
        },
        {
          numeroDoc: "104/2021",
          tipoDoc: "Ofício",
          assuntoDoc: "Iluminação",
          dataDoc: "04/09/2019 11:26:41",
          acoes: "Excluir",
        },
        {
          numeroDoc: "105/2021",
          tipoDoc: "Ato Presidente",
          assuntoDoc: "Pintura",
          dataDoc: "27/06/2019 12:12:39",
          acoes: "Excluir",
        },
        {
          numeroDoc: "106/2021",
          tipoDoc: "Ofício",
          assuntoDoc: "Objetos",
          dataDoc: "05/03/2020 13:58:08",
          acoes: "Excluir",
        },
        {
          numeroDoc: "107/2021",
          tipoDoc: "Memorando",
          assuntoDoc: "Iluminação",
          dataDoc: "24/06/2020 17:58:14",
          acoes: "Excluir",
        },
      ],
    };
  },
  methods: {
   
    mudaPaginate() {
      // this.paginate[0] = 1;
      this.$set(this.paginate, 0, 1);
    }
  
  },
  computed: {

 pesquisar(){
      this.resultado = [];
       this.documentos.filter(item => {
         if(item.tipoDoc.toLowerCase().indexOf(this.tipoDocumento.toLowerCase()) > -1){
           this.resultado.push(item);
         }
      })      

    }

  },
  mounted(){
  this.resultado = this.documentos;

  }

};



</script>
