<template>
   <!--<div class="container">-->
  <div>
  
  <div class="mt-2 ">
       
       <!-- <div style="height:700px" class=" col-2 col-lg-2 float-left"></div>-->
        <div id="esquerda"  style="background-color:#F6F6F6 " class=" col-sm-12 col-lg-4 float-left">
          
          <div style="background-color:#343a40; padding:10px; color:#FFFFFF">
              <span class="mr-2"><strong>Código Pedido: </strong>{{pedido.id}}</span>
              <span class="mr-5"><strong>Data Pedido: </strong>{{pedido.created_at}}</span>
          </div>    

           <div class="mt-3 info ">Selecione uma cliente: </div>
            <select v-model="pedido.cliente_id" class="custom-select mr-sm-2" >
                <option  v-for="cli in clientes" :key="cli.id" :value="cli.id">{{cli.nome}}</option>
            </select>

            <div class="mt-3 info ">Selecione a forma de pagamento: </div>
            <select v-model="pedido.forma_pagamento" class="custom-select mr-sm-2 mb-4" >
                <option  v-for="(pgt, index) in formapagamento" :key="index" :value="pgt">{{pgt}}</option>
            </select>
            
          
            <h5 class="mb-2">Produto: {{nomeProduto}}</h5>


            <b-form-group class=" p-0 text-left col-lg-12" id="input-group-1" label="Código do Produto" label-for="input-4">
              <b-form-input id="input-4" type="text" placeholder="Buscar por produto"  @keyup.enter="buscar" :value = "busca" ></b-form-input>
            </b-form-group>  

            <div class="mt-3 info">Selecione uma cor:{{pedidoslocal.selecaocores}} </div>
            <select v-model="pedidoslocal.selecaocores" class="custom-select mr-sm-2" >
                <option value="" selected>Selecione uma cor </option>
                <option  v-for="(cor,index) in opcaoCor" :key="index" :v-model="cor">{{cor}}</option>
            </select>

            <div class="mt-3 info">Selecione um tamanho:{{pedidoslocal.selecaotamanhos}} </div>
            <select v-model="pedidoslocal.selecaotamanhos" class="custom-select mr-sm-2 mb-3" >
                <option value="" selected>Selecione um tamanho</option>
                <option  v-for="(tamanho, index) in opcaoTamanho" :key="index" :v-model="tamanho">{{tamanho}}</option>
            </select>

        

            <b-form-group class="p-0 text-left col-lg-4 float-left pr-2 pl-2" id="input-group-1" label="Quantidade" label-for="input-1">
              <b-form-input style="text-align:center" id="input-1" type="number"  v-model="pedidoslocal.quantidade" ></b-form-input>
            </b-form-group>
            
           
            <b-form-group class=" p-0 text-left col-lg-4 float-left pr-2 pl-2" id="input-group-1" label="Valor Unid." label-for="input-2">
              <b-form-input style="text-align:right" id="input-2" type="number" v-model="pedidoslocal.valor" disabled>teste</b-form-input>
            </b-form-group>
          

            <b-form-group class=" p-0 text-left col-lg-4  float-left pr-2 pl-2 mb-6" id="input-group-1" label="Valor Total" label-for="input-3">
              <b-form-input style="text-align:right"  id="input-3" type="number" v-model="total"  placeholder="0.00" disabled></b-form-input>
            </b-form-group> 

             <b-button class="mt-lg-2 mb-2 col-lg-12 float-left" variant="success" @click="adicionarProduto">Adicionar</b-button> 

            
           
                         
        </div> 
        
       <div style="height:600px" class=" col-sm-12 col-lg-8 float-left">
          <PedidosVenda :pedido="pedido"/>

          
          <b-button class="mt-lg-2 ml-lg-2 col-lg-3  float-right" variant="success" @click="fecharPedido">Finalizar</b-button> 
          <b-button class="mt-lg-2 mb-4 mt-2 ml-lg-2 col-lg-3 float-right" variant="danger" @click="$router.back()">Aguardar</b-button> 
          
        
         <b-form-textarea
                    class="mt-lg-4"
                    v-model="pedido.obeservacao"
                    id="textarea-rows"
                    placeholder="Observação do Pedido"
                    rows="3">
          </b-form-textarea>
      </div>

        <div style="clear:both"></div>
         
    </div>  

    

  </div>
</template>

<script>

import axios from 'axios'
import PedidosVenda from '@/components/pedidos/PedidosVenda.vue'

export default {
    components: {
       PedidosVenda
    },
    props: ['id'],
    data() {
        return {
        produtos:[],
        clientes:[],
        formapagamento:['Dinheiro','Cartão','Cheque'],
        pedido:[],

        pedidoslocal:{ id: null, cod_produto: '', nome: '', valor: 0.00, cores:'', tamanhos:'', quantidade: 0, selecaocores:"", selecaotamanhos:"" },


        busca:undefined,

        selecaocliente:"",
         
          }
    },
    filters: {
        moedaReal (value) {
        return value.toLocaleString('pt-br',{style:'currency',currency:'BRL'})
        }
    },
    computed:{
         atualizaProdutos: function () {
            return this.produtos;
        },

        nomeProduto: function () {

            return this.pedidoslocal.nome +' '+this.pedidoslocal.selecaocores+' '+this.pedidoslocal.selecaotamanhos;
         },

         opcaoCor: function () {
            return this.pedidoslocal.cores.split(",")
         },

         opcaoTamanho: function () {
            return this.pedidoslocal.tamanhos.split(",")
         },

         
          total: function () {
            return this.pedidoslocal.quantidade*this.pedidoslocal.valor;
         },
      
    },
   
    created(){

    this.getProdutos();
    this.getPedido();
    this.getClientes();

    },
    methods: {
        async getProdutos() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/produtos`);
                this.produtos = response.data;

        },
         async getClientes() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/clientes`);
                this.clientes = response.data;

        },
         async getPedido() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/${this.id}`);
                this.pedido = response.data;

        },
        async buscarProduto(event){

            this.busca = event.target.value

            const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/produtos/${this.busca}`);

            this.pedidoslocal = Object.assign({},{ 
                id: null, 
                cod_produto: '', 
                nome: '', 
                valor: null,
                cores:'',
                tamanhos:'',
                quantidade: 1
                },response.data)            
        },
        async adicionarProduto(){
          
          this.editarPedido();
            
           await axios.put(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/${this.id}/add`,this.pedidoslocal);
            
            const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/${this.id}`);
            this.pedido = response.data;
            
          this.pedidoslocal = { 
          id: null, 
          cod_produto: '', 
          nome: '', 
          valor: null,
          cores:'',
          tamanhos:'',
          quantidade: 1,
          selecaocores:"",
          selecaotamanhos:""},

         this.busca = ""
        },

        async fecharPedido(){

          this.editarPedido();
          await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/email/${this.id}`);
          this.$router.push('/pedidos');
         
        
        },

        async editarPedido(){
            
           await axios.put(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/${this.id}`,this.pedido);
            
        },


       
       buscar(event) {
         this.busca = event.target.value
  
          const Objeto = Object.assign({}, this.produtos.find(c => c.id === +this.busca || c.cod_produto === this.busca))

          this.pedidoslocal = Object.assign({},{ 
          id: null, 
          cod_produto: '', 
          nome: '', 
          valor: null,
          cores:'',
          tamanhos:'',
          quantidade: 1,
          selecaocores:"",
          selecaotamanhos:""
           },Objeto)
          
       },
  },
}
</script>

