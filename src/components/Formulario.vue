<template>
    <Box>
        <div class="columns is-3">
            <div class="column is-7" role="form" aria-label="Formulario para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja inicar?" v-model="descricao" />
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";
import Box from "./Box.vue";

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
        Box
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

input {
    height: 3rem;
    outline: none;
}

input:focus {
    border-color: #5DBAA4;
}
</style>
