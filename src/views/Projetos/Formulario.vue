<template>
    <section class="projetos">
        <form @submit.prevent="salvar" class="mb-5">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto :</label>
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
import { defineComponent, ref } from 'vue'
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';


export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const router = useRouter();
        const store = useStore();
        const { notificar } = useNotificador();
        const nomeDoProjeto = ref("");

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
            nomeDoProjeto.value = projeto?.nome || '';
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = ""
            notificar(TipoNotificacao.SUCESSO, 'Excelente !', 'Projeto cadastrado com sucesso');
            router.push('/projetos');
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value })
                    .then(() => lidarComSucesso());

            }
            else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso());
            }
        }

        return {
            nomeDoProjeto,
            salvar,
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