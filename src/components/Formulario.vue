<template>
    <div>
        <div class="columns">
            <div class="column id-8" role="form" aria-label="Formulario para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja inicar?" />
            </div>
            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <Cronometro :tempoSegundos="tempoSegundos" />
                    <button class="button" @click="iniciar">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>play</span>
                    </button>
                    <button class="button" @click="finalizar">
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
export default defineComponent({
    name: "FormularioP",
    components: {
        Cronometro
    },
    data() {
        return {
            tempoSegundos: 0,
            cronometro: 0
        }
    },

    methods: {
        iniciar() {
            this.cronometro = setInterval(() => {
                this.tempoSegundos += 1;
            }, 1000);
        },
        finalizar() {
            clearInterval(this.cronometro);
        }
    }
});
</script>

<style scoped>
section {
    padding-right: 1rem;
}
</style>
