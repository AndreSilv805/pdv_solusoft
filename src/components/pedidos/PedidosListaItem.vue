<template>
    
     <tr >
      <td  >{{pedido.id}}</td>
      <td >{{pedido.created_at | dataBr}}</td>
      <td style="text-align:left" >{{pedido.obeservacao}}</td>
      <td class="p-0" >
        <b-button 
             title="Enviar Email"
             size="sm"  
             variant="info" 
             class="m-1"
             @click="$emit('email', pedido)">
              <b-icon icon="envelope" aria-label="Email"></b-icon>
        </b-button>

        <b-button 
             title="Imprimir"
             size="sm"  
             variant="info" 
             class=" m-1"
             @click="$emit('imprimir', pedido)">
              <b-icon icon="printer" aria-label="Imprimir"></b-icon>
        </b-button>

        <router-link 
           title="Editar"
            :to="{ 
                path: `/pedidos/${pedido.id}/editar`
            }"
            class="btn btn-info btn-sm m-1 ">
               <b-icon icon="pencil-square" aria-label="Editar"></b-icon>
        </router-link>

        <b-button 
             title="Deletar"
             size="sm"
             variant="danger" 
             class="m-1"
             @click="$emit('delete', pedido)">
              <b-icon icon="trash" aria-label="Deletar"></b-icon>
         </b-button>

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
    filters: {
        dataBr (value) {
        let data = new Date(value);
        let dataFormatada = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
        return dataFormatada
        }
     },
}
</script>


