<template>
  <div class="row">
    <div class="card" v-bind:class="'card--'+modificador"   v-bind:id="idCard">
  
        <div class="card__body">
          <h2 class="card__title" :tipoInfo='tipoInfo' v-bind:class="'card__title--'+modificador">
          <a class="card__numero" v-if='numero' @click.stop.prevent="selecionarCard()" href="">{{ numero }}</a> 
          <span v-else> {{ numero }} </span>
          </h2>
          <p class="card__text" v-bind:class="'card__text--'+modificador">{{ texto }}</p>
        </div>

        <div  class="card__icon">
          <img :src="require(`@/assets/images/${icone}`)">
        </div> 
    </div>

  </div> 
</template>


<script>
  export default {
    name: "DashCard",
    Data() {
      return{
        
      }
    },
    props: ["texto", "numero", "modificador", "icone", 'tipoInfo', 'idCard'],
    methods: {    
      selecionarCard(){      
        //console.log(this.icone)                
        console.log(this.texto) 
        console.log(this.idCard)    
              
        const collection = document.getElementsByClassName("card");
        for (let i = 0; i < collection.length; i++) {
          collection[i].classList.remove("ativado");
        }

        var cardAtivado = document.querySelector("#"+this.idCard);
        cardAtivado.classList.add("ativado");
        console.log(cardAtivado.classList[0]); // btn        

      }
    }
  };
</script>


<style>
  .card {
    position: relative;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 0px 4px 4px rgb(0, 0, 0, 0.25);
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    margin-right: 1.5rem;    
    margin-left: 1.5rem;    
    overflow: hidden;
  }


  .ativado {
    opacity: 1 !important;
    /* background: #173010 !important; */
    background: linear-gradient(90deg, #4A5C70 0%, #128EB6 94.27%)!important;
    color: #fff !important;
    
} 
  .card:hover,
  .card:focus {
      box-shadow: 0 8px 24px rgb(149 157 165 / 20%);      
      opacity: 1 !important;
      background: linear-gradient(90deg, #4A5C70 0%, #128EB6 94.27%)!important;   
      color: #fff !important;
; 
  }


  .card--large
  .card--medium {
    height: 20rem;
  }

  .card--small {
    height: calc(20rem - 0.75rem);
  }

  .card__icon{
    height: 60px;
    width: 80px;
    position: absolute;
    top: 10px;
    right: 10px;
    filter: invert(50%);

  }


  .card--small{
    height: 30%;
  }


  .card__main-image{
    transition: all 0.3s ease-in-out;
  }

  .card__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 1rem;
    position: relative;
  }
  
  .card__title {
    margin: 0 0 0.75rem 0;
    font-size: 6rem;
  }

  .card__numero:hover,
  .card__numero:focus {
    font-weight: bold;
    font-size: 6rem;
    color: rgb(185, 172, 54)!important;
  }

  .card__text {
    font-size: 2rem;
    margin: 0;
  }
  .card__text:last-child {
    margin-bottom: 0;
  }

  /* Medium devices (desktops, 992px and up) */
  @media (min-width: 767px) {
    .card--large {
      height: 60vh;
    }
    .card--medium {
      height: calc(30vh - 0.75rem);
    }
    .card--small {
      height: calc(30vh - 0.75rem);
    }
    .card__body {
      padding: 1.25rem 2rem;
    }
    .card__title {
      font-size: 7rem;
    }
    .card__title--large {
      font-size: 16rem;
    }
  }
  @media (max-width: 1343px) {
    .card__title--small {
      font-size: 6rem;
    }
  }
  @media (max-width: 1150px) {
    .card__title--small {
      font-size: 4.5rem;
    }
    .card__text--small {
      font-size: 1.6rem;
    }
  }
  @media (max-width: 1024px) {
    .card__body {
      padding: 1.25rem 1.25rem;
    }
  }
  @media (max-width: 766px) {
    .vertical .card--medium{
      height: 40rem;
    }
    .card__icon{
      height: 50%;
    }
    .card--medium .card__icon{
      height: 30%;
    }
    .card--small .card__icon{
      height: 25%;
    }
    .vertical .card__icon{
      height: auto;
      width: 50%;
    }
    .vertical .card__text {
      font-size: 1.6rem;
    }
  }

</style>
