<template>
    <Box>
        <div class="columns tarefa" @click="tarefaClicada">
            <div class="column is-4">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
            <div class="column is-3 projeto">{{ tarefa.projeto?.nome || 'N/D' }}</div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from '../interfaces/ITarefa'
import Box from "./Box.vue";


export default defineComponent({
    name: "Tarefa",
    emits: ['aoTarefaClicada'],
    components: {
        Cronometro,
        Box,
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada(): void {
            this.$emit('aoTarefaClicada', this.tarefa);
        }
    }
});
</script>

<style scoped>
.tarefa:hover {
    cursor: pointer;
}

div {
    background: var(--bg-tarefa);
    color: var(--texto-primario);
}

.projeto {
    color: var(--texto-cronometro);
    border-radius: .5rem;
    text-align: center;
}
</style>