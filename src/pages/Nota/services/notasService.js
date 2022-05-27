import axios from 'axios'
const NOTA = 'nota';
const NOTA_API = process.env.VUE_APP_URL_BACK_END + NOTA;


export const notasService = {
  
      /* Listar Notas */
      listarNotas(pageSize, pageNo) {

        return new Promise((resolve, reject) => {
          let parametro = NOTA_API + '?pageSize=' + pageSize + '&pageNo='+ pageNo +'&sortBy=datInclusaoAnotacaoProcesso' + '&sortDir=desc'
          /*
          console.log("no serviço: "+NOTA_API)
          console.log("NOTA_API: " + parametro);
          */
          axios.get(parametro)
          .then(ret => {
            
            console.log(ret.data.totalElements);
            resolve(ret.data)
          }).catch(err => {
            reject(err)
          })
        })
      },
    
      /* Visualizar Nota */
      visualizarNotaService(idNotaVisualizar) {
        
            
        console.log("no services: ",idNotaVisualizar);  
        console.log(NOTA_API+`/${idNotaVisualizar}`)   
  

        return new Promise((resolve, reject) => {
          axios.get(
                NOTA_API+`/${idNotaVisualizar}`
              )
            .then(ret => {   
              
              console.log(ret.data)
              resolve(ret.data);

            })
            .catch(err => {
            reject(err)
            })
        })
      
    },

  
  
      /* Salvar Nota */
      salvarNota(parametros) {
        /*
        configuracaoNotaDTO = {
                id: null,
                desAnotacaoProcesso: parametros.desNota,
                desLoginResponsavel: 'P_XXXX',
                datInclusaoAnotacaoProcesso: '15/02/2022'
                let dataAtual = new Date("2022-12-17T03:24:00");
              }
        
        */
        
        let configuracaoNotaDTO = {
          id: null,
          desAnotacaoProcesso: parametros.desNota ? parametros.desNota : null
        };  
        
        //console.log("no services salvarNota: ",configuracaoNotaDTO);
       
        return new Promise((resolve, reject) => {
          axios.post(
              NOTA_API, 
              configuracaoNotaDTO
              )
            .then(ret => {      
              resolve(ret.data);
            })
            .catch(err => {
            reject(err)
            })
        })
      
    },




      /* Excluir Notas */
      excluirNotaService(idNotaExcluir) {
        
        //console.log("no services: ",idNotaExcluir);  

        let configuracaoNotaDTO = {
          id: idNotaExcluir,
        }           
        
        console.log("no services: ",configuracaoNotaDTO);  

        return new Promise((resolve, reject) => {
          axios.delete(
            NOTA_API 
            ,{ data: configuracaoNotaDTO }                            
            )          

            .then(ret => {      
              resolve(ret.data);
            })
            .catch(err => {
            reject(err)
            })
        })
      
    },








}
