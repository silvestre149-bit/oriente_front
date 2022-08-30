import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_RELATORIO_QUATRO } from './colunas';

export function TabelaRelatorioQuatro({ avaliacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_RELATORIO_QUATRO}
            dados={avaliacoes}
        />
    </>
}