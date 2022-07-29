import { useHistory } from "react-router-dom";
import { useState } from "react";
import { deletarConvite } from "../../../../../api/convites";
import { Button } from "react-materialize";
import { aceitarAvaliacao, aceitarSuplente } from "../../../../../api/professor";
import { adicionarParticipacaoUsuario } from "../../../../../api/cadastrar";
import { criarParticipacao } from "../../../../../api/cadastrar";
import { useContext } from "react";
import { AuthContext } from "../../../../context/Auth";

export default function AceitarConvite({ projeto, tipo, convite }) {
    const { usuario } = useContext(AuthContext);
    const history = useHistory();
    const enviarFormulario = async (e) => {
        e.preventDefault();

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
                await adicionarParticipacaoUsuario(usuario._id, participacao);
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
                await adicionarParticipacaoUsuario(usuario._id, participacao);
                await deletarConvite(convite);

                return history.push('/notificacoes');
            };
            await deletarConvite(convite);

            return history.push('/notificacoes');
        } catch (e) {
            return console.log(e);
        }
    }
    return <>
        <Button style={{
            backgroundColor: 'red',
        }}
            onClick={(e) => { enviarFormulario(e) }}>Aceitar</Button>
    </>
}