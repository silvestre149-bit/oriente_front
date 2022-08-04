
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';
import { deletarConvite, deletarVariosConvites } from '../../../api/convites';
import { useHistory } from 'react-router-dom';
import { buscarParticipacao, deletarParticipacao, deletarUmProjeto, pegarProjeto } from '../../../api/projeto';
import { useEffect, useState } from 'react';
import { removerParticipacaoUsuario } from '../../../api/aluno';


export default function NotificacaoCancelamento({ remetente, titulo, projetoId, descricao, convite, atualizar }) {
    const history = useHistory();
    const [projeto, setProjeto] = useState();
    const [participacao, setParticipacao] = useState();
    useEffect(() => {
        const pegarDadosDoProjeto = async () => {
            const res = await pegarProjeto(projetoId);
            setProjeto(res.data);
        };

        const pegarParticipacao = async () => {
            const res = await buscarParticipacao(projetoId);
            setParticipacao(res.data);
        }

        pegarDadosDoProjeto();
        pegarParticipacao();
    }, []);

    const aceitarCancelamento = async (e) => {
        e.preventDefault();

        try {
            for (let i = 0; i < participacao.length; i++) {
                let id = participacao[i]._id;
                if (participacao[i].tipo === 'aluno') await removerParticipacaoUsuario(participacao[i].usuarioId, [id]);
                if (participacao[i].tipo != 'aluno') await deletarParticipacao(id);
            }

            await deletarUmProjeto(projetoId);
            await deletarVariosConvites(projetoId);

            return atualizar(true);
        } catch (e) {
            return console.log(e);
        }
    }

    const recusarConvite = async (e) => {
        e.preventDefault();

        try {
            await deletarConvite(convite);

            return atualizar(true);
        } catch (e) {
            return console.log(e);
        }
    }

    return <>
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={`O aluno ${remetente} solicitou o cancelamento do projeto ${titulo}`}
                icon={<Icon>delete_sweep</Icon>}
                node="div">
                <p>
                    <strong>Justificativa: </strong>
                    {descricao}
                </p>

                <div className="row">
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                            onClick={(e) => { aceitarCancelamento(e) }}>Aceitar</Button>
                    </div>
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                            onClick={(e) => { recusarConvite(e) }}>Recusar</Button>
                    </div>
                    <div className="col s1" />
                    <Button
                        onClick={() => {
                            history.push('/informacoes/projeto', {
                                projeto: projetoId,
                                tipo: 'cancelamento',
                                descricao: descricao,
                                convite: convite,
                                remetente: remetente
                            })
                        }}
                        node="button"
                        style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                        waves="light">
                        Ver o projeto
                    </Button>
                </div>
            </CollapsibleItem>
        </Collapsible>
    </>
}