<template>
    
     <tr style="text-align:center">
                    <td >{{seq+1}}</td>
                    <td >{{item.cod_produto}}</td>
                    <td style="text-align:center">{{item.nome}}</td>
                    <td >{{item.quantidade}}</td>
                    <td style="text-align:right">{{item.valor_vendido | moedaReal}}</td>
                    <td style="text-align:right">{{item.quantidade*item.valor_vendido | moedaReal}}</td>
                    <td style="text-align:center"> <!--<button 
                            class="btn btn-danger btn-sm mr-2 float-right" 
                            title="Deletar"
                            @click="$emit('delete', item)">
                                Excluir
                        </button>-->
                        <b-button 
                            title="Deletar"
                            size="sm"  
                            variant="danger" 
                            class="mb-2"
                            @click="$emit('delete', item)">
                             <b-icon icon="trash"  aria-label="Excluir"></b-icon>
                        </b-button>
                    </td>
     </tr>

</template>

<script>
export default {
    props: {
        item: {
            type: undefined,
            required: true
        },
        seq: {
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


