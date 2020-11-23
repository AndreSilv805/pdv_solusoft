<template>
    <div>
          <div class="row">
            <div class="col-sm-10">
                <h3 class="font-weight-light">Lista de Clientes</h3>
            </div>
            <div class="col-sm-2">
                <router-link 
                    :to="`/clientes/criar`"
                    class="btn btn-info btn-sm float-right">
                    <span>Cadastro Cliente</span>
                </router-link>
            </div>
        </div>

          <hr>
            <div class="form-row mt-2">
                <div class="col-3">
                <input type="search" class="form-control" placeholder="Código" v-model="parametros.cod_cliente" @keyup.enter="getClientes">
                </div>

                <div class="col-4">
                <input type="search" class="form-control" placeholder="nome" v-model="parametros.nome" @keyup.enter="getClientes">
                </div>

                <div class="col-4 pr-3">
                <the-mask type="search"  class="form-control"  placeholder="cpf" :mask="['###.###.###-##']" v-model="parametros.cpf" @keyup.enter="getClientes"/>
                </div>

                <div class="col-1">
                    <button type="" @click='getClientes' class="btn btn-info float-right">Pesquisar</button>
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
                    <tr >
                    <th scoped="col-2" >Código</th>
                    <th scoped="col-6">Nome</th>
                    <th scoped="col-2">cpf</th>
                    <th scoped="col-2">e-mail</th>
                    <th scoped="col-2">açoes</th>
                    </tr>
                </thead>

                <tbody  style="text-align:center" class="table table-striped table-sm table-bordered">
                   
                    <ClientesListaItem
                                v-for="cli in clientes"
                                @delete="deletarCliente"
                                :key="cli.id"
                                :cliente="cli"/>
                   
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

import ClientesListaItem from '@/components/clientes/ClientesListaItem.vue'


import axios from 'axios'
import EventBus from '@/event-bus'
import {TheMask} from 'vue-the-mask'

export default {
    components: {
        ClientesListaItem,
        TheMask
    },

    data() {
        return {
            mensagem:{
                texto:EventBus.mensagem.texto,
                tipo:EventBus.mensagem.tipo,
            },
            dismissCountDown:EventBus.dismissCountDown,
            clientes: [],
            meta: [],
            currentPage: 1,
            parametros:{
                cod_cliente:this.$route.query.cod_cliente,
                nome:this.$route.query.nome,
                cpf:this.$route.query.cpf
            } 
        }
    },

     watch: {
        currentPage(){
            this.getClientes();
        },
        dismissCountDown(){
            let eventBus = EventBus;
            if(this.dismissCountDown == 4){
               eventBus.zerar(0);
            }
        }
    },

    created() {
     this.getClientes();
    },

    methods: {
        async getClientes() {
             try {
                const response = await axios.get(`clientes-search?page=`+this.currentPage,{params:this.parametros});
                this.clientes = response.data.data;
                this.meta = response.data;

                 this.$router.push({
                    path: '/clientes',
                    query: this.parametros 
                    })
                } catch(error) {
                    this.mensagem.tipo = "danger";
                    this.dismissCountDown = 20;
                     if (error.response) {
                        this.mensagem.texto = `Erro ao listar Cleintes - Servidor retornou um erro: ${error.message} ${error.response.statusText}`;
                    } else if (error.request) {
                        this.mensagem.texto = `Erro ao tentar comunicar com o servidor: ${error.message}`;
                    } else {
                        this.mensagem.texto = `Erro ao fazer requisição ao servidor: ${error.message}`;
                    }
                }

        },

        async deletarCliente(cliente) {
            const confirmar = window.confirm(`Deseja deletar cliente: "${cliente.nome}"?`)
            if (confirmar) {
                try {
                    await axios.delete(`clientes/${cliente.id}`);
                    this.mensagem.texto = 'Cliente excluido com sucesso';
                    this.mensagem.tipo = "success";
                    this.dismissCountDown = 5;
      
                } catch(error) {
                    this.mensagem.tipo = "danger";
                     this.dismissCountDown = 20;
                     if (error.response) {
                        this.mensagem.texto = `Não possivel excluir Cliente - Servidor retornou um erro: ${error.message} ${error.response.statusText}`;   
                    } else if (error.request) {
                        this.mensagem.texto = `Erro ao tentar comunicar com o servidor: ${error.message}`;
                    } else {
                        this.mensagem.texto = `Erro ao fazer requisição ao servidor: ${error.message}`;   
                    }
                } finally{
                    this.getClientes();  
                }
            }
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
    }
}
</script>
