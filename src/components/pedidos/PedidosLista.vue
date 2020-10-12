<template>
    <div>
        <h3 class="font-weight-light">Contatos</h3>

        <div class="form-group">
            <input 
                type="search"
                class="form-control"
                placeholder="Buscar contatos"
                @keyup.enter="buscar"
                :value = "busca">
        </div>

        <hr>

        <ul class="list-group list-group-striped" v-if="contatosFiltrados.length > 0">
            <PedidosListaIten 
                class="list-group-item"
                v-for="contato in contatosFiltrados"
                :key="contato.id"
                :contato="contato"/>
        </ul>

        <p v-else>Nenhum contato cadastrado.</p>

        <button class="btn btn-secondary mt-4 mb-4" @click="voltar">Voltar</button>
    </div>
</template>

<script>

import PedidosListaIten from '@/components/pedidos/PedidosListaIten.vue'

import EventBus from './../../event-bus'

export default {
    components: {
        PedidosListaIten
    },
    props: ['busca'],

    data() {
        return {
            contatos: []
        }
    },
    computed: {
        contatosFiltrados() {
            const busca = this.busca
            return !busca
                ? this.contatos
                : this.contatos.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))
        }
    },
    created() {
        this.contatos = EventBus.contatos
    },
    methods: {
        buscar(event) {
            this.$router.push({
                path: '/pedidos',
                query: { busca: event.target.value }
            })
        },
        voltar() {
            this.$router.back()
        }
    }
}
</script>
