<template>
    <div class="container py-4"> 
     <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Editar de Clientes</h1>
            </div>
            <div class="col-sm-2">
                <router-link 
                    :to="`/clientes`"
                    class="btn btn-info btn-sm float-right">
                    <span>Clientes</span>
                </router-link>
            </div>
        </div>

        <hr>
    <b-form @submit="editarCliente"><!--formulário criar produto-->

      <b-form-group id="input-group-1" label="Cliente" label-for="input-cliente">
        <b-form-input
          id="input-cliente"
          v-model="cliente.nome"
          type="text"
          required
          placeholder="Entre com nome do cliente"
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-3" label="e-mail" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="cliente.email"
          placeholder="Digite o e-mail "
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Código" label-for="input-codigo">
        <b-form-input
          id="input-codigo"
          v-model="cliente.cod_cliente"
          required
          placeholder="Digite o código "
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="cpf" label-for="input-cpf">  
        <the-mask class="form-control" required id="input-cpf" placeholder="Digito o CPF" :mask="['###.###.###-##']" v-model="cliente.cpf" />
     </b-form-group>

      <b-form-group label="sexo">
      <b-form-radio-group
        v-model="cliente.sexo"
        :options="options"
        name="radio-inline"
      ></b-form-radio-group>
     </b-form-group>

     

      <b-button type="submit" variant="primary">Salvar</b-button>

       </b-form>

    </div>
</template>

<script>

import axios from 'axios'
import {TheMask} from 'vue-the-mask'

export default {
    components: {TheMask},
    props: {
        id: {
            type: Number,
            required: true,    
        }
    },
    data() {
         return {
            mensagemErro: undefined,
             cliente: {
                cod_cliente:'',
                nome: '',
                cpf: '',
                sexo:'',
                email:'',
            },
                options: [
                  { text: 'feminino', value: 'f' },
                  { text: 'masculino', value: 'm' },
                ]
    
         }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => { 
            vm.pegarCliente();
        })
    },
   
    
    methods:{
        async editarCliente(){

            const response = await axios.put(`clientes/${this.id}`,this.cliente);
            console.log('GET /cliente', response)
            this.cliente = response.data;
        },
        async pegarCliente(){

            const response = await axios.get(`clientes/${this.id}`);
            console.log('GET /cliente', response)
            this.cliente = response.data;
        },
    }

}
</script>
