<template>
    <main class="columns is-gapless is-multiline modo-escuro">
        <div class="column is-one-fifth">
            <BarraLateral />
        </div>
        <div class="column m-2">
            <Formulario @aoSalvarTarefa="salvarTarefa" />
            <div class="lista">
                <h2 class="is-size-1 has-text-centered mb-5">Tarefas</h2>
                <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
                <Box v-if="listaEstaVazia">Você não está muito produtivo hoje :( </Box>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Formulario from "./components/Formulario.vue";
import Tarefa from "./components/Tarefa.vue";
import ITarefa from "./interfaces/ITarefa";
import Box from "./components/Box.vue";

export default defineComponent({
    name: "App",
    components: {
        BarraLateral,
        Formulario,
        Tarefa,
        Box
    },
    data() {
        return {
            tarefas: [] as ITarefa[]
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa);
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    }
});
</script>

<style>
main {
    background: var(--bg-primario);
    color: var(--texto-primario);
    --bg-primario: #081015;

}


main .modo-escuro {
    --bg-primario: #b1abab;
    --texto-primario: #ddd;
}


h2 {
    color: #24846A;
}
</style>
