import React, { useState, useEffect } from 'react';
import { pegarTodosAlunosComProjetos } from '../../../../api/aluno';
import { TabelaRelatorioDois } from './tabela';

// import { Container } from './styles';

function RelatorioDois() {

  const [alunos, setAlunos] = useState();

  useEffect(() => {
    const buscarAlunos = async () => {
      const res = await pegarTodosAlunosComProjetos();
      setAlunos(res.data);
    }

    buscarAlunos();
  }, [])

  if (!alunos) return <div></div>

  const listaAlunos = alunos.filter((aluno) => {
    return aluno.participacoes.length > 0;
  }).map((aluno) => {
    const alunos = {};
    const orientador = aluno.projetos[0].participantes.find(
      participante => participante.tipo === 'orientador'
    );
    alunos.nome = aluno.nome;
    alunos.cod = aluno.cod;
    alunos.turmaUm = aluno.turmas.turmaUm;
    alunos.turmaDois = aluno.turmas.turmaDois;
    alunos.titulo = aluno.projetos[0].titulo;
    alunos.orientador = orientador.nome;
    alunos.status = orientador.status;
    return alunos;
  });

  return <>
    <div className="section">
      <section className="white">
        <div className="card">
          <div className="card">
            <div className="card-content">
              <h3 className="center">Relatório #02</h3>
              <p className='center'>Alunos que cadastraram projetos em TCC II</p>
              <TabelaRelatorioDois avaliacoes={listaAlunos} />
            </div>
          </div>
        </div>
      </section>
    </div>
  </>;
}

export default RelatorioDois;