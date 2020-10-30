<template>
    
     <tr>
      <td  >{{pedido.id}}</td>
      <td >{{pedido.created_at}}</td>
      <td style="text-align:left" >{{pedido.obeservacao}}</td>
      <td >
           <b-button 
             title="Deletar"
             size="sm"  
             variant="danger" 
             class=" mr-2"
             @click="$emit('delete', pedido)">
              <b-icon icon="trash" aria-label="Excluir"></b-icon>
         </b-button>
          
          <router-link 
           title="Editar"
            :to="{ 
                path: `/pedidos/${pedido.id}/editar`
            }"
            class="btn btn-info btn-sm">
               <b-icon icon="pencil-square" aria-label="Excluir"></b-icon>
        </router-link>
        <!-- <button 
            class="btn btn-danger btn-sm mr-2 float-right" 
            title="Deletar"
            @click="$emit('delete', pedido)">
                Excluir
        </button>
        pencil-square-->
         
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
}
</script>


