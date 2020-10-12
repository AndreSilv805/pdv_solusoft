<template>
    
     <tr>
      <td >{{produto.cod_produto}}</td>
      <td >{{produto.nome}}</td>
      <td >{{produto.valor}}</td>
      <td ><router-link 
            :to="{ 
                path: `/produtos/${produto.id}`
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


