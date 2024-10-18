<template>
    <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
        <div class="column is-one-fifth">
            <BarraLateral @aoTemaAlterado="trocarTema" />
        </div>
        <div class="column conteudo">
            <Notificacoes />
            <router-view></router-view>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Notificacoes from "./components/Notificacoes.vue";

export default defineComponent({
    name: "App",
    components: {
        BarraLateral,
        Notificacoes,
    },
    data() {
        return {
            modoEscuroAtivo: false
        }
    },
    methods: {
        trocarTema(modoEscuroAtivo: boolean) {
            this.modoEscuroAtivo = modoEscuroAtivo;
        }
    },
});
</script>

<style>
.lista {
    padding: 1.25rem;
}

main {
    --bg-primario: #F7E7D5;
    --bg-pop: #dfcdb8;
    --texto-primario: #fff;
    --texto-cronometro: #215c4c;
    --lateral: #24846A;
    --title-color: #24846A;
    --button: #2ea081;
    --buttonH: #215c4c;
    --bg-input: #fff;
    --text-input: #000;
    --bg-tarefa: #2ea081;
    --modal: #fff;
}

main.modo-escuro {
    --button: #2ea081;
    --buttonH: #215c4c;
    --bg-tarefa: #2ea081;
    --bg-primario: #081015;
    --texto: #000;
    --texto-primario: #000;
    --texto-cronometro: #37ffca;
    --title-color: #fff;
    --bg-pop: #000;
    --lateral: #14161A;
    --bg-input: #14161A;
    --text-input: #fff;
    --modal: #2ea081;
}

.conteudo {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
    padding: .5rem;
}

h2 {
    color: var(--title-color);
}

.projetos {
    padding: 1rem;
}
</style>
