<template>
    <div class="container mt-5">
    <!--<ProdutosLista :busca="busca" />-->
    <ProdutosLista :produtos="produtos" :busca="busca" />
    </div>
</template>

<script>

import axios from 'axios'
import ProdutosLista from './../../components/produtos/ProdutosLista.vue'

export default {
    components: {
        ProdutosLista
    },
     data() {
        return {
            produtos: [],   
        }
    },
    props: ['busca'], //essa prop é recebida pelo router
     
     beforeRouteEnter(to, from, next) {
        next(vm => {
            const prod = vm.getProdutos();
            vm.produtos = prod;
        })
    },
    
     created() {
     this.getProdutos();
  
    },
    
    methods: {
        async getProdutos() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/produtos`);
                this.produtos = response.data;

        },
    }
}
</script>