<template>
    <div class="container mt-5">
    <ClientesLista :busca="busca" />
    </div>
</template>

<script>

import ClientesLista from './../../components/clientes/ClientesLista.vue'

export default {
    components: {
        ClientesLista
    },
    props: ['busca'] //essa prop é recebida pelo router
}
</script>