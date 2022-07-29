import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buscarAvaliadorDoProjeto, buscarSuplenteDoProjeto, pegarProjeto } from '../../../../api/projeto';
import { MdFormatListBulleted, MdPersonOutline, MdTimer } from 'react-icons/md';
import { buscarCoordenadorDoProjeto } from '../../../../api/projeto';
import { Carregando } from '../../Carregando';
import RecusarConvite from './Botoes/recusar';
import AceitarConvite from './Botoes/aceitar.jsx';
import AceitarConviteOrientador from './Botoes/aceitarOrientador';

export function ProjetoDetalhes() {
    const [projeto, setProjeto] = useState({});
    const [coordenador, setCoordenador] = useState({});
    const [avaliador, setAvaliador] = useState({});
    const [suplente, setSuplente] = useState({});
    const [carregando, setCarregando] = useState(true);
    const location = useLocation();
    const state = location.state;
    console.log(projeto);
    useEffect(() => {
        const buscarProjeto = async () => {
            const res = await pegarProjeto(state.projeto);
            setProjeto(res.data);
        };
        const buscarProfessores = async () => {
            const coordenador = await buscarCoordenadorDoProjeto(state.projeto);
            const avaliador = await buscarAvaliadorDoProjeto(state.projeto);
            const suplente = await buscarSuplenteDoProjeto(state.projeto);
            setCoordenador(coordenador.data);
            setAvaliador(avaliador.data);
            setSuplente(suplente.data);
            setCarregando(false);
        };

        buscarProjeto();
        buscarProfessores();
    }, [])

    if (carregando || !projeto) return <Carregando />
    return <>
        <div>
            <h1 className="center">Projeto</h1>
            <div className="section">
            </div>
            <br />
            <div className="card section">
                <div>
                    <div>
                        {state.tipo === 'orientador' &&
                            <>  <div className='row'>
                                <div className="col s2">
                                    <AceitarConviteOrientador projeto={projeto._id} convite={state.convite} />
                                </div>
                                <div className="col s2">
                                    <RecusarConvite projeto={projeto._id} tipo="orientador" convite={state.convite} />
                                </div>
                            </div>
                            </>
                        }
                        {state.tipo === 'avaliacao' &&
                            <div className='row'>
                                <div className="col s2">
                                    <AceitarConvite projeto={projeto._id} tipo="avaliador" convite={state.convite} />
                                </div>
                                <div className='col s2'>
                                    <RecusarConvite projeto={projeto._id} tipo="avaliador" convite={state.convite} />
                                </div>
                            </div>
                        }
                        {state.tipo === 'suplente' &&
                            <div className='row'>
                                <div className="col s2">
                                    <AceitarConvite projeto={projeto._id} tipo="suplente" convite={state.convite} />
                                </div>
                                <div className='col s2'>
                                    <RecusarConvite projeto={projeto._id} tipo="suplente" convite={state.convite} />
                                </div>
                            </div>}
                        <div className="section card-title center">
                            <h4>{projeto.titulo}</h4>
                        </div>
                        <div className="card-content ">
                            <div className="section">
                                <div className="row">
                                    <div className="col s12">
                                        <h5>
                                            <b>Dados do Projeto:</b>
                                        </h5>
                                        <p className="right">Situação do projeto: {projeto.status} </p>
                                    </div>
                                </div>
                                <ul className="collection">
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdFormatListBulleted /></i>
                                        <span className="title">
                                            <b>Descrição</b>
                                            <p>{projeto.descricao}</p>
                                        </span>
                                        <p>
                                        </p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdFormatListBulleted /></i>
                                        <span className="title">
                                            <b>Disciplina</b>
                                            <p>{projeto.disciplina}</p>
                                        </span>
                                        <p>
                                        </p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdTimer /></i>
                                        <span className="title">
                                            <b>Avaliação do pôster</b>
                                        </span>
                                        <p>Data: - Horário:  <br /> Local da avaliação:
                                        </p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdPersonOutline /> </i>
                                        <span className="title">
                                            <b>Orientador</b>
                                        </span>
                                        {coordenador ? (
                                            <>
                                                <p>{coordenador.nome}</p>
                                                {coordenador.status === 'aceito' ? (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {coordenador.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {coordenador.status}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p>Nenhum coordenador presente</p>
                                                <div className="col s1 offset-s12 right-align">
                                                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                                                </div>
                                            </>
                                        )}
                                        <p></p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdPersonOutline /> </i>
                                        <span className="title">
                                            <b>Avaliador</b>
                                        </span>
                                        {avaliador ? (
                                            <>
                                                <p>{avaliador.nome}</p>
                                                {avaliador.status === 'aceito' ? (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {coordenador.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {coordenador.status}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p>Nenhum avaliador presente</p>
                                                <div className="col s1 offset-s12 right-align">
                                                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                                                </div>
                                            </>
                                        )}
                                        <p></p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdPersonOutline /> </i>
                                        <span className="title">
                                            <b>Suplente</b>
                                        </span>
                                        {suplente ? (
                                            <>
                                                <p>{suplente.nome}</p>
                                                {suplente.status === 'aceito' ? (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {coordenador.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {coordenador.status}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p>Nenhum suplente presente</p>
                                                <div className="col s1 offset-s12 right-align">
                                                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                                                </div>
                                            </>
                                        )}
                                        <p></p>
                                    </li>
                                </ul>
                            </div>
                            <div className="section">
                                <div className="row">
                                    <div className="col s8">
                                        <h5><b> Dados da Equipe </b></h5>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Aluno</th>
                                                <th>TIA</th>
                                                <th>1º Turma</th>
                                                <th>2º Turma</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projeto.participantes.map((participante) => {
                                                if (participante.tipo === 'aluno') {
                                                    return <>
                                                        <tr>
                                                            <td>{participante.nome}</td>
                                                            <td>{participante.cod}</td>
                                                            <td>{participante.turmas.turmaUm ? (
                                                                <>{participante.turmas.turmaUm}</>
                                                            ) : (
                                                                <></>
                                                            )}</td>
                                                            <td>{participante.turmas.turmaDois ? (
                                                                <>{participante.turmas.turmaDois}</>
                                                            ) : (
                                                                <></>
                                                            )}</td>
                                                        </tr>
                                                    </>;
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

