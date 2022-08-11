import React, { useState, useEffect } from 'react';
import { BreadcrumbsControle } from '../../Breadcrumbs/ControleBC';
import { buscarTodasNotificacoes } from '../../../../api/convites';
import NotificacaoOrientacaoControle from '../../notificacaoTemplate/cancelarOrientacao';

function TabelaProjetoPendente() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [atualizando, setAtualizando] = useState(false);

  const atualizarPagina = () => setAtualizando(!atualizando)

  useEffect(() => {
    const pegarNotificacoes = async () => {
      const res = await buscarTodasNotificacoes();
      setNotificacoes(res.data);
    }

    pegarNotificacoes();
  }, [atualizando])

  return <>
    <BreadcrumbsControle/>
    <div className="section">
      <h2 className="center">Convites para orientação de projetos</h2>
      <section className="white">
        <div className="card">
          <div className="card">
            <div className="card-content">{
              notificacoes.filter((notificacao) => {
                return notificacao.tipo === 'orientacao';
              }).map((notificacao) => {
                return <NotificacaoOrientacaoControle 
                convite={notificacao._id} 
                projetoId={notificacao.projetoId}
                remetente={notificacao.remetenteNome}
                titulo={notificacao.titulo}
                atualizar={atualizarPagina}
                 />
              }
            )}
            </div>
          </div>
        </div>
      </section>
    </div>
  </>;
}

export default TabelaProjetoPendente;