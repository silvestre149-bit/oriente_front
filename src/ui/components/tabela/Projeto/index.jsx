import React, { useEffect, useState } from 'react';
import { TabelaComProjetos } from './tabela';
import { buscarProjetos } from '../../../../api/projeto';
import { pegarSemestreAberto } from '../../../../api/semestre';

function TabelaProjeto() {
  const [dados, setDados] = useState([]);
  const [semestre, setSemestre] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      const res = await buscarProjetos();
      setDados(res.data);
    };

    const buscarSemestre = async () => {
      const res = await pegarSemestreAberto();
      setSemestre(res.data);
    }

    buscarDados();
    buscarSemestre();
  }, [])

  const projetos = dados.filter((projeto) => {
    if(semestre.length === 0) return [];
    return projeto.semestre = semestre[0]._id;
  }).map((projeto) => {
    let projetos = {};
    projetos.id = projeto._id;
    projetos.titulo = projeto.titulo;
    projetos.disciplina = projeto.disciplina;
    projetos.status = projeto.status;
    projetos.alunos = [];
    projeto.participantes.filter((participante) => {
      if (participante.tipo === 'orientador') {
        projetos.orientador = participante.nome;
        projetos.situacao = participante.status;
      }
      if (participante.tipo === 'aluno') projetos.alunos.push(participante.nome + ", ");
    })
    return projetos;
  });

  return <>
    <section className="white">
      <div className="card">
        <div className="card">
          <div className="card-content">
            <TabelaComProjetos projetos={projetos} />
          </div>
        </div>
      </div>
    </section>
  </>;
}

export default TabelaProjeto;