<template>
    <div class="container mt-5">
    <ProdutosLista  :busca="busca" />
    </div>
</template>

<script>

import axios from 'axios'
import ProdutosLista from './../../components/produtos/ProdutosLista.vue'

export default {
    components: {
        ProdutosLista
    },

    props: ['busca'], 
     
     created() {
     this.getProdutos();
     },
    
    methods: {
        async getProdutos() {
                await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/produtos`);       
        },
    }
}
</script>