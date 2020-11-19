import Vue from 'vue'

export default new Vue({
    data: {
        mensagem:{
            texto:"",
            tipo:""
        },
        dismissCountDown:0,
    },

    created() {
        this.$on('mensagemAlerta',(payload)=> {	
            this.mensagem = payload;
            this.dismissCountDown = 5
        });
        this.$on('zerar',(payload)=> {	
            this.dismissCountDown = payload
        });
       },
       methods: {
        zerar() {
            this.dismissCountDown = 0;
            this.mensagem = {};

            }
        }

    
})