<template>
    <section class="projetos">
        <h2 class="title">Projetos</h2>
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
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th class="text">ID</th>
                    <th class="text">Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td class="text">{{ projeto.id }}</td>
                    <td class="text">{{ projeto.nome }}</td>
                </tr>
            </tbody>

        </table>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'Projetos',
    data() {
        return {
            nomeDoProjeto: ''
        };
    },
    methods: {
        salvar() {
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = '';
        }
    },
    setup() {
        const store = useStore();
        return {
            store,
            projetos: computed(() => store.state.projetos),
        }
    }
})
</script>


<style scoped>
div>button {
    background-color: var(--button);
    border: none;
    transition: .2s;
}

div>button:hover {
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


.projetos {
    padding: 1rem;
}

h2,
label {
    color: var(--title-color);
}
</style>