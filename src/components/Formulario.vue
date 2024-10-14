<template>
    <div>
        <div class="columns">
            <div class="column id-8" role="form" aria-label="Formulario para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja inicar?" v-model="descricao" />
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
    name: "Formulario",
    emits: ['aoSalvarTarefa'],
    data() {
        return {
            descricao: ''
        }
    },
    components: {
        Temporizador,
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            console.log('tempo: ', tempoDecorrido)
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = '';
        }
    },
});
</script>

<style scoped>
section {
    padding-right: 1rem;
}
</style>
