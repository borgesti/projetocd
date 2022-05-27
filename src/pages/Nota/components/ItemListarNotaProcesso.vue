<template>
  <tr class="flex-table">
    <td class="flex-row65">{{ nota.desAnotacaoProcesso }}</td>
    <td class="flex-row15">{{ nota.datInclusaoAnotacaoProcesso }} </td>    
    <td class="flex-row10">{{ nota.desLoginResponsavel }}</td>    
    
    <td class="flex-row05">      
        <div>
          <button
           href="#modalExcluirNota"
            @click="$emit('excluir', nota )"
            style="height: 28px; width: 28px; margin: 1px"           
          >
            <span
              class="glyphicon glyphicon-trash"
              style="right: 6px; top: -1px"
            ></span>
          </button>
        </div>
    </td>

  </tr>
</template>

<script>

  export default {
    name: "ItemListarNotaProcesso",
    props: {
      nota: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
            formatarObjetoData(d) {
                if (!d) return d
                let data = new Date(d)
                if (!data instanceof Date || isNaN(data.valueOf()))
                    return d

                return data.toLocaleDateString('pt-BR', {timeZone: "America/Sao_Paulo"})
            },      
    },
  };

</script>


<style>


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

.flex-row15 {
  width: 15%;
}
.flex-row65 {
  width: 60%;
}
.flex-row10 {
  width: 10%;
}

.flex-row05 {
  width: 05%;
}

@media only screen and (max-width: 767px) {
  
  th, td {
    width: auto;
    display: block;
    border: 0;
  }
  /*
  th {
    border-left: solid 1px #1565C0;
    border-right: solid 1px #1565C0;
    border-bottom: solid 1px #1565C0;
   
  }
  */
  
  td {
    border-left: solid 1px #d9d9d9;
    border-right: solid 1px #d9d9d9;
    border-bottom: solid 1px #d9d9d9;
  }


}

</style>