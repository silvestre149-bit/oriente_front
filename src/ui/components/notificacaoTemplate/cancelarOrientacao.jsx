
import { useState, useContext } from 'react';
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { buscarParticipacao, deletarParticipacao, deletarUmProjeto, pegarProjeto } from '../../../api/projeto';
import { buscarConvitesDeAlunos, deletarConvite, deletarVariosConvites, enviarConvite } from '../../../api/convites';
import { removerParticipacaoUsuario } from '../../../api/aluno.js';
import { pegarSemestreAberto } from '../../../api/semestre.js';
import { useEffect } from 'react';

export default function NotificacaoOrientacaoControle({ remetente, titulo, projetoId, convite, atualizar }) {
    const history = useHistory();
    const { usuario } = useContext(AuthContext);
    const [existeConvites, setConvites] = useState([]);
    const [participacoes, setParticipacoes] = useState([]);
    const [projeto, setProjeto] = useState();
    const [semestre, setSemestre] = useState();

    useEffect(() => {
        const pegarSemestre = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        };

        const pegarConvitesAbertos = async () => {
            const res = await buscarConvitesDeAlunos(projetoId);
            setConvites(res.data);
        };

        const pegarParticipantes = async () => {
            const res = await buscarParticipacao(projetoId);
            setParticipacoes(res.data);
        };

        const buscarProjeto = async () => {
            const res = await pegarProjeto(projetoId);
            setProjeto(res.data);
        }

        pegarSemestre();
        pegarConvitesAbertos();
        pegarParticipantes();
        buscarProjeto();
    }, [])

    const cancelarProjeto = async (e) => {
        e.preventDefault();

        try {
            for (let i = 0; i < participacoes.length; i++) {
                let id = participacoes[i]._id;
                if (participacoes[i].tipo === 'aluno') await removerParticipacaoUsuario(participacoes[i].usuarioId, [id]);
                if (participacoes[i].tipo != 'aluno') await deletarParticipacao(id);
            }
            participacoes.map(async (participante) => {
                return await enviarConvite({
                    remetenteNome: usuario.nome,
                    destinatario: participante.usuarioId,
                    tipo: "cancelado",
                    semestre: semestre[0]._id,
                    titulo: projeto.titulo
                })
            })
            await deletarUmProjeto(projetoId);
            await deletarVariosConvites(projetoId);
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
                header={`O aluno ${remetente} convidou o professor para orientar o projeto ${titulo}`}
                icon={<Icon>school</Icon>}
                node="div">
                <div className='row'>
                    <div className="col s4">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                            onClick={(e) => { cancelarProjeto(e) }}>Cancelar</Button>
                    </div>
                    <div className="col s8 right-align" />
                    <Button
                        onClick={() => { history.push('/controle/adm', { projeto: projetoId, tipo: 'controle', convite: convite, remetente: remetente }) }}
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