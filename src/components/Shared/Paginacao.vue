<template>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-3 mobile-version">
            <div class="dataTables_length hidden-xs visible-sm visible-md visible-lg" id="pic-id-2_length">
                <label>
                    Exibir
                    <select name="pic-id-2-length" aria-controls="pic-id-2" class = "form-control input-sm">
                        <option value="10">10</option> 
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>    
                     por página
                </label>
            </div>
        </div>

        <div class="col-xs-12 col-md-3 mobile-version">
            <div class="dataTables_info col-xs-12" id="pic-id-12_info" role="status" aria-live="polite">{{ textoDaPaginacao }}</div>
        </div>

        <div class="col-xs-12 col-md-6 mobile-version">
            <div class="dataTables_paginate paging_bootstrap hidden-xs visible-sm visible-md visible-lg" id="pic-id-12_paginate">
                <ul class="pagination component-pg">
                    <li :class="['prev', isFirstPageSelected() ? 'disabled' : '']">
                        <a @click='paginaAnterior()' @keyup.enter='paginaAnterior()' :tabindex="isFirstPageSelected() ? -1 : 0" aria-label="Anterior" aria-disable="true">
                            <span class="glyphicon glyphicon-menu-left"></span> <span class="posicao">Anterior</span>
                        </a>
                    </li>
                    
                    <li v-for='botaoPagina in botoesPagina' 
                        :key='"botao" + botaoPagina' 
                        tabindex="0"
                        :class='["botaoPaginacao", "botao-" + botaoPagina-1, isCurrentPage(botaoPagina-1) ? "active" : ""]' 
                        @click='irParaPagina(botaoPagina-1)'>

                        <a href="#" :class='"link-" + botaoPagina' tabindex="-1">
                            {{ botaoPagina }}
                        </a>

                    </li>

                    <li :class="['next', isLastPageSelected() ? 'disabled' : '']">
                        <a @click='proximaPagina()' @keyup.enter='proximaPagina()' :tabindex="isLastPageSelected() ? -1 : 0" aria-label="Próxima">
                            <span class="posicao">Próxima</span> <span class="glyphicon glyphicon-menu-right"></span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: "Paginacao",
    props: {
        pagina: {
            type: Number
        },
        totalDeRegistros: {
            type: Number,
            required: true
        },
        itensPorPagina: {
            type: Number,
            required: true
        },        
        clickCall: {
            type: Function,
            default: () => {}
        }
    }, 
    data() {
        return {
            innerValue: 0,
            botoesPagina: null,
            numeroDePaginas: 0,
            windowWidth: 0,
            numeroMaximoDeBotoesDePaginaParaExibir: 5
        }
    },
    computed: {
        paginaCorrente: {
            get: function () {
                return this.pagina || this.innerValue
            },
            set: function(newValue) {
                this.innerValue = newValue
            }
        },
        textoDaPaginacao() {
            if (!this.totalDeRegistros) return ''
            let itemInicial = (this.paginaCorrente + 1) * this.itensPorPagina - this.itensPorPagina + 1
            let itemFinal = itemInicial + this.itensPorPagina - 1
            let totalItens = this.totalDeRegistros
            if (itemFinal > totalItens) itemFinal = totalItens
            return `De ${itemInicial} até ${itemFinal} de ${totalItens} itens`
        },
    },  
    watch: {
        totalDeRegistros: function() {
            this.innerValue = 0
            this.botoesPagina = null
            this.inicio()
        }
    },
    methods: {
        montarListaDeBotoesDePagina(numeroPaginaClicada) {
            if (!this.numeroDePaginas) {
                return
            }

            if (this.numeroDePaginas <= this.numeroMaximoDeBotoesDePaginaParaExibir) {
                this.botoesPagina = [...Array(this.numeroDePaginas).keys()].map(i => i + 1)
                return 
            }

            let botoesPaginaAtual = this.botoesPagina || [...Array(this.numeroMaximoDeBotoesDePaginaParaExibir).keys()].map(i => i + 1)

            const indiceMeio = parseInt(this.numeroMaximoDeBotoesDePaginaParaExibir / 2)
            const delta = this.numeroMaximoDeBotoesDePaginaParaExibir - indiceMeio - 1

            const numeroPaginaMeio = botoesPaginaAtual[indiceMeio]
            // if (numeroPaginaClicada == numeroPaginaMeio) return

            // Funções de deslocamento dos botões
            const fnDeslocamentoParaTras = (novoNumeroPaginaMeio, delta, direcao) => novoNumeroPaginaMeio + (delta * direcao) < 1
            const fnDeslocamentoParaFrente = (novoNumeroPaginaMeio, delta, direcao, numeroDePaginas) => novoNumeroPaginaMeio + (delta * direcao) > numeroDePaginas

            // Define a direção de deslocamento e qual função será utilizada
            const direcao = numeroPaginaClicada < numeroPaginaMeio ? -1 : 1
            const fnDeslocamento = numeroPaginaClicada < numeroPaginaMeio ? fnDeslocamentoParaTras : fnDeslocamentoParaFrente
            
            // Calcula qual será o número da página do botão central
            let novoNumeroPaginaMeio = numeroPaginaClicada
            while (fnDeslocamento(novoNumeroPaginaMeio, delta, direcao, this.numeroDePaginas)) {
                novoNumeroPaginaMeio+=-direcao
            }

            // Monta array de botões com novos números de página
            const numeroPrimeiroBotao = novoNumeroPaginaMeio - delta
            let novoArrayBotoesPagina = [...Array(this.numeroMaximoDeBotoesDePaginaParaExibir).keys()].map(i => i + numeroPrimeiroBotao)
            this.botoesPagina = novoArrayBotoesPagina
        },
        irParaPagina(pagina) {
            console.log("antes de testar: "+pagina)
            if (this.paginaCorrente == pagina) return
            this.innerValue = pagina
            this.montarListaDeBotoesDePagina(pagina)
            this.$emit('input', pagina)
            console.log("depos pagina: " + pagina)
            this.clickCall(pagina) // chama função de callback
        },
        paginaAnterior() {
            console.log("Pagina Corrente: " + this.paginaCorrente)
            if (this.paginaCorrente<=0) return
            this.irParaPagina(this.paginaCorrente - 1)
        },
        proximaPagina() {
            console.log("proximaPagina - Pagina Corrente: " + this.paginaCorrente)
            if (this.paginaCorrente >= ( this.numeroDePaginas -1) ) return
            this.irParaPagina(this.paginaCorrente + 1)
        },
        isFirstPageSelected() {
            return this.paginaCorrente === 1
        },
        isLastPageSelected() {
            console.log(this.paginaCorrente)
            console.log(this.numeroDePaginas)            
            console.log("final: " + (this.paginaCorrente == this.numeroDePaginas ) )
            return (this.paginaCorrente == this.numeroDePaginas )
        },
        isCurrentPage(pagina) {
            return this.paginaCorrente == pagina
        },
        inicio() {
            // DEFINE A QUANTIDADE MÁXIMA DE BOTOES
            this.windowWidth = document.documentElement.clientWidth;
            if(this.windowWidth !== 0 && this.windowWidth <= 767){
                this.numeroMaximoDeBotoesDePaginaParaExibir = 3
            }else{
                this.numeroMaximoDeBotoesDePaginaParaExibir = 5
            }
            this.numeroDePaginas = parseInt((this.totalDeRegistros + this.itensPorPagina - 1) / this.itensPorPagina)

            this.montarListaDeBotoesDePagina(this.pagina)

        }
    },
    mounted() {
        this.inicio()
    }
}
</script>

<style scoped>
    a {
        cursor: pointer;
    }
    .dataTables_paginate{
        display: block !important;
    }

    #pic-id-12_paginate{
       text-align: right;
    }
   .pagination.component-pg{
        margin: 0;
    }

    @media (max-width: 767px){
        .dataTables_paginate{
            display: inline-block !important;
            margin:auto;
        }
        .mobile-version{
            text-align: center;
            margin-bottom: 1rem;
        }
    }
</style>