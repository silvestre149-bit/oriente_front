import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { buscarParticipacao, deletarParticipacao, deletarUmProjeto } from '../../../../api/projeto.js';
import { removerParticipacaoUsuario } from '../../../../api/aluno.js';
import { deletarVariosConvites } from '../../../../api/convites.js';
import { Button } from 'react-materialize';
import MessageTemplate from '../../errorMessageTemplate/index.jsx';
import { useHistory } from 'react-router-dom';

export function ModalExcluirProjeto({ dadosProjeto }) {
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [participacao, setParticipacao] = useState([]);
    const [isDesabilitado, setDesabilitado] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const pegarParticipacao = async () => {
            const res = await buscarParticipacao(dadosProjeto._id);
            setParticipacao(res.data);
        };

        pegarParticipacao();
    }, []);

    const excluirProjeto = async () => {
        setDesabilitado(true);
        setFeedback({
            status: "sucesso",
            descricao: "Deletando o projeto, aguarde..."
        });
        try {
            for (let i = 0; i < participacao.length; i++) {
                let id = participacao[i]._id;
                if (participacao[i].tipo === 'aluno') await removerParticipacaoUsuario(participacao[i].usuarioId, [id]);
                if (participacao[i].tipo != 'aluno') await deletarParticipacao(id);
            };

            await deletarUmProjeto(dadosProjeto._id);
            await deletarVariosConvites(dadosProjeto._id);

            return history.push('/projeto');
        } catch (e) {
            setFeedback({
                status: "falha",
                descricao: "Erro ao deletar o projeto"
            });
            setDesabilitado(false);

            return console.log(e);
        }
    };

    return <>
        <div>
            <div>
                <div className="row">
                    <div className="col s12">
                        <a href="#cadastrarSessao" className="btn red accent-4 modal-trigger" >
                            <MdDelete style={{ verticalAlign: "middle", marginRight: "0.5em" }} />
                            Excluir Projeto
                        </a>
                    </div>
                </div>
                <div id="cadastrarSessao" className="modal">
                    <div className='modal-content center'>
                        <h3>Deseja realmente deletar o projeto?</h3>
                        <h5>Esta ação é irreversivel!</h5>
                        <MessageTemplate mensagem={feedback} />
                        <Button disabled={isDesabilitado} node="button"
                            style={{
                                marginRight: '5px',
                                backgroundColor: 'red',
                            }}
                            waves="light"
                            onClick={excluirProjeto}>
                            Excluir
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
