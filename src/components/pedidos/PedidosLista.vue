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

     
            <div class="form-row">
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
                                v-for="pedido in pedidos"
                                @delete="deletarPedido"
                                @imprimir="imprimirPedido" 
                                @email="enviarEmail" 
                                :key="pedido.id"
                                :pedido="pedido"/>   
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
import EventBus from '@/event-bus'



export default {
    components: {
        PedidosListaItem,
    },

    data() {
        return {
             mensagem:{
                texto:EventBus.mensagem.texto,
                tipo:EventBus.mensagem.tipo,
            },
            dismissCountDown:EventBus.dismissCountDown,
            pedidos: [],
            meta: [],
            currentPage: 1,
            parametros:{
                id:this.$route.query.id,
                obeservacao:this.$route.query.obeservacao,
                created_at:this.$route.query.created_at
            },
        }
    },

    watch: {
        currentPage(){
            this.getPedidos();
        },
        dismissCountDown(){
            let eventBus = EventBus;
            if(this.dismissCountDown == 4){
               eventBus.zerar(0);
            }
        }
    },
    
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
                    this.dismissCountDown = 20;
                     if (error.response) {
                        this.mensagem.texto = `Erro ao listar Pedidos - Servidor retornou um erro: ${error.message} ${error.response.statusText}`;
                    } else if (error.request) {
                        this.mensagem.texto = `Erro ao tentar comunicar com o servidor: ${error.message}`;
                    } else {
                        this.mensagem.texto = `Erro ao fazer requisição ao servidor: ${error.message}`;
                    }
                }

        },

        async deletarPedido(pedido) {
            const confirmar = window.confirm(`Deseja deletar Pedido "${pedido.id}"?`)
            if (confirmar) {

                try {
                    await axios.delete(`pedidos/${pedido.id}`);
                    this.mensagem.texto = 'Pedido excluido com sucesso';
                    this.mensagem.tipo = "success"
                    this.dismissCountDown = 5;

                } catch(error) {
                     this.mensagem.tipo = "danger";
                     this.dismissCountDown = 20;
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
             try {
                const response = await axios.post(`pedidos`);
                this.$router.push({ path: `/pedidos/${response.data.id}/editar`})
            } catch(error) {
                this.mensagem.tipo = "danger";
                this.dismissCountDown = 20;
                    if (error.response) {
                    this.mensagem.texto = `Erro ao criar Pedido - Servidor retornou um erro: ${error.message} ${error.response.statusText}`;
                } else if (error.request) {
                    this.mensagem.texto = `Erro ao tentar comunicar com o servidor: ${error.message}`;
                } else {
                    this.mensagem.texto = `Erro ao fazer requisição ao servidor: ${error.message}`;
                }
            }
        },

        imprimirPedido(pedido) {
          window.open(`${axios.defaults.baseURL}/pedidos/pdf/${pedido.id}`, '_blank');
        },

        async enviarEmail(pedido) {
          try {
                    await axios.get(`pedidos/email/${pedido.id}`);
                    this.mensagem.texto = 'Email enviado com sucesso';
                    this.mensagem.tipo = "success"
                    this.dismissCountDown = 5;

                } catch(error) {
                     this.mensagem.tipo = "danger";
                     this.dismissCountDown = 20;
                     if (error.response) {
                        this.mensagem.texto = `Não foi possível enviar email - Servidor retornou um erro: ${error.message} ${error.response.statusText}`;   
                    } else if (error.request) {
                        this.mensagem.texto = `Erro ao tentar comunicar com o servidor: ${error.message}`;
                    } else {
                        this.mensagem.texto = `Erro ao fazer requisição ao servidor: ${error.message}`;   
                    }

                }
        },

        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
    
    }
}
</script>
