import React, { useState, useEffect } from 'react';
import { TabelaRelatorioTres } from './tabela';
import { DADOS } from './colunas';
import axios from 'axios';
import { Carregando } from '../../Carregando';
import { pegarTodosAlunos } from '../../../../api/aluno';

// import { Container } from './styles';

function RelatorioTres() {
  const [alunos, setAlunos] = useState([]);
  useEffect(() =>{
    const buscarAlunos = async () => {
      const res = await pegarTodosAlunos();
      setAlunos(res.data);
    }

    buscarAlunos();
  }, [])

  const listaAlunos = alunos.filter((aluno) => {
    return aluno.tipo === 'aluno' && aluno.participacoes.length === 0;
  }).map((aluno) => {
    const alunos = {};
    alunos.nome = aluno.nome;
    alunos.cod = aluno.cod;
    alunos.turmaUm = aluno.turmas.turmaUm;
    alunos.turmaDois = aluno.turmas.turmaDois;
    return alunos;
  })  

  if(!alunos) return <div></div>
  return <>
    <div className="section">
      <section className="white">
        <div className="card">
            <div className="card">
                <div className="card-content">
                  <h3 className="center">Relatório #03</h3>
                  <p className='center'>Alunos que não cadastraram projeto</p>
                  <TabelaRelatorioTres avaliacoes={listaAlunos} />
                </div>
            </div>
        </div>
      </section>
    </div>
  </>;
}

export default RelatorioTres;