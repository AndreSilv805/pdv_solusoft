<template>
    <div class="container mt-5">
    <ClientesLista :clientess="clientes" :busca="busca" />
    </div>
</template>

<script>

import axios from 'axios'
import ClientesLista from './../../components/clientes/ClientesLista.vue'

export default {
    components: {
        ClientesLista
    },
         data() {
        return {
            clientes: [],   
        }
    },
    props: ['busca'], //essa prop é recebida pelo router
     
     beforeRouteEnter(to, from, next) {
        next(vm => {
            const clientes = vm.getClientes();
            vm.clientes = clientes;
        })
    },
    
     created() {
     this.getClientes();
  
    },
    
    methods: {
        async getClientes() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/clientes`);
                this.produtos = response.data;

        },
    }
}
</script>