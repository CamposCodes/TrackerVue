<template>
    <Box class="formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulario para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja inicar?" v-model="descricao" />
            </div>
            <div class="column is-2.6">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome || 'Selecione uma opção' }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column is-5">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";
import Box from "./Box.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/tipo-mutações";
import { notificacaoMixin } from "@/mixins/notificar";

export default defineComponent({
    name: "Formulario",
    emits: ['aoSalvarTarefa'],
    data() {
        return {
            descricao: '',
            idProjeto: '',
        }
    },
    components: {
        Temporizador,
        Box
    },
    mixins: [notificacaoMixin],
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            const projeto = this.projetos.find((p) => p.id == this.idProjeto);
            if (!projeto) {
                this.notificar(TipoNotificacao.FALHA, 'Ops !', 'Selecione um projeto para concluir a tarefa')
                return;
            }
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.descricao = '';
        },
    },
    setup() {
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    },
});
</script>

<style scoped>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}

section {
    padding-right: 1rem;
}

input,
select {
    height: 2.4rem;
    outline: none;
    border-color: #5DBAA4;
    color: var(--text-input);
    background-color: var(--bg-input);
}

input::placeholder {
    color: var(--text-input);
}

input:focus {}
</style>
