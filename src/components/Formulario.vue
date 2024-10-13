<template>
    <div>
        <div class="columns">
            <div class="column id-8" role="form" aria-label="Formulario para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja inicar?" />
            </div>
            <div class="column">
                <Temporizador />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
    name: "FormularioP",
    components: {
        Temporizador,
    }
});
</script>

<style scoped>
section {
    padding-right: 1rem;
}
</style>
