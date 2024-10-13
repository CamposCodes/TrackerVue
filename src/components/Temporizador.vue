<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoSegundos="tempoSegundos" />
        <Botao @clicado="iniciar" texto="play" icone="fas fa-play" :desabilitado="cronometroRodando" />
        <Botao @clicado="finalizar" texto="stop" icone="fas fa-stop" :desabilitado="!cronometroRodando" />
    </div>
</template>


<script lang="ts">
import { defineComponent, DefineComponent } from "vue";
import Botao from "./Botao.vue";
import Cronometro from "./Cronometro.vue";
export default defineComponent({
    name: "Temporizador",
    emits: ['aoTemporizadorFinalizado'],
    components: {
        Cronometro,
        Botao,
    },
    data() {
        return {
            tempoSegundos: 0,
            cronometro: 0,
            cronometroRodando: false,
        }
    },

    methods: {
        iniciar() {
            this.cronometroRodando = !this.cronometroRodando;
            this.cronometro = setInterval(() => {
                this.tempoSegundos += 1;
            }, 1000);
        },
        finalizar() {
            this.cronometroRodando = !this.cronometroRodando;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoSegundos);
            this.tempoSegundos = 0;
        }
    }
});
</script>