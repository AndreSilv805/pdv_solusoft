<template>
    <div class="container py-4" >
     <b-alert
            :show="dismissCountDown"
            dismissible
            :variant="mensagem.tipo"
            @dismiss-count-down="countDownChanged"
      >
            {{mensagem.texto}}
     </b-alert> 
     <div> 
     <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Detalhes e Edição do Produto</h1>
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

    <b-form class="mb-5" @submit.prevent="editarProduto">
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
          tag-variant="info"
          tag-pills
          separator=" "
          placeholder="Informe as cores"
          :disabled=false
        ></b-form-tags>
       

        <label class="my-2" for="tags-pills">Informe os tamanhos</label>
        <b-form-tags
          input-id="tags-pills"
          v-model="produto.tamanhos"
          tag-variant="info"
          tag-pills
          separator=" "
          placeholder="Informe os Tamanhos"
        ></b-form-tags>
      

      <b-button class="mt-4" type="submit" variant="primary">Salvar</b-button>

       </b-form>

    </div>
     
    </div>

</template>

<script>


import axios from 'axios'
import EventBus from '@/event-bus'

export default {
    props: {
        id: {
            type: Number,
            required: true,    
        }
    },
    data() {
        return {
            mensagem:{
                texto:'',
                tipo:'',
            },
            dismissCountDown:0,
            produto: {
                cod_produto:'',
                nome:'',
                valor:null, 
            }
        }
    },
    
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.pegarProduto();    
        })
    },
   
  computed:{
   valorbr: function () {
        return this.produto.valor.toLocaleString('pt-br',{style:'currency',currency:'BRL'})
        }
    },
    
  methods:{
        async editarProduto() { 
            try {
                await axios.put(`produtos/${this.id}`,this.produto);
                EventBus.$emit('mensagemAlerta', {texto:"Produto salvo com sucesso",tipo:"success"});
                this.$router.push('/produtos')

                } catch(error) {
                    this.mensagem.tipo = "danger";
                    this.dismissCountDown = 20;
                     if (error.response) {
                        this.mensagem.texto = `Erro ao cadastrar Produto - Servidor retornou um erro: ${error.message} ${error.response.statusText}`;
                    } else if (error.request) {
                        this.mensagem.texto = `Erro ao tentar comunicar com o servidor: ${error.message}`;
                    } else {
                        this.mensagem.texto = `Erro ao fazer requisição ao servidor: ${error.message}`;
                    }
                }
            },

        async pegarProduto(){
            const response = await axios.get(`produtos/${this.id}`);
            this.produto = response.data;
        },

         countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
    },
    }
    
}

</script>