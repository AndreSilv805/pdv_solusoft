<template>
    <div>
       
        <div class="row">
            <div class="col-sm-10">
                <h3 class="font-weight-light">Lista de Pedidos</h3>
            </div>
            <div class="col-sm-2">
                <button 
                    @click="criarPedido"
                    class="btn btn-info btn-sm float-right"> 
                    <span>Criar Pedido</span>
                </button>
            </div>
        </div>

        <hr>

     
            <div class="form-row mt-4">
                <div class="col-3">
                <input type="search" class="form-control" placeholder="Código" v-model="parametros.id" @keyup.enter="getPedidos">
                </div>

                <div class="col-4">
                <input type="search" class="form-control" placeholder="Oberservação" v-model ="parametros.obeservacao" @keyup.enter="getPedidos">
                </div>

                <div class="col-4 pr-3">
                <input type="date"  class="form-control" placeholder="Data" v-model="parametros.created_at" @keyup.enter="getPedidos">
                </div>

                <div class="col-1">
                    <button type="" @click='getPedidos' class="btn btn-info float-right">Pesquisar</button>
                </div>
            </div>
    

        <hr>

        <b-alert
            :show="dismissCountDown"
            dismissible
            :variant="mensagem.tipo"
            @dismiss-count-down="countDownChanged"
        >
            {{mensagem.texto}}
        </b-alert>

    
        <table class="table">
                <thead style="text-align:center" class="table table-striped table-sm table-bordered table-dark">
                    <tr>
                    <th style="width:15%" scoped="col-2" >Código</th>
                    <th style="width:20%" scoped="col-6" >Data Pedido</th>
                    <th style="width:45%" scoped="col-2">Observação</th>
                    <th style="width:20%" scoped="col-2" class="text-align-center">açoes</th>
                    </tr>
                </thead>

                <tbody  style="text-align:center" class="table table-striped table-sm table-bordered"> 
                    <PedidosListaItem
                                v-for="ped in pedidos"
                                @delete="deletarPedido" 
                                :key="ped.id"
                                :pedido="ped"/>   
                </tbody>        
        </table>
               
    <div class="mt-3">
      <b-pagination v-model="currentPage" :total-rows="meta.total" :per-page="meta.per_page" align="center">
           <template  #page="{ page, active }">
              <b v-if="active"><span class="bg-gradient-warning">{{ page }}</span></b>
              <i v-else><span class="text-info">{{ page }}</span></i>
           </template>
      </b-pagination> 
    </div>

      
    </div>
</template>

<script>


import PedidosListaItem from '@/components/pedidos/PedidosListaItem.vue'


import axios from 'axios'



export default {
    components: {
        PedidosListaItem,
    },

    data() {
        return {
            mensagem:{
                texto:'',
                tipo:''
            },
            pedidos: [],
            meta: [],
            rows: 7,
            currentPage: 1,
            perPage: 4,
            parametros:{
                id:this.$route.query.id,
                obeservacao:this.$route.query.obeservacao,
                created_at:this.$route.query.created_at
            },
            dismissCountDown: 0 //temporizador em segundo alert
        }
    },

    watch: {
        currentPage(){
            this.getPedidos();
        }
    },

    /*beforeRouteUpdate(to, from, next) {
            this.parametros.id = to.query.id
            next()
    },*/
    
    created() {
     this.getPedidos();
     
    },

    methods: {
        async getPedidos() {

                try {
                    const response = await axios.get(`pedidos-search?page=`+this.currentPage,{params:this.parametros});
                    this.pedidos = response.data.data;
                    this.meta = response.data;
                    
                    this.$router.push({
                    path: '/pedidos',
                    query: this.parametros 
                    })
                } catch(error) {
                    this.mensagem.tipo = "danger";
                    this.dismissCountDown = 10;
                    
                     if (error.response) {
                        this.mensagem.texto = `Erro ao listar Pedidos - Servidor retornou um erro: ${error.message} ${error.response.statusText}`;
                        this.mensagem.tipo = "danger"
                    } else if (error.request) {
                        this.mensagem.texto = `Erro ao tentar comunicar com o servidor: ${error.message}`;
                        this.mensagem.tipo = "danger"
                    } else {
                        this.mensagem.texto = `Erro ao fazer requisição ao servidor: ${error.message}`;
                        this.mensagem.tipo = "danger"
                    }
                }

        },

        async deletarPedido(pedido) {
            const confirmar = window.confirm(`Deseja deletar Pedido "${pedido.id}"?`)
            if (confirmar) {

                try {
                    await axios.delete(`pedidos/${pedido.id}`);
                    this.mensagem.texto = 'Produto excluido com sucesso';
                    this.mensagem.tipo = "success"
                    this.dismissCountDown = 10;

                } catch(error) {
                     this.mensagem.tipo = "danger";
                     this.dismissCountDown = 10;
                     if (error.response) {
                        this.mensagem.texto = `Não possivel excluir Pedido - Servidor retornou um erro: ${error.message} ${error.response.statusText}`;   
                    } else if (error.request) {
                        this.mensagem.texto = `Erro ao tentar comunicar com o servidor: ${error.message}`;
                    } else {
                        this.mensagem.texto = `Erro ao fazer requisição ao servidor: ${error.message}`;   
                    }

                } finally {
                    this.getPedidos();
                }

            }
        },

        async criarPedido() {
            const response = await axios.post(`pedidos`);
            this.$router.push({ path: `/pedidos/${response.data.id}/editar`})
        },

        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
    
    }
}
</script>
