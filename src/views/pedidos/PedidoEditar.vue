<template>
   <!--<div class="container">-->
  <div>
  
  <div class="mt-2 ">
       
       <!-- <div style="height:700px" class=" col-2 col-lg-2 float-left"></div>-->
        <div id="esquerda"  style="background-color:#F6F6F6; height:700px;" class=" col-sm-12 col-lg-4 float-left">

          <div class="mt-3 info ">Selecione um Cliente:{{selecaocliente}} </div>
            <b-form-select v-model="selecaocliente" :options="clientes" size="sm" ></b-form-select>
            
            <h4 class="mb-2">Código: {{pedidoslocal.cod_produto}}</h4>
            
            <h3 class="mb-2">Produto: {{pedidoslocal.nome}}</h3>


            <b-form-group class=" p-0 text-left col-lg-12" id="input-group-1" label="Código do Produto" label-for="input-4">
              <b-form-input id="input-4" type="text" placeholder="Buscar por produto"  @keyup.enter="buscar" :value = "busca" ></b-form-input>
            </b-form-group>  

            <div class="mt-3 info">Selecione uma cor:{{selecaocor}} </div>
            <b-form-select v-model="selecaocor" :options="pedidoslocal.coress" size="sm" class="mt-3"></b-form-select>

             <div class="mt-3 info">Selecione um tamanho:{{selecaotamanho}} </div>
            <b-form-select v-model="selecaotamanho" :options="pedidoslocal.tamanhoss" size="sm" class="mt-3"></b-form-select>

        

            <b-form-group class="p-0 text-left col-lg-4 float-left pr-2 pl-2" id="input-group-1" label="Quantidade" label-for="input-1">
              <b-form-input id="input-1" type="number"  v-model="pedidoslocal.quantidade" ></b-form-input>
            </b-form-group>
            
           
            <b-form-group class=" p-0 text-left col-lg-4 float-left pr-2 pl-2" id="input-group-1" label="Valor Unid." label-for="input-2">
              <b-form-input id="input-2" type="number" v-model="pedidoslocal.valor" disabled></b-form-input>
            </b-form-group>
          

            <b-form-group class=" p-0 text-left col-lg-4  float-left pr-2 pl-2" id="input-group-1" label="Valor Total" label-for="input-3">
              <b-form-input  id="input-3" type="number" v-model="total"  placeholder="0.00" disabled></b-form-input>
            </b-form-group> 
            
            <b-button class="mt-lg-2 col-lg-12" variant="success" @click="adicionarProduto">Adicionar</b-button> 
             
               <!--<b-form-textarea
                    class="mt-lg-4"
                    id="textarea-rows"
                    placeholder="Observação do Pedido"
                    rows="7">
                </b-form-textarea>-->
                <!--<h6 class="mb-2">OBJ PRODUTO PARA ADICIONAR: {{clientes}}</h6><br>-->
               
                
        </div>   

      
       <PedidosVenda :pedido="pedido"/>
     
        <div style="clear:both"></div><!-- uso de style - acho que tem que ser usada script -->
        <!--<div style="height:400px" class="bg-success col-lg-6 float-right display-inline">testo 2</div>-->      
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
        array2:[],
        produtos:[],
        clientes:[],
        pedido:[],
        /*pedidoslocal:{ id: null, cod_produto: '', nome: '', valor: 0.00, cores:'', tamanhos:'',
                       ped:{pedido: 0, produto: 0, id: 0, quantidade: 0, valor_vendido: 0.00},
                    },*/
        pedidoslocal:{ id: null, cod_produto: '', nome: '', valor: 0.00, cores:'', tamanhos:'', quantidade: 0},
        busca:undefined,
        selecao:"null",
        selecaotam:"null",
        selecaocor:"",
        selecaotamanho:"",
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
        total: function () {
            return this.pedidoslocal.quantidade*this.pedidoslocal.valor;
        },
        totalPedido: function () {
            return this.pedido.items.reduce((total , item) => {
            return total + item.quantidade*item.valor_vendido
            },0)
        },
         optionCor: function () {
            return this.pedidoslocal.cores.split(",")
         },
         optionTam: function () {
            return this.pedidoslocal.tamanhos.split(",")
         }
    },
   
    created(){

    this.getProdutos();
    this.getPedido();
    this.getClientes();

    },
    methods: {
       async getProdutos() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/produtos`);
                console.log('GET /produtos', response)
                this.produtos = response.data;

        },
         async getClientes() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/clientes`);
                console.log('GET /clientes', response)
                this.clientes = response.data;

        },
         async getPedido() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/${this.id}`);
                console.log('GET /pedidos', response)
                this.pedido = response.data;
                this.array2 = this.pedido.produtos;
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
            
            const response = await axios.put(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/${this.id}/add`,this.pedidoslocal);
            console.log('GET /pedidos', response)
            //const Objeto1 = Object.assign({},this.pedidoslocal)
            //this.pedido.items.push(Objeto1)
            const response2 = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/${this.id}`);
                console.log('GET /pedidos', response2)
                this.pedido = response2.data;
            
          this.pedidoslocal = { 
          id: null, 
          cod_produto: '', 
          nome: '', 
          valor: null,
          cores:'',
          tamanhos:'',
          quantidade: 1},

         this.selecaocor="",

         this.selecaotamanho="",

         this.busca = ""
        },

       buscar(event) {
         this.busca = event.target.value
  
          //const Objeto = EventBus.buscarContato(+this.busca)

          const Objeto = Object.assign({}, this.produtos.find(c => c.id === +this.busca || c.cod_produto === this.busca))
          //const Objeto = EventBus.buscarContato(+this.busca)

          this.pedidoslocal = Object.assign({},{ 
          id: null, 
          cod_produto: '', 
          nome: '', 
          valor: null,
          cores:'',
          tamanhos:'',
          quantidade: 1
          //ped:{pedido: 0, produto: 0, id: 0, quantidade: 1, valor_vendido: 0.00},
           },Objeto)
          
          /*this.pedidosLocal.splice(0, 1, Objeto)
          this.pedidoslocal=Objeto*/
       },
  },
}
</script>

