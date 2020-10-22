<template>
    <div class="container mt-5">
    <ClientesLista :busca="busca" />
    </div>
</template>

<script>

import axios from 'axios'
import ClientesLista from './../../components/clientes/ClientesLista.vue'

export default {
    components: {
        ClientesLista
    },

    props: ['busca'], 
    
     created() {
     this.getClientes();
    },
    
    methods: {
        async getClientes() {

                 await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/clientes`);
        },
    }
}
</script>