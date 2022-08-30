import { useHistory } from "react-router-dom";
import { removerAvaliadorProjeto, removerSuplenteProjeto, removerOrientadorProjeto, buscarParticipacao, deletarParticipacao, deletarUmProjeto, buscarProjetoDoAluno, pegarProjeto } from "../../../../../api/projeto";
import { deletarConvite, deletarVariosConvites, enviarConvite } from "../../../../../api/convites";
import { Button } from "react-materialize";
import { useEffect, useState } from "react";
import { removerParticipacaoUsuario } from "../../../../../api/aluno";
import { gerarRelatorio } from "../../../../../api/relatorio";
import { useContext } from "react";
import { AuthContext } from "../../../../context/Auth";

export default function RecusarConvite({ projeto, tipo, convite }) {
    const history = useHistory();
    const [participacoes, setParticipacao] = useState([]);
    const [dadosProjeto, setProjeto] = useState([]);
    const [isDesabilitado, setDesabilitado] = useState(false);
    const { usuario } = useContext(AuthContext);
    const data = new Date();
    const dataFormatada = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();

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

    console.log(participacoes);
    const recusarConvite = async (e) => {
        e.preventDefault();

        setDesabilitado(true);
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
                console.log(participacoes);
                await gerarRelatorio({
                    titulo: dadosProjeto.titulo,
                    alunos: participacoes.filter((participante) => participante.tipo === 'aluno'),
                    orientador: usuario.nome,
                    data: dataFormatada,
                });
                await deletarUmProjeto(projeto);
                await deletarVariosConvites(projeto);
            };
            if (tipo === 'avaliador') await removerAvaliadorProjeto(projeto);
            if (tipo === 'suplente') await removerSuplenteProjeto(projeto);
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
            onClick={(e) => { recusarConvite(e) }}>Recusar</Button>
    </>
}