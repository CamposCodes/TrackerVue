import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { INotificacao } from "@/interfaces/INotificacao";
import http from "@/http/index"

import {
    EXCLUIR_PROJETO,
    ALTERA_PROJETO,
    ADICIONA_PROJETO,
    NOTIFICAR,
    DEFINIR_PROJETOS,
    DEFINIR_TAREFAS,
    ADICIONA_TAREFA,
    ALTERA_TAREFA,
} from "./tipo-mutações";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";
interface Estado {
    projetos: IProjeto[];
    tarefas: ITarefa[];
    notificacoes: INotificacao[];

}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
        tarefas: [],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string): void {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto;
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter((proj) => proj.id != id);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa): void {
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex((proj) => proj.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(
                    (notificacao) => notificacao.id != novaNotificacao.id
                );
            }, 3000);
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            });
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto);
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(response => commit(DEFINIR_TAREFAS, response.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(tarefa => commit(ALTERA_TAREFA, tarefa))
        },

    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
