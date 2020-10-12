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
                    <span>Criar</span>
                </router-link>
            </div>
        </div>

        <div class="form-group mt-2">
            <input 
                type="search"
                class="form-control"
                placeholder="Buscar Clientes"
                @keyup.enter="buscar"
                :value = "busca">
        </div>

        <hr>

        
        <table class="table">
                
                <thead class="table table-striped table-bordered table-dark">
                    <tr >
                    <th scoped="col-2" >Código</th>
                    <th scoped="col-6">Nome</th>
                    <th scoped="col-2">cpf</th>
                    <th scoped="col-2">sexo</th>
                    <th scoped="col-2">e-mail</th>
                    <th scoped="col-2">açoes</th>
                    </tr>
                </thead>

                <tbody class="table table-striped table-bordered">
                   
                    <ClientesListaIten
                                v-for="cli in clientesFiltrados"
                                @delete="deletarCliente"
                                :key="cli.id"
                                :cliente="cli"/>
                   
                </tbody>
                
        </table>


        <button class="btn btn-secondary mt-4 mb-4" @click="voltar">Voltar</button>
    </div>

</template>

<script>

import ClientesListaIten from '@/components/clientes/ClientesListaIten.vue'

import EventBus from './../../event-bus'
import axios from 'axios'

export default {
    components: {
        ClientesListaIten
    },
    props: ['busca'],

    data() {
        return {
            contatos: [],
            clientes: []
        }
    },
    computed: {
        clientesFiltrados() {
            const busca = this.busca
            return !busca
                ? this.clientes
                : this.clientes.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))
        }

    },
    created() {
     this.getClientes();
     this.contatos = EventBus.contatos
  
    },
    methods: {
        async getClientes() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/clientes`);
                console.log('GET /produtos', response)
                this.clientes = response.data;

        },
        async deletarCliente(client) {
            const confirmar = window.confirm(`Deseja deletar a tarefa "${client.nome}"cliente?`)
            if (confirmar) {
                try {
                    const response = await axios.delete(`http://127.0.0.1/pdvsolusoft/blog/public/api/clientes/${client.id}`)
                    const indice = this.clientes.findIndex(c => c.id === client.id)
                    console.log('GET /produtos', response)
                    this.clientes.splice(indice, 1)
                } catch(error) {
                    console.log('Erro ao deletar Tarefa: ', error)
                } finally {
                    console.log('Sempre executado!')
                }

            }
        },
        buscar(event) {
            this.$router.push({
                path: '/clientes',
                query: { busca: event.target.value }
            })
        },
        voltar() {
            this.$router.back()
        }
    }
}
</script>
