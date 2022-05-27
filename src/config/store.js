import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        estaAutenticado: true,
        keycloak: null,
        tokenParsed: null,
        usuario: {
            nome: 'Usuário',
            ponto: 'P_0000',
            contextos: [],
            funcionalidades: []
        },
        listas: {
            tiposProposicao: [],
            situacoes: [],
            orgaos: [],
            ufs: [],
            partidos: [],
            parlamentares: []
        }
    },
    mutations: {
        setListas(state, listas) {
            state.listas.tiposProposicao = listas.tiposProposicao
            state.listas.situacoes = listas.situacoes
            state.listas.orgaos = listas.orgaos
            state.listas.ufs = listas.ufs
            state.listas.partidos = listas.partidos
            state.listas.parlamentares = listas.parlamentares
        },
        updateToken(state, objResponseKeycloak) {
            if (!objResponseKeycloak) {
                state.usuario = {
                    nome: 'Usuário',
                    ponto: 'P_0000',
                    contextos: [],
                    funcionalidades: []
                }
                state.token = null
                state.refreshToken = null
                state.estaAutenticado = false
            } else {
                state.estaAutenticado = true
            }
        },
        updateStateKeycloak(state, keycloak) {
            state.keycloak = keycloak;
        },
        updateStateFromToken(state, tokenParsed) {
            state.tokenParsed = tokenParsed
            if (tokenParsed) {
                state.usuario.ponto = tokenParsed.preferred_username.toUpperCase()
                state.usuario.nome = tokenParsed.name
            } else {
                state.usuario.ponto = null
                state.usuario.nome = null
            }
        },
        setContextosEFuncionalidades(state, dadosIdean) {
            state.usuario.contextos = [...dadosIdean.contextos]
            state.usuario.funcionalidades = [...dadosIdean.funcionalidades]
        },
    }
})
