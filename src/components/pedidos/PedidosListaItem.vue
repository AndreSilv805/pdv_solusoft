<template>
    
     <tr>
      <td >{{pedido.cod_pedido}}</td>
      <td >{{data}}</td>
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

    computed:{
         data: function () {
            return this.pedido.created_at
        },
    },

}
</script>


