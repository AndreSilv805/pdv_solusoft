<template>
    
     <tr>
                    <td >1</td>
                    <td >{{item.cod_produto}}</td>
                    <td >{{item.nome}}</td>
                    <td >{{item.quantidade}}</td>
                    <td >{{item.valor_vendido | moedaReal}}</td>
                    <td >{{item.quantidade*item.valor_vendido | moedaReal}}</td>
                    <td> <button 
                            class="btn btn-danger btn-sm mr-2 float-right" 
                            title="Deletar"
                            @click="$emit('delete', item)">
                                Excluir
                        </button>
                    </td>
     </tr>

</template>

<script>
export default {
    props: {
        item: {
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


