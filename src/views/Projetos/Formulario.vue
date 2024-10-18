<template>
    <section class="projetos">
        <form @submit.prevent="salvar" class="mb-5">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto :
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { defineComponent } from 'vue'
import { ALTERA_PROJETO, ADICIONA_PROJETO } from '@/store/tipo-mutações';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';


export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeDoProjeto: ''
        };
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, { id: this.id, nome: this.nomeDoProjeto });
                this.notificar(TipoNotificacao.ATENCAO, 'Projeto Alterado', 'Seu Projeto alterado já está disponível');
            }
            else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
                this.notificar(TipoNotificacao.SUCESSO, 'Excelente !', 'Projeto cadastrado com sucesso');
            }
            this.nomeDoProjeto = '';
            this.$router.push('/projetos')
        },

    },
    setup() {
        const store = useStore();
        const { notificar } = useNotificador();
        return {
            store,
            notificar,
        }
    }
})
</script>


<style scoped>
button {
    background-color: var(--button);
    border: none;
    transition: .2s;
}

button:hover {
    background-color: var(--buttonH);
}

input {
    height: 2.4rem;
    outline: none;
    border-color: #5DBAA4;
    color: var(--text-input);
    background-color: var(--bg-input);
}

.text {
    color: var(--title-color);
}

.table {
    border-radius: .5rem;
    background: var(--bg-primario);

}

h2,
label {
    color: var(--title-color);
}
</style>