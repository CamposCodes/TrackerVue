<template>
    <div class="notificacoes">
        <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes"
            :key="notificacao.id">
            <div class="m message-header">{{ notificacao.titulo }}</div>
            <div class="m message-body">{{ notificacao.texto }}</div>
        </article>
    </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'Notificações',
    data() {
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger',
            }
        }
    },
    setup() {
        const store = useStore();
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    },
})
</script>


<style scoped>
.notificacoes {
    z-index: 100;
    position: absolute;
    right: 0;
    margin: .5rem;
    width: 20rem;
    opacity: 80%;

}

.m {
    padding: .5rem;
}
</style>
