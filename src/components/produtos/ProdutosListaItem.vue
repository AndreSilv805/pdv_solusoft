<template>
    
     <tr>
      <td >{{produto.cod_produto}}</td>
      <td style="text-align:left">{{produto.nome}}</td>
      <td style="text-align:right" >{{produto.valor | moedaReal }}</td>
      <td >

        <b-button 
             title="Deletar"
             size="sm"  
             variant="danger" 
             class=" mr-2"
             @click="$emit('delete', produto)">
              <b-icon icon="trash" aria-label="Excluir"></b-icon>
         </b-button>
          
          <router-link 
           title="Editar"
            :to="{ 
                path: `/produtos/${produto.id}/editar`
            }"
            class="btn btn-info btn-sm">
               <b-icon icon="pencil-square" aria-label="Excluir"></b-icon>
        </router-link>
        
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


