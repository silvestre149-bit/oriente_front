import { AlunosProfCoordenador } from "../../../../pages/usuario/profCoordenador/Alunos";
import { ControleProfCoordenador } from "../../../../pages/usuario/profCoordenador/Controle";
import { ProfessoresProfCoordenador } from "../../../../pages/usuario/profCoordenador/Professores";
import { ProjetosProfCoordenador } from "../../../../pages/usuario/profCoordenador/Projetos";
import { RelatorioProfCoordenador } from "../../../../pages/usuario/profCoordenador/Relatorios";
import { SemestreProfCoordenador } from "../../../../pages/usuario/profCoordenador/Semestre";
import { CompHomeCoordenador } from "../../../../pages/usuario/profCoordenador/Home";

import Projeto from "../../../../pages/TabelaDeProjetos/projeto";
import ProjetoControle from "../../../../pages/Projeto/projeto.jsx";
/** @type { import("react-router-dom").RouteProps[] } */
export const ROTAS_COORDENADOR = [
    {
        path: '/home',
        component: CompHomeCoordenador
    },
    {
        path: '/controle',
        component: ControleProfCoordenador
    },
    {
        path: '/controle/adm',
        component: ProjetoControle
    },
    {
        path: '/aluno',
        component: AlunosProfCoordenador
    },
    {
        path: '/professor',
        component: ProfessoresProfCoordenador
    },
    {
        path: '/projeto',
        component: ProjetosProfCoordenador
    },
    {
        path: '/projeto/adm',
        component: Projeto
    },
    {
        path: '/relatorio',
        component: RelatorioProfCoordenador
    },
    {
        path: '/semestre',
        component: SemestreProfCoordenador
    },
]