<template>
    <section class="projetos">
        <h2 class="is-size-1 has-text-centered mb-5">Projetos</h2>
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
                    </td>
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
    setup() {
        const store = useStore();
        return {
            projetos: computed(() => store.state.projetos)
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

.projetos {
    padding: 1rem;
}

h2 {
    color: var(--title-color);
}
</style>