<template>
    <div>
       
        <div class="row">
            <div class="col-sm-10">
                <h3 class="font-weight-light">Lista de Pedidos</h3>
            </div>
            <div class="col-sm-2">
                <router-link 
                    :to="`/produtos/criar`"
                    class="btn btn-info btn-sm float-right">
                    <span>Criar Pedido</span>
                </router-link>
            </div>
        </div>

        <div class="form-group mt-2">
            <input 
                type="search"
                class="form-control"
                placeholder="Buscar contatos"
                @keyup.enter="buscar"
                :value = "busca">
        </div>

        <hr>

       

        <table class="table">

                <thead class="table table-striped table-sm table-bordered table-dark">
                    <tr>
                    <th style="width:15%" scoped="col-2" >Código</th>
                    <th style="width:45%" scoped="col-6">Data Pedido</th>
                    <th style="width:20%" scoped="col-2">Observação</th>
                    <th style="width:20%" scoped="col-2" class="text-align-center">açoes</th>
                    </tr>
                </thead>

                <tbody class="table table-striped table-bordered">
                   
                    <PedidosListaItem
                                v-for="ped in pedidosFiltrados"
                                @delete="deletarPedido"
                                :key="ped.id"
                                :pedido="ped"/>
                   
                </tbody>
                
        </table>
     




        <button class="btn btn-secondary mt-4 mb-4" @click="voltar">Voltar</button>
    </div>
</template>

<script>


import PedidosListaItem from '@/components/pedidos/PedidosListaItem.vue'

import EventBus from './../../event-bus'
import axios from 'axios'



export default {
    components: {
        PedidosListaItem,
    },

    props: ['busca'],

    data() {
        return {
            contatos: [],
            pedidos: [],
            
        }
    },

    computed: {
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
        async deletarPedido(pedido) {
            const confirmar = window.confirm(`Deseja deletar a tarefa "${pedido.id}"?`)
            if (confirmar) {

                try {
                    await axios.delete(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/${pedido.id}`)
                    const indice = this.pedidos.findIndex(p => p.id === pedido.id)
                    this.pedidos.splice(indice, 1)
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
