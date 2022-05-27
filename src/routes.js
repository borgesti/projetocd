import ListarNota from './components/ListarNota.vue'
import HomePage from './components/HomePage.vue'

import ListarNotaProcesso from '@/pages/Nota/ListarNotaProcesso.vue'

    
export default [
    { path: '/HomePage', component: HomePage, name: 'HomePage' },
    { path: '/ListarNota', component: ListarNota, name: 'ListarNota' },
    { path: '/ListarNotaProcesso', component: ListarNotaProcesso, name: 'ListarNotaProcesso' },
  ]




