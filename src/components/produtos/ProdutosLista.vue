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

                <thead class="table table-striped table-bordered table-dark">
                    <tr>
                    <th style="width:15%" scoped="col-2" >Código</th>
                    <th style="width:45%" scoped="col-6">Produto</th>
                    <th style="width:20%" scoped="col-2">valor</th>
                    <th style="width:20%" scoped="col-2" class="text-align-center">açoes</th>
                    </tr>
                </thead>

                <tbody class="table table-striped table-bordered">
                   
                    <ProdutosGet
                                v-for="prod in produtosFiltrados"
                                @delete="deletarTarefa"
                                :key="prod.id"
                                :produto="prod"/>
                   
                </tbody>
                
        </table>
     




        <button class="btn btn-secondary mt-4 mb-4" @click="voltar">Voltar</button>
    </div>
</template>

<script>


import ProdutosGet from '@/components/produtos/ProdutosGet.vue'

import EventBus from './../../event-bus'
import axios from 'axios'



export default {
    components: {
        ProdutosGet,
    },

    props: ['busca'],

    data() {
        return {
            contatos: [],
            produtos: [],
            
        }
    },

    computed: {
        produtosFiltrados() {
            const busca = this.busca
            return !busca
                ? this.produtos
                : this.produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
        }

    },
    created() {
     this.getProdutos();
     this.contatos = EventBus.contatos
  
    },

    methods: {
        async getProdutos() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/produtos`);
                console.log('GET /produtos', response)
                this.produtos = response.data;

        },
        async deletarTarefa(produto) {
            const confirmar = window.confirm(`Deseja deletar a tarefa "${produto.nome}"?`)
            if (confirmar) {

                try {
                    await axios.delete(`http://127.0.0.1/pdvsolusoft/blog/public/api/produtos/${produto.id}`)
                    const indice = this.produtos.findIndex(t => t.id === produto.id)
                    this.produtos.splice(indice, 1)
                } catch(error) {
                    console.log('Erro ao deletar Tarefa: ', error)
                } finally {
                    console.log('Sempre executado!')
                }

            }
        },
        buscar(event) {
            this.$router.push({
                path: '/produtos',
                query: { busca: event.target.value }
            })
        },
        voltar() {
            this.$router.back()
        },
    }
}
</script>
