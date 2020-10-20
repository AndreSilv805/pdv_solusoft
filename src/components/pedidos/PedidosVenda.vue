<template>
    <div style="height:600px" class=" col-sm-12 col-lg-8 float-left">
          
          
          <div id="listgroup-ex" style="position:relative;  overflow-y:auto; height:600px">
            

                <table class="table">
                
                <thead class="table table-striped table-bordered table-dark">
                    <tr >
                    <th style="width:5%" scoped="col" >item</th>
                    <th style="width:5%" scoped="col">código</th>
                    <th style="width:45%" scoped="col">produto</th>
                    <th style="width:5%" scoped="col">quant.</th>
                    <th style="width:15%" scoped="col">valor</th>
                    <th style="width:15%" scoped="col">total</th>
                    <th style="width:10%" scoped="col">ações</th>
                    </tr>
                </thead>

                <tbody class="table table-striped table-sm table-bordered">
                   
                   <PedidosVendaItem
                                v-for="ped in pedido.items"
                                @delete="deletarItem"
                                :key="ped.id"
                                :item="ped"/>
                                
                   <!--<tr v-for=" item in pedido.items"
                    :key="item.id">

                    <td >1</td>
                    <td >{{item.cod_produto}}</td>
                    <td >{{item.nome}}</td>
                    <td >{{item.quantidade}}</td>
                    <td >{{item.valor_vendido | moedaReal}}</td>
                    <td >{{item.quantidade*item.valor_vendido | moedaReal}}</td>
                    <td> <button 
                            class="btn btn-danger btn-sm mr-2 float-right" 
                            title="Deletar">
                                Excluir
                        </button>
                    </td>
                    </tr>-->
                   
                </tbody>
                
        </table>
              




          </div>
          <div class="col-12"> <h4 class="float-right pr-5">Total:  {{totalPedido | moedaReal}}</h4></div>
          

          <div style="clear:both"></div>            
          
           <b-button class="mt-lg-2 ml-5 col-lg-4" variant="danger" @click="$router.back()">Aguradar</b-button> 
           <!--<b-button class="mt-lg-2 col-lg-6" variant="success" @click="adicionar">Finalizar</b-button>-->
           <router-link :to="`/pedidorota/1/fechar`" @click="adicionar" class="mt-lg-2 mr-5 col-lg-4 btn btn-success float-right">Finalizar</router-link>
            
       
               
        </div>
</template>

<script>




import EventBus from './../../event-bus'
import axios from 'axios'

import PedidosVendaItem from '@/components/pedidos/PedidosVendaItem.vue'



export default {

    components: {
        PedidosVendaItem,
    },

    props: ['pedido'],

    data() {
        return {
            pedidos: [],
            
        }
    },
    
     filters: {
        moedaReal (value) {
        return value.toLocaleString('pt-br',{style:'currency',currency:'BRL'})
        }
     },

    computed: {
        totalPedido: function () {
            return this.pedido.items.reduce((total , item) => {
            return total + item.quantidade*item.valor_vendido
            },0)
        },
        pedidosFiltrados() {
            const busca = this.busca
            return !busca
                ? this.pedidos
                : this.pedidos.filter(p => p.observacao.toLowerCase().includes(busca.toLowerCase()))
        }

    },
    created() {
     this.getPedidos();
     this.pedidos = EventBus.pedidos
  
    },

    methods: {
        async getPedidos() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos`);
                console.log('GET /produtos', response)
                this.pedidos = response.data;

        },
        async deletarItem(item2) {
            const confirmar = window.confirm(`Deseja deletar a tarefa "${item2.id}"?`)
            if (confirmar) {

                try {
                    await axios.delete(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/remover/${item2.id}`)
                    const indice = this.pedido.items.findIndex(i => i.id === item2.id)
                    this.pedido.items.splice(indice, 1)
                } catch(error) {
                    console.log('Erro ao deletar Tarefa: ', error)
                } finally {
                    console.log('Sempre executado!')
                }

            }
        },
        buscar(event) {
            this.$router.push({
                path: '/pedidos',
                query: { busca: event.target.value }
            })
        },
        voltar() {
            this.$router.back()
        },
    }
}
</script>
