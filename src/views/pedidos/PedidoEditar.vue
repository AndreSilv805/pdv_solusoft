<template>
   <!--<div class="container">-->
  <div>

  
  <div class="mt-2">
       
       <!-- <div style="height:700px" class=" col-2 col-lg-2 float-left"></div>-->
        <div id="esquerda"  style="background-color:#F6F6F6; height:700px;" class=" col-sm-12 col-lg-4 float-left">
            
            <h4 class="mb-2">Código: {{pedidoslocal.cod_produto}}</h4>
            
            <h3 class="mb-2">Produto: {{pedidoslocal.nome}}</h3>


            <b-form-group class=" p-0 text-left col-lg-12" id="input-group-1" label="Código do Produto" label-for="input-4">
              <b-form-input id="input-4" type="text" placeholder="Buscar por produto"  @keyup.enter="buscar" :value = "busca" ></b-form-input>
            </b-form-group>  

            <!--<div>
                <div class="mt-3" >Selecione uma cor <strong>{{ selected }}</strong></div>
                <b-form-select  v-model="selected" size="sm" :options="options"></b-form-select>
            </div>

            <div class="mb-4">
                <div class="mt-3 info">Selecione um tamanho: <strong>{{ selected }}</strong></div>
                <b-form-select v-model="selected" size="sm" :options="options"></b-form-select>
            </div>-->
            <div class="mt-3 info">Selecione uma cor:{{selecaocor}} </div>
            <b-form-select v-model="selecaocor" :options="pedidoslocal.coress" size="sm" class="mt-3"></b-form-select>

             <div class="mt-3 info">Selecione um tamanho:{{selecaotamanho}} </div>
            <b-form-select v-model="selecaotamanho" :options="pedidoslocal.tamanhoss" size="sm" class="mt-3"></b-form-select>

           <!-- <div class="mt-3 info">Selecione uma cor:{{selecao}} </div>
            <select v-model="selecao" class="custom-select mr-sm-2" >
                <option value="null" selected>Escolha uma cor</option>
                <option  v-for="cor in optionCor" :key="cor" :v-model="cor">{{cor}}</option>
            </select>

             <div class="mt-3 info">Selecione um tamanho: </div>
            <select v-model="selecaotam" class="custom-select mr-sm-2" >
                <option value="null" selected>Escolha um tamanho</option>
                <option  v-for="tamanho in optionTam" :key="tamanho" :v-model="tamanho">{{tamanho}}</option>
            </select>-->
            

            <b-form-group class="p-0 text-left col-lg-4 float-left pr-2 pl-2" id="input-group-1" label="Quantidade" label-for="input-1">
              <b-form-input id="input-1" type="number"  v-model="pedidoslocal.ped.quantidade" ></b-form-input>
            </b-form-group>
            
           
            <b-form-group class=" p-0 text-left col-lg-4 float-left pr-2 pl-2" id="input-group-1" label="Valor Unid." label-for="input-2">
              <b-form-input id="input-2" type="number" v-model="pedidoslocal.valor" disabled></b-form-input>
            </b-form-group>
          

            <b-form-group class=" p-0 text-left col-lg-4  float-left pr-2 pl-2" id="input-group-1" label="Valor Total" label-for="input-3">
              <b-form-input  id="input-3" type="number" v-model="total"  placeholder="0.00" disabled></b-form-input>
            </b-form-group> 
            
            <b-button class="mt-lg-2 col-lg-12" variant="success" @click="adicionar">Adicionar</b-button> 
             
               <!--<b-form-textarea
                    class="mt-lg-4"
                    id="textarea-rows"
                    placeholder="Tall textarea"
                    rows="10">
                </b-form-textarea>-->
                <!-- <h6 class="mb-2">OBJ PRODUTO PARA ADICIONAR: {{pedidoslocal}}</h6><br>
                <h6 class="mb-2">OBJ PRODUTOS SELECIONADOS:  {{pedido[0].produtos}}</h6>-->
               
                
        </div>   

      

        <div style="height:600px" class=" col-sm-12 col-lg-8 float-left">
          
          
          <div id="listgroup-ex" style="position:relative;  overflow-y:auto; height:600px">
            

                <table class="table">
                
                <thead class="table table-striped table-bordered table-dark">
                    <tr >
                    <th style="width:5%" scoped="col" >item</th>
                    <th style="width:5%" scoped="col">código</th>
                    <th style="width:45%" scoped="col">produto</th>
                    <th style="width:5%" scoped="col">quant.</th>
                    <th style="width:15%" scoped="col">valor</th>
                    <th style="width:15%" scoped="col">total</th>
                    <th style="width:10%" scoped="col">ações</th>
                    </tr>
                </thead>

                <tbody class="table table-striped table-bordered">
                   
                   <tr v-for=" item in pedido[0].produtos"
                    :key="item.ped.id">

                    <td >1</td>
                    <td >{{item.cod_produto}}</td>
                    <td >{{item.nome}}</td>
                    <td >{{item.ped.quantidade}}</td>
                    <td >{{item.valor | moedaReal}}</td>
                    <td >{{item.ped.quantidade*item.valor | moedaReal}}</td>
                    <td> <button 
                            class="btn btn-danger btn-sm mr-2 float-right" 
                            title="Deletar">
                                Ex
                        </button>
                    </td>
                    </tr>
                   
                </tbody>
                
        </table>
              




          </div>
          <div class="col-12"> <h4 class="float-right pr-5">Total:  {{totalPedido | moedaReal}}</h4></div>
          

          <div style="clear:both"></div>            
          
           <b-button class="mt-lg-2 ml-5 col-lg-4" variant="danger" @click="$router.back()">Aguradar</b-button> 
           <!--<b-button class="mt-lg-2 col-lg-6" variant="success" @click="adicionar">Finalizar</b-button>-->
           <router-link :to="`/pedidorota/1/fechar`" @click="adicionar" class="mt-lg-2 mr-5 col-lg-4 btn btn-success float-right">Finalizar</router-link>
            
       
               
        </div>
      
     
        <div style="clear:both"></div><!-- uso de style - acho que tem que ser usada script -->
        <!--<div style="height:400px" class="bg-success col-lg-6 float-right display-inline">testo 2</div>-->      
    </div>  

    

  </div>
