<template>
    
     <tr>
      <td >{{produto.cod_produto}}</td>
      <td >{{produto.nome}}</td>
      <td >{{produto.valor | moedaReal }}</td>
      <td ><router-link 
            :to="{ 
                path: `/produtos/${produto.id}/editar`
            }"
            class="btn btn-info btn-sm float-right">
                Detalhes
        </router-link>
         <button 
            class="btn btn-danger btn-sm mr-2 float-right" 
            title="Deletar"
            @click="$emit('delete', produto)">
                Excluir
        </button>
        
        </td>
    </tr>

</template>

<script>
export default {
    props: {
        produto: {
            type: undefined,
            required: true
        }
    },
    filters: {
        moedaReal (value) {
        return value.toLocaleString('pt-br',{style:'currency',currency:'BRL'})
        }
     }    
   
}
</script>


