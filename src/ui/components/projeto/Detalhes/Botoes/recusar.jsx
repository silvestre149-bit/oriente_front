import { useHistory } from "react-router-dom";
import { removerAvaliadorProjeto, removerSuplenteProjeto, removerOrientadorProjeto, buscarParticipacao, deletarParticipacao, deletarUmProjeto, buscarProjetoDoAluno, pegarProjeto } from "../../../../../api/projeto";
import { deletarConvite, deletarVariosConvites, enviarConvite } from "../../../../../api/convites";
import { Button } from "react-materialize";
import { useEffect, useState } from "react";
import { removerParticipacaoUsuario } from "../../../../../api/aluno";
import { useContext } from "react";
import { AuthContext } from "../../../../context/Auth";

export default function RecusarConvite({ projeto, tipo, convite }) {
    const history = useHistory();
    const [participacoes, setParticipacao] = useState([]);
    const [dadosProjeto, setProjeto] = useState([]);
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        const pegarParticipacao = async () => {
            const res = await buscarParticipacao(projeto);
            setParticipacao(res.data);
        };

        const buscarProjeto = async () => {
            const res = await pegarProjeto(projeto);
            setProjeto(res.data);
        }

        pegarParticipacao();
        buscarProjeto();
    }, []);

    const recusarConvite = async (e) => {
        e.preventDefault();

        try {
            if (tipo === 'orientador') {
                for (let i = 0; i < participacoes.length; i++) {
                    let id = participacoes[i]._id;
                    if (participacoes[i].tipo === 'aluno') await removerParticipacaoUsuario(participacoes[i].usuarioId, [id]);
                    if (participacoes[i].tipo != 'aluno') await deletarParticipacao(id);
                }
                participacoes.map(async (participante) => {
                    return await enviarConvite({
                        remetenteNome: usuario.nome,
                        destinatario: participante.usuarioId,
                        tipo: "recusado",
                        titulo: dadosProjeto.titulo
                    })
                })
                await deletarUmProjeto(projeto);
                await deletarVariosConvites(projeto);
            };
            if (tipo === 'avaliador') await removerAvaliadorProjeto(projeto);
            if (tipo === 'suplente') await removerSuplenteProjeto(projeto);
            await deletarConvite(convite);

            return history.push('/notificacoes');
        } catch (e) {
            return console.log(e);
        }
    }

    console.log(dadosProjeto);
    return <>
        <Button style={{
            backgroundColor: 'red',
        }}
            onClick={(e) => { recusarConvite(e) }}>Recusar</Button>
    </>
}