import React from 'react';
import { TabelaRelatorioUm } from './tabela';
import { useState } from 'react';
import { useEffect } from 'react';
import { pegarTodosAlunos } from '../../../../api/aluno';
import { Carregando } from '../../Carregando';

// import { Container } from './styles';

function RelatorioUm() {
  const [alunos, setAlunos] = useState();

  useEffect(() => {
    const buscarAlunos = async () => {
      const res = await pegarTodosAlunos();
      setAlunos(res.data);
    }

    buscarAlunos();
  }, [])

  if (!alunos) return <div></div>

  const listaAlunos = alunos.filter((aluno) => {
    return aluno.participacoes.length > 0;
  }).map((aluno) => {
    const alunos = {};
    alunos.nome = aluno.nome;
    alunos.cod = aluno.cod;
    alunos.turmaUm = aluno.turmas.turmaUm;
    alunos.turmaDois = aluno.turmas.turmaDois;
    return alunos;
  })

  return <>
    <div className="section">
      <section className="white">
        <div className="card">
          <div className="card">
            <div className="card-content">
              <h3 className="center">Relatório #01</h3>
              <p className='center'>Alunos que cadastraram projetos (TCC I e TCC II)</p>
              <TabelaRelatorioUm avaliacoes={listaAlunos} />
            </div>
          </div>
        </div>
      </section>
    </div>
  </>;
}

export default RelatorioUm;