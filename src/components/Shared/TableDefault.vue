<template>

    <div class="container-fluid">
        <table class="table table-bordered table-container" role="table">
            <thead>
                <tr class="flex-table header" role="rowgroup">
                    <th class="flex-row" role="columnheader" v-for="(column, index) in columnNames" :key="index">{{column}}</th>
                </tr>
            </thead>

            <tbody>
                <tr 
                    class="flex-table row" 
                    role="rowgroup" 
                    v-for="row in info" :key="row.id"
                >
                    <td class="flex-row" role="cell" v-for="(column, index) in columnNames" :key="index">{{row[column]}}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script>


export default {
    name: 'TableDefault',
    data(){
        return{
            listalabesTabela: [],
            vagasPaginadas: [],
            totalDeRegistros: 500,
            pagina: 1,
            itensPorPagina: 10,
            clickPagina: 15,
        }
    },
    
    props: ["info"],

    computed: {
        columnNames: 
            function() {
                const names = new Set();
                //console.log(": " + this.info.);
                for (const row of this.info) {            
                    for (const key of Object.keys(row)) {
                        
                        names.add(key);
                    }
                }
                
                this.listalabesTabela = names;
                //console.log(this.listalabesTabela.keys);
                //console.log(this.listalabesTabela.keys);
               
                return names;

            }
        },    
    methods: {     


    } 
}    


</script>

<style>

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

caption {
  display: none;
}

div {
  box-sizing: border-box;
}

.table-container {
  
  margin: 1em auto;
  width: 90%;
  max-width: 600px;
  border-collapse: collapse;
}

.flag-icon {
  margin-right: 0.1em;
}

td {
  border: 1px solid #d9d9d9;
  padding: 0.5em;
}

th {
  /*background: #1565C0;
  color: white;*/
  padding: 0.5em;
  border: 1px solid #1565C0; 
}

.flex-row {
  width: 25%;
}

.flex-row, .flex-cell {
  text-align: center;
}

@media only screen and (max-width: 767px) {
  
  th, td {
    width: auto;
    display: block;
    border: 0;
  }
  
  th {
   /* border-left: solid 1px #1565C0;
    border-right: solid 1px #1565C0;
    border-bottom: solid 1px #1565C0;
    */
  }
  
  td {
    border-left: solid 1px #d9d9d9;
    border-right: solid 1px #d9d9d9;
    border-bottom: solid 1px #d9d9d9;
  }
  
  .flex-row {
    width: 100%;
  }
}

</style>