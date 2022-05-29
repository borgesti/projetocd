import HomePage           from '@/components/HomePage.vue'
import ListarNotaProcesso from '@/pages/Nota/ListarNotaProcesso.vue'
import UnidadeTramitadora from '@/components/UnidadeTramitadora.vue'
    

export default [
    { path: '/HomePage'          , component: HomePage          , name: 'HomePage' },
    { path: '/UnidadeTramitadora', component: UnidadeTramitadora, name: 'UnidadeTramitadora' },
    { path: '/ListarNotaProcesso', component: ListarNotaProcesso, name: 'ListarNotaProcesso' },
  ]




