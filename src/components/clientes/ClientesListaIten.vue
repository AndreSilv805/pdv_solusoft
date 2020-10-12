<template>
     <tr>
      <td >{{cliente.cod_cliente}}</td>
      <td >{{cliente.nome}}</td>
      <td >{{cliente.cpf}}</td>
      <td >{{cliente.sexo}}</td>
      <td >{{cliente.email}}</td>
      <td ><router-link 
            :to="{ 
                path: `/clientes/${cliente.id}`
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
export default {
    props: {
        cliente: {
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


