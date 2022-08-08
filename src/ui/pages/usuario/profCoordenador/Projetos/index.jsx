import React from 'react';
import TabelaProjeto from '../../../../components/tabela/Projeto';
import { BreadcrumbsProjetos } from '../../../../components/Breadcrumbs/ProjetosBC';

export function ProjetosProfCoordenador() {
    return <>
        <BreadcrumbsProjetos />
        <h2 className="center">Lista de projetos</h2>
        <TabelaProjeto />
        <br />
    </>
}