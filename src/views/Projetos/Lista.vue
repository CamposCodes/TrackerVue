<template>
    <section class="projetos">
        <router-link to="/projetos/novo" class="button mb-5">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo Projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th class="text">ID</th>
                    <th class="text">Nome</th>
                    <th class="text">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td class="text">{{ projeto.id }}</td>
                    <td class="text">{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue'
import { EXCLUIR_PROJETO } from '@/store/tipo-mutações';

export default defineComponent({
    name: 'Lista',
    methods: {
        excluir(id: string) {
            this.store.commit(EXCLUIR_PROJETO, id)
        }
    },
    setup() {
        const store = useStore();
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
})
</script>


<style scoped>
.button {
    background-color: var(--button);
    border: none;
    transition: .2s;
}

.button:hover {
    background-color: var(--buttonH);
}

.text {
    color: var(--title-color);
}

.table {
    border-radius: .5rem;
    background: var(--bg-primario);

}
</style>