</template>

<script>

import axios from 'axios'

export default {
    props: ['id'],
    data() {
        return {
        array2:[],
        produtos:[],
        pedido:[],
        pedidoslocal:{ id: null, cod_produto: '', nome: '', valor: 0.00, cores:'', tamanhos:'',
                       ped:{pedido: 0, produto: 0, id: 0, quantidade: 0, valor_vendido: 0.00},
                    },
        busca:undefined,
        selecao:"null",
        selecaotam:"null",
        selecaocor:"null",
        selecaotamanho:"null"
         
          }
    },
    filters: {
        moedaReal (value) {
        return value.toLocaleString('pt-br',{style:'currency',currency:'BRL'})
        }
    },
    computed:{
        total: function () {
            return this.pedidoslocal.ped.quantidade*this.pedidoslocal.valor;
        },
        totalPedido: function () {
            return this.pedido[0].produtos.reduce((total , item) => {
            return total + item.ped.quantidade*item.valor
            },0)
        },
         optionCor: function () {
            return this.pedidoslocal.cores.split(",")
         },
         optionTam: function () {
            return this.pedidoslocal.tamanhos.split(",")
         }
    },
   /* beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.contato = EventBus.buscarContato(+to.params.id)
        })
    },
    beforeRouteLeave(to, from, next) {
        console.log('beforeRouteLeave')
        this.estaCancelando
            ? next(window.confirm('Deseja realmente sair?'))
            : next()
    },*/
    created(){

    this.getProdutos();
    this.getPedido();

    },
    methods: {
       async getProdutos() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/produtos`);
                console.log('GET /produtos', response)
                this.produtos = response.data;

        },
         async getPedido() {

                const response = await axios.get(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos`);
                console.log('GET /pedidos', response)
                this.pedido = response.data;
                this.array2 = this.pedido[0].produtos;
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
                ped:{pedido: 0, produto: 0, id: 0, quantidade: 1, valor_vendido: 0.00},
                },response.data)

            
        },

<<<<<<< HEAD
        async adicionarProduto(){
            const Objeto1 = Object.assign({},this.pedidoslocal)
           await axios.put(`http://127.0.0.1/pdvsolusoft/blog/public/api/pedidos/1/add`,this.pedidoslocal);
            this.pedido[0].produtos.push(Objeto1)
            
          this.pedidoslocal = { 
          id: null, 
          cod_produto: '', 
          nome: '', 
          valor: null,
          cores:'',
          tamanhos:'',
          ped:{pedido: 0, produto: 0, id: 0, quantidade: 1, valor_vendido: 0.00},
           }
=======
        adicionar() {
>>>>>>> parent of 97713ec... inserção de produtos via axios


          const Objeto1 = Object.assign({},this.pedidoslocal)
          this.pedido[0].produtos.push(Objeto1)
          
          this.pedidoslocal = { 
          id: null, 
          cod_produto: '', 
          nome: '', 
          valor: null,
          cores:'',
          tamanhos:'',
          ped:{pedido: 1, produto: 1, id: 1, quantidade: 1, valor_vendido: 0},
           }


          this.busca = ""

       },
       buscar(event) {
         this.busca = event.target.value
  
          //const Objeto = EventBus.buscarContato(+this.busca)

          const Objeto = Object.assign({}, this.produtos.find(c => c.id === +this.busca || c.nome === this.busca))
          //const Objeto = EventBus.buscarContato(+this.busca)

          this.pedidoslocal = Object.assign({},{ 
          id: null, 
          cod_produto: '', 
          nome: '', 
          valor: null,
          cores:'',
          tamanhos:'',
          ped:{pedido: 0, produto: 0, id: 0, quantidade: 1, valor_vendido: 0.00},
           },Objeto)
          
          /*this.pedidosLocal.splice(0, 1, Objeto)
          this.pedidoslocal=Objeto*/
       },
     

  },
}
</script>

