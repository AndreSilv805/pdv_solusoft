<template>
     <tr>
      <td >{{cliente.cod_cliente}}</td>
      <td >{{cliente.nome}}</td>
      <td>{{cliente.cpf}}</td>
      <!--<td><the-mask  :mask="['###.###.###-##']" v-model="cliente.cpf" desable/></td>-->
      <td >{{cliente.sexo}}</td>
      <td >{{cliente.email}}</td>
      <td ><router-link 
            :to="{ 
                path: `/clientes/${cliente.id}/editar`
            }"
            class="btn btn-info btn-sm float-right">
                Detalhes
        </router-link>
         <button 
            class="btn btn-danger btn-sm mr-2 float-right" 
            title="Deletar"
            @click="$emit('delete', cliente)">
                Excluir
        </button>
        
        
     </td>
    </tr>

</template>

<script>

//import {TheMask} from 'vue-the-mask'

export default {
    //components: {TheMask},
    props: {
        cliente: {
            type: undefined,
            required: true
        }
    },
    
}
</script>


