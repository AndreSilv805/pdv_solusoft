<template>
     <tr>
      <td >{{cliente.cod_cliente}}</td>
      <td style="text-align:left" >{{cliente.nome}}</td>
      <td ><the-mask style="text-align:center"  :mask="['###.###.###-##']" v-model="cliente.cpf" disabled/></td>
      <td >{{cliente.email}}</td>
      <td >
        <b-button 
             title="Deletar"
             size="sm"  
             variant="danger" 
             class=" mr-2"
             @click="$emit('delete', cliente)">
              <b-icon icon="trash" aria-label="Excluir"></b-icon>
         </b-button>
          
          <router-link 
           title="Editar"
            :to="{ 
                path: `/clientes/${cliente.id}/editar`
            }"
            class="btn btn-info btn-sm">
               <b-icon icon="pencil-square" aria-label="Editar"></b-icon>
        </router-link>
     </td>
    </tr>

</template>

<script>

import {TheMask} from 'vue-the-mask'

export default {
    components: {TheMask},
    props: {
        cliente: {
            type: undefined,
            required: true
        }
    },
    
}
</script>


