<template>
    <div>
       
        <div class="row">
            <div class="col-sm-10">
                <h3 class="font-weight-light">Lista de Produtos</h3>
            </div>
            <div class="col-sm-2">
                <router-link 
                    :to="`/produtos/criar`"
                    class="btn btn-info btn-sm float-right">
                    <span>Criar Produto</span>
                </router-link>
            </div>
        </div>

            <hr>
            <div class="form-row mt-4">
                <div class="col-3">
                <input type="search" class="form-control" placeholder="Código" v-model="parametros.cod_produto" @keyup.enter="getProdutos">
                </div>

                <div class="col-4">
                <input type="search" class="form-control" placeholder="Nome do Produto" v-model="parametros.nome" @keyup.enter="getProdutos">
                </div>

                <div class="col-4 pr-3">
                <input type="search"  class="form-control" placeholder="valor" v-model="parametros.valor" @keyup.enter="getProdutos">
                </div>

                <div class="col-1">
                    <button type="" @click='getProdutos' class="btn btn-info float-right">Pesquisar</button>
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
                    <th style="width:45%" scoped="col-6">Produto</th>
                    <th style=" width:20%" scoped="col-2">valor</th>
                    <th style="width:20%" scoped="col-2" class="text-align-center">açoes</th>
                    </tr>
                </thead>

                <tbody style="text-align:center" class="table table-striped table-sm table-bordered">
                   
                    <ProdutosListaItem
                                v-for="prod in produtos"
                                @delete="deletarTarefa"
                                :key="prod.id"
                                :produto="prod"/>
                   
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


import ProdutosListaItem from '@/components/produtos/ProdutosListaItem.vue'


import axios from 'axios'



export default {
    components: {
        ProdutosListaItem,
    },

    data() {
        return {
            mensagem:{
                texto:'',
                tipo:''
            },
            dismissCountDown:0, //temporizador em segundo alert*/
            produtos:[],
            meta: [],
            currentPage: 1,
            parametros:{
                cod_produto:this.$route.query.cod_produto,
                nome:this.$route.query.nome,
                valor:this.$route.query.valor,
            }   
        }
    },

    watch: {
        currentPage(){
            this.getProdutos();
        }
    },

    created() {
     this.getProdutos();
    },

    methods: {
        async getProdutos() {

                const response = await axios.get(`produtos-search?page=`+this.currentPage,{params:this.parametros});
                this.produtos = response.data.data;
                this.meta = response.data;

        },
        async deletarTarefa(produto) {
            const confirmar = window.confirm(`Deseja deletar o produto "${produto.nome}"?`)
            if (confirmar) {

                try {
                    await axios.delete(`produtos/${produto.id}`)
                    this.mensagem.texto = 'Produto excluido com sucesso';
                    this.mensagem.tipo = "success"
                    this.dismissCountDown = 10;
                } catch(error) {
                    console.log('Erro ao deletar Tarefa: ', error)
                } finally {
                    this.getProdutos();
                }

            }
        },
        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
        
    }
}
</script>
