import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "@/views/Tarefas.vue";
import Projetos from "@/views/Projetos.vue";
import Formulario from "@/views/Projetos/Formulario.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "tarefas",
    component: Tarefas,
  },
  {
    path: "/projetos",
    name: "projetos",
    component: Projetos,
  },
  {
    path: "/projetos/novo",
    name: "novo projeto",
    component: Formulario,
  },
  {
    path: "/projetos/:id",
    name: "editar projeto",
    component: Formulario,
    props: true,
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
