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
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import Box from "./Box.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from '@/hooks/notificador';


export default defineComponent({
    name: "Formulario",
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador,
        Box
    },
    methods: {

    },
    setup(props, { emit }) {
        const store = useStore(key);

        const descricao = ref("");
        const idProjeto = ref("");
        const projetos = computed(() => store.state.projeto.projetos);


        const { notificar } = useNotificador();


        const finalizarTarefa = (tempoDecorrido: number): void => {
            const projeto = projetos.value.find((p) => p.id == idProjeto.value);
            if (!projeto) {
                notificar(TipoNotificacao.ATENCAO, 'Tarefa sem Projeto Vinculado', 'Selecione um projeto para descrever melhor a tarefa')
                emit('aoSalvarTarefa', {
                    duracaoEmSegundos: tempoDecorrido,
                    descricao: descricao.value,
                    projeto: projetos.value.find(proj => proj.id == idProjeto.value)
                })
                return;
            }
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            descricao.value = '';
        };

        return {
            descricao,
            idProjeto,
            projetos,
            store,
            notificar,
            finalizarTarefa
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
