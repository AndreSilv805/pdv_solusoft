<template>
    <div class="container py-4"> 
     <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Cadastro de produtos</h1>
            </div>
            <div class="col-sm-2">
                <router-link 
                    :to="`/produtos`"
                    class="btn btn-info btn-sm float-right">
                    <span>Lista de Produtos</span>
                </router-link>
            </div>
        </div>

        <hr>

    <b-form @submit="criarProduto"><!--formulário criar produto-->
      <b-form-group
        id="input-group-1"
        label="Produto"
        label-for="input-produto"
      >
        <b-form-input
          id="input"
          v-model="produto.nome"
          type="text"
          required
          placeholder="Entre com nome do produto"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Código" label-for="input-codigo">
        <b-form-input
          id="input-codigo"
          v-model="produto.cod_produto"
          required
          placeholder="Digite o código "
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Valor" label-for="input-valor">
        <b-form-input
          id="input-valor"
          v-model="produto.valor"
          placeholder="Digite o valor "
          required
        ></b-form-input>
      </b-form-group>

      
  
        <label class="my-2" for="tags-pills">Informe as cores  do Produto</label>
        <b-form-tags
          input-id="tags-pills"
          v-model="produto.cores"
          tag-variant="primary"
          tag-pills
          separator=" "
          placeholder="Informe as cores"
        
        ></b-form-tags>
       

        <label class="my-2" for="tags-pills">Informe os tamanhos</label>
        <b-form-tags
          input-id="tags-pills"
          v-model="produto.tamanhos"
          tag-variant="primary"
          tag-pills
          separator=" "
          placeholder="Informe os Tamanhos"
        ></b-form-tags>
       


      <b-button class="mt-4" type="submit" variant="primary">Salvar</b-button>

       </b-form><!--fim criar produto-->
       
       

    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
         return {
        
            mensagem:'teste de envio',
             produto: {
                cod_produto:'',
                nome: '',
                valor:null, 
                cores: [],
                tamanhos: [], 
            },
            
    
         }
    },

     /*beforeRouteLeave(to, from, next) {
        next(vm => {
            vm.ProdutosLista.getProdutos();
        })
    },*/

    methods: {
    criarProduto() {
            
            axios.post(`produtos`,this.produto)
                .then((response) => {
                    console.log('Produto criado com sucesso', response);
                    this.mensagem = "Produto criado com sucesso";
                })

                this.$router.push('/produtos')
            },
            
    },

}
</script>

