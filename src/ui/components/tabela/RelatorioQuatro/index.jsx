import React, { useState, useEffect } from 'react';
import { TabelaRelatorioQuatro } from './tabela';
import { buscarRelatorioDeProjetos } from '../../../../api/relatorio';

function RelatorioQuatro() {
  const [relatorios, setRelatorios] = useState([]);
  useEffect(() =>{
    const buscarRelatorios = async () => {
      const res = await buscarRelatorioDeProjetos();
      setRelatorios(res.data);
    }

    buscarRelatorios();
  }, [])

  const relatorioFormatado = relatorios.map((relatorio) => {
    return {
      ...relatorio,
      alunos: relatorio.alunos.map((aluno) => {
        return (aluno.nome + ", ");
      })
    }
  })

  if(!relatorioFormatado) return <div></div>
  
  return <>
    <div className="section">
      <section className="white">
        <div className="card">
            <div className="card">
                <div className="card-content">
                  <h3 className="center">Relatório #04</h3>
                  <p className='center'>Registro de alunos que tiveram TCC's recusados</p>
                  <TabelaRelatorioQuatro avaliacoes={relatorioFormatado} />
                </div>
            </div>
        </div>
      </section>
    </div>
  </>;
}

export default RelatorioQuatro;