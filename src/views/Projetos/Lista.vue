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
                    <td class="line is-flex">
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-1" @click="excluir(projeto.id)">
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
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { NOTIFICAR } from '@/store/tipo-mutações';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'Lista',
    methods: {
        excluir(id: string) {
            this.store.dispatch(REMOVER_PROJETO, id)
            this.store.commit(NOTIFICAR, {
                titulo: 'Projeto Excluído',
                texto: 'Seu projeto foi excluído!',
                tipo: TipoNotificacao.FALHA
            })
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_PROJETOS);
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
    background: var(--bg-primario);
}
</style>