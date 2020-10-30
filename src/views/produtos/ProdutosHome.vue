<template>
    <div class="container mt-5">
    <ProdutosLista  :busca="busca" />
    </div>
</template>

<script>


import ProdutosLista from './../../components/produtos/ProdutosLista.vue'

export default {
    components: {
        ProdutosLista
    },

    props: ['busca'], 
     
}
</script>