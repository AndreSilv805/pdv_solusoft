import Vue from 'vue'

export default new Vue({
    data: {
        autenticado: true,
        contatos: [
            { id: 1, nome: 'Isaac Newton', email: 'isaac@email.com' },
            { id: 2, nome: 'Albert Einstein', email: 'einstein@email.com' },
            { id: 3, nome: 'Stephen Hawking', email: 'stephen@email.com' },
        ],
        produtos: []
    },
    
    methods: {
        buscarContato(id) {
            return Object.assign({}, this.contatos.find(c => c.id === id))
        },
        editarContato(contato) {
            const indice = this.contatos.findIndex(c => c.id === contato.id)
            this.contatos.splice(indice, 1, contato)
        }
    }
})