<template>
    
     <tr>
      <td >{{pedido.cod_pedido}}</td>
      <td >{{pedido.created_at}}</td>
      <td >{{pedido.observacao}}</td>
      <td ><router-link 
            :to="{ 
                path: `/pedidos/${pedido.id}/editar`
            }"
            class="btn btn-info btn-sm float-right">
                Detalhes
        </router-link>
         <button 
            class="btn btn-danger btn-sm mr-2 float-right" 
            title="Deletar"
            @click="$emit('delete', pedido)">
                Excluir
        </button>
        
        </td>
    </tr>

</template>

<script>
export default {
    props: {
        pedido: {
            type: undefined,
            required: true
        }
    },
    methods: {
        verDetalhes() {
            // this.$router.push(`/contatos/${this.contato.id}`)
            // this.$router.push({ path: `/contatos/${this.contato.id}` })
            // this.$router.push({ path: '/contatos', params: { id: this.contato.id } })
            // this.$router.push({ name: 'contato', params: { id: this.contato.id } })
            // this.$router.replace({ name: 'contato', params: { id: this.contato.id } })
        }
    }
}
</script>


