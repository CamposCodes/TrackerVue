<template>
    <h2 class="t is-size-1 has-text-centered mb-5">Tarefas</h2>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="field">
        <label for="filtro" class="label">Filtrar :</label>
        <p class="control has-icons-left has-icons-right">
            <input class="input" type="texto" placeholder="Digite para filtrar" v-model="filtro" />
            <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
            </span>
        </p>
    </div>
    <div class="lista">
        <Box class="tarefa" v-if="listaEstaVazia && !filtro">Você não está muito produtivo hoje :( </Box>
        <Box class="tarefa" v-else-if="listaEstaVazia">Nenhuma tarefa corresponde ao filtro digitado :(</Box>
        <Tarefa class="tarefa" @aoTarefaClicada="selecionarTarefa" v-for="(tarefa, index) in tarefas" :key="index"
            :tarefa="tarefa" />
    </div>

    <div class="modal pop" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <h2 class="modal-card-title">Editando uma Tarefa</h2>
                <button @click="fecharModal" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição:
                    </label>
                    <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
                    <button @click="deletarTarefa(tarefaSelecionada.id)" class="button del">Excluir Tarefa</button>
                    <button @click="fecharModal" class="button">Cancelar</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import "../assets/global.css";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_TAREFA } from "@/store/tipo-acoes";
import { useStore } from "@/store";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
    name: "Tarefas",
    components: {
        Formulario,
        Tarefa,
        Box
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        };
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        },
        deletarTarefa(id: string) {
            this.store.dispatch(REMOVER_TAREFA, id)
                .then(() => this.fecharModal());
        },
        selecionarTarefa(tarefa: ITarefa): void {
            this.tarefaSelecionada = tarefa;
        },
        fecharModal() {
            this.tarefaSelecionada = null;
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal());
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        const filtro = ref("");

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value);
        });

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
        };
    }
});
</script>

<style scoped>
.field {
    margin: .5rem 1.5rem;
}

.field input::placeholder {
    color: var(--text-input);
}

.modal-card-head {
    background: var(--lateral);
    box-shadow: none;
}

.modal-card-body,
.modal-card-foot {
    background: var(--bg-pop);
}

.t {
    color: var(--title-color);
}

.del {
    background: rgba(163, 8, 8, 0.71);
}

h2 {
    color: var(--title-color);
}

button {
    background-color: var(--button);
    color: var(--bg-input);
    border: none;
    transition: .2s;
}

button:hover {
    background-color: var(--buttonH);
}

input {
    height: 2.4rem;
    outline: none;
    border-color: #5DBAA4;
    color: var(--text-input);
    background-color: var(--bg-input);
}

.text {
    color: var(--title-color);
}

.table {
    border-radius: .5rem;
    background: var(--bg-primario);
}

label {
    color: var(--title-color);
}
</style>
