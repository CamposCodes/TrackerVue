<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoSegundos="tempoSegundos" />
        <button class="button" @click="iniciar" :disabled="cronometroRodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>


<script lang="ts">
import { defineComponent, DefineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
export default defineComponent({
    name: "Temporizador",
    components: {
        Cronometro
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
        }
    }
});
</script>