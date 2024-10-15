<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="" />
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoBotao }}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BarraLateral",
    emits: ['aoTemaAlterado'],
    data() {
        return {
            modoEscuroAtivo: false
        }
    },
    computed: {
        textoBotao() {
            if (this.modoEscuroAtivo) {
                return 'Desativar modo escuro'
            }
            else {
                return 'Ativar modo escuro'
            }
        }
    },
    methods: {
        alterarTema() {
            this.modoEscuroAtivo = !this.modoEscuroAtivo;
            this.$emit('aoTemaAlterado', this.modoEscuroAtivo);
        }
    }
});
</script>



<style scoped>
img {
    width: 35rem;
    height: 12rem;
}

header {
    padding: 1rem;
    background: var(--lateral);
    width: 100%;
    height: 100vh;
    text-align: center;
}

button {
    margin-top: 2rem;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>
