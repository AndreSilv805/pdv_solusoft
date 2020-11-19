<template>
    <div >
          
          
          <div id="listgroup-ex" style="position:relative;  overflow-y:auto; height:425px">
            

                <table class="table">
                
                <thead style="text-align:center" class="table table-sm table-striped table-bordered table-dark">
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
                                v-for="(ped, index) in pedido.items"
                                @delete="deletarItem"
                                :key="ped.id"
                                :item="ped"
                                :seq="index"/> 
                </tbody>
                
                </table>
            
          </div>

          <div class="col-12"> <h4 class="float-right pr-5">Total:  {{totalPedido | moedaReal}}</h4></div>
          
          <div style="clear:both"></div>            
               
        </div>
</template>

<script>

import axios from 'axios'

import PedidosVendaItem from '@/components/pedidos/PedidosVendaItem.vue'



export default {

    components: {
        PedidosVendaItem,
    },

    props: ['pedido'],
    
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
        
    },

    methods: {
        
        async deletarItem(item) {
            const confirmar = window.confirm(`Deseja deletar o produto "${item.nome}"?`)
            if (confirmar) {

                try {
                    await axios.delete(`pedidos/remover/${item.id}`)
                    const indice = this.pedido.items.findIndex(i => i.id === item.id)
                    this.pedido.items.splice(indice, 1)
                } catch(error) {
                    console.log('Erro ao deletar Produto: ', error)
                } finally {
                    console.log('Sempre executado!')
                }

            }
        },
        
    }
}
</script>
