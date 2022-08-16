import { useHistory } from "react-router-dom";
import { deletarConvite, deletarTodosConvites, deletarVariosConvites } from "../../../../../api/convites";
import { Button } from "react-materialize";
import { aceitarAvaliacao, aceitarSuplente } from "../../../../../api/professor";
import { criarParticipacao } from "../../../../../api/cadastrar";
import { useContext } from "react";
import { AuthContext } from "../../../../context/Auth";
import { inserirParticipacaoUsuario, removerParticipacaoUsuario } from "../../../../../api/aluno";
import { buscarParticipacao, deletarParticipacao, deletarUmProjeto, inserirParticipacaoProjeto } from "../../../../../api/projeto";
import { useEffect, useState } from "react";

export default function AceitarConvite({ projeto, tipo, convite, atualizar }) {
    const { usuario } = useContext(AuthContext);
    const history = useHistory();
    const [participacoes, setParticipacao] = useState([]);
    const [isDesabilitado, setDesabilitado] = useState(false);

    useEffect(() => {
        const pegarParticipacao = async () => {
            const res = await buscarParticipacao(projeto);
            setParticipacao(res.data);
        }

        pegarParticipacao();
    }, []);
    
    const enviarFormulario = async (e) => {
        e.preventDefault();

        setDesabilitado(true);
        try {
            if (tipo === 'avaliador') {
                const participacao = await criarParticipacao({
                    nome: usuario.nome,
                    cod: usuario.cod,
                    tipo: usuario.tipo,
                    usuarioId: usuario._id,
                    projetoId: projeto,
                });
                await aceitarAvaliacao(projeto)
                await inserirParticipacaoUsuario(usuario._id, participacao);
                await deletarConvite(convite);

                return history.push('/notificacoes');
            }
            ;
            if (tipo === 'suplente') {
                const participacao = await criarParticipacao({
                    nome: usuario.nome,
                    cod: usuario.cod,
                    tipo: usuario.tipo,
                    usuarioId: usuario._id,
                    projetoId: projeto,
                });
                await aceitarSuplente(projeto);
                await inserirParticipacaoUsuario(usuario._id, participacao);
                await deletarConvite(convite);

                return history.push('/notificacoes');
            };
            if (tipo === 'cancelamento') {
                for (let i = 0; i < participacoes.length; i++) {
                    let id = participacoes[i]._id;
                    if (participacoes[i].tipo === 'aluno') await removerParticipacaoUsuario(participacoes[i].usuarioId, [id]);
                    if (participacoes[i].tipo != 'aluno') await deletarParticipacao(id);
                }
    
                await deletarUmProjeto(projeto);
                await deletarConvite(convite);
                await deletarVariosConvites(projeto);

                atualizar(true);
                return history.push('/notificacoes');
            };
            const participacao = await criarParticipacao({
                nome: usuario.nome,
                cod: usuario.cod,
                turmas: usuario.turmas,
                tipo: 'aluno',
                usuarioId: usuario._id,
                projetoId: projeto,
            });
            await inserirParticipacaoProjeto(projeto, participacao.data);
            await inserirParticipacaoUsuario(usuario._id, participacao);
            await deletarConvite(convite);

            return history.push('/notificacoes');
        } catch (e) {
            setDesabilitado(false);
            return console.log(e);
        }
    }

    return <>
        <Button
        disabled={isDesabilitado} 
        style={{
            backgroundColor: 'red',
        }}
            onClick={(e) => { enviarFormulario(e) }}>Aceitar</Button>
    </>
}