<template>
    <div class="container mt-5">
    <PedidosLista :busca="busca" />
    </div>
</template>

<script>

import PedidosLista from './../../components/pedidos/PedidosLista.vue'

export default {
    components: {
        PedidosLista
    },
    props: ['busca'] //essa prop é recebida pelo router
}
</script>