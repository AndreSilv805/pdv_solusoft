import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'

import Erro404Produtos from '@/views/produtos/Erro404Produtos.vue'
import Erro404Clientes from '@/views/clientes/Erro404Clientes.vue'
import Erro404Pedidos from '@/views/pedidos/Erro404Pedidos.vue'

const Produtos = () => import(/* webpackChunkName: "produtos" */ '@/views/produtos/Produtos.vue') 
const ProdutosHome = () => import(/* webpackChunkName: "produtos" */ '@/views/produtos/ProdutosHome.vue')

const ProdutoEditar = () => import(/* webpackChunkName: "produtos" */ '@/views/produtos/ProdutoEditar.vue')
const ProdutoCriar = () => import(/* webpackChunkName: "produtos" */ '@/views/produtos/ProdutoCriar.vue')

const Clientes = () => import(/* webpackChunkName: "produtos" */ '@/views/clientes/Clientes.vue') 
const ClientesHome = () => import(/* webpackChunkName: "produtos" */ '@/views/clientes/ClientesHome.vue')

const ClienteEditar = () => import(/* webpackChunkName: "produtos" */ '@/views/clientes/ClienteEditar.vue')
const ClienteCriar = () => import(/* webpackChunkName: "produtos" */ '@/views/clientes/ClienteCriar.vue')

const Pedidos = () => import(/* webpackChunkName: "pedidos" */ '@/views/pedidos/Pedidos.vue') 
const PedidosHome = () => import(/* webpackChunkName: "pedidos" */ '@/views/pedidos/PedidosHome.vue')
const PedidoDetalhes = () => import(/* webpackChunkName: "pedidos" */ '@/views/pedidos/PedidoDetalhes.vue')
const PedidoEditar = () => import(/* webpackChunkName: "pedidos" */ '@/views/pedidos/PedidoEditar.vue')





Vue.use(VueRouter)

///Essa função é para extrair o id da rota, geralmente para usada para editar ou detalhes
const extrairParametroId = route => ({
  id: +route.params.id
})

const routes = [
   
   {
    path: '/',
    name: 'Home',
    component: Home
  },

  ////rotas produtos  
  { 
    path: '/produtos', component: Produtos, 
    

    children: [

      { path: ':id(\\d+)/editar', alias: ':id(\\d+)/alterar', 
         components: {
          default: ProdutoEditar,
        },
        props: {
          default: extrairParametroId,
        },
      }, // produtos.com/produtos/2/editar

      { path: 'criar', component: ProdutoCriar, name: 'produtocriar'
      }, // produtos.com/produtos/criar

      {
         path: '', 
         component: ProdutosHome, 
         name: 'produtos',
        
      },
      { path: '*', component: Erro404Produtos }
    ] 
  },


  ///rotas clientes
  { 
    path: '/clientes', component: Clientes,
    
    children: [
      { path: ':id(\\d+)/editar', alias: ':id(\\d+)/alterar', 
         components: {
          default: ClienteEditar,
        },
        props: {
          default: extrairParametroId,
        },
      }, // produtos.com/clientes/2/editar

      { path: 'criar', component: ClienteCriar, name: 'clientecriar'
      }, // produtos.com/clientes/criar

      {
         path: '', 
         component: ClientesHome, 
         name: 'Clientes',
      },
      { path: '*', component: Erro404Clientes }
    ] 
  },


  ///rotas pedidos
  { 
    path: '/pedidos', component: Pedidos,

    children: [
      { path: ':id(\\d+)', component: PedidoDetalhes, name: 'pedido', props: extrairParametroId,
      }, // produtos.com/pedidos/2


      { path: ':id(\\d+)/editar', alias: ':id(\\d+)/alterar', 
         components: {
          default: PedidoEditar,
          'cliente-detalhes': PedidoDetalhes
        },
        props: {
          default: extrairParametroId,
          'pedido-detalhes': extrairParametroId
        },
      }, // produtos.com/pedidos/2/editar

      {
         path: '', 
         component: PedidosHome, 
         name: 'Pedidos',
    
      },
      { path: '*', component: Erro404Pedidos }
    ] 
  },
   
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
