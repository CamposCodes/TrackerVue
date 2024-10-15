<template>
    <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
        <div class="column is-one-fifth">
            <BarraLateral @aoTemaAlterado="trocarTema" />
        </div>
        <div class="column conteudo">
            <Formulario @aoSalvarTarefa="salvarTarefa" />
            <div class="lista">
                <h2 class="is-size-1 has-text-centered mb-5">Tarefas</h2>
                <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
                <Box class="tarefa" v-if="listaEstaVazia">Você não está muito produtivo hoje :( </Box>
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
import "./assets/global.css";

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
            tarefas: [] as ITarefa[],
            modoEscuroAtivo: false
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa);
        },
        trocarTema(modoEscuroAtivo: boolean) {
            this.modoEscuroAtivo = modoEscuroAtivo;
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
.lista {
    padding: 1.25rem;
}

main {
    --bg-primario: #F7E7D5;
    --texto-primario: #fff;
    --title-color: #080808;
    --texto-cronometro: #215c4c;
    --lateral: #24846A;
    --title-color: #24846A;
    --button: #2ea081;
    --bg-input: #fff;
    --text-input: #000;
    --bg-tarefa: #2ea081;
}

main.modo-escuro {
    --bg-tarefa: #2ea081;
    --bg-primario: #081015;
    --texto: #000;
    --texto-primario: #000;
    --texto-cronometro: #215c4c;
    --title-color: #24846A;
    --lateral: #14161A;
    --bg-input: #14161A;
    --text-input: #fff;
}

.conteudo {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
    padding: .5rem;
}

h2 {
    color: var(--title-color);
}
</style>
