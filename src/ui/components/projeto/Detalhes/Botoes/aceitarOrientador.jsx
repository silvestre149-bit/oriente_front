import { useContext, useState } from "react";
import { criarParticipacao } from "../../../../../api/cadastrar";
import { aceitarOrientacao } from "../../../../../api/professor";
import { deletarConvite } from "../../../../../api/convites";
import { adicionarCronogramaOrientacao } from "../../../../../api/projeto";
import { Modal, Button } from "react-materialize";
import MessageTemplate from "../../../errorMessageTemplate";
import { inserirParticipacaoUsuario } from "../../../../../api/aluno";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../context/Auth";

const dias = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo"
];

export default function AceitarConviteOrientador({ projeto, convite }) {
    const { usuario } = useContext(AuthContext);
    const history = useHistory();
    const [feeedback, setFeedback] = useState({
        status: '',
        mensagem: ''
    });
    const [dados, setDados] = useState({
        orientador: usuario.nome,
        email: usuario.email,
        dia: "",
        horas: "",
        tipo: "",
        periodicidade: "",
        local: ""
    });

    const pegarValores = (e) => {
        const { name, value } = e.target;
        setDados({ ...dados, [name]: value });
    };

    const aceitarConvite = async (e) => {
        e.preventDefault();
        if (dados.data === "" || dados.horas === "" || dados.local === "") {
            return setFeedback({
                status: 'falha',
                descricao: 'Preencha todos os campos'
            });
        }

        try {
            const participacao = await criarParticipacao({
                nome: usuario.nome,
                cod: usuario.cod,
                tipo: usuario.tipo,
                usuarioId: usuario._id,
                projetoId: projeto,
            });
            await adicionarCronogramaOrientacao(projeto, dados);
            await aceitarOrientacao(projeto);
            await deletarConvite(convite);
            await inserirParticipacaoUsuario(usuario._id, participacao);
            setFeedback({
                status: 'sucesso',
                descricao: 'Orientação adicionada com sucesso'
            });

            return history.push('/notificacoes');
        } catch (e) {
            console.log(e);

            return setFeedback({
                status: 'falha',
                descricao: 'Erro ao adicionar orientação'
            })
        }
    };

    return <>
        <Modal
            open={false}
            options={{
                dismissible: false,
                endingTop: '10%',
                inDuration: 250,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: '4%'
            }}
            trigger={<Button style={{
                backgroundColor: 'red',
            }} node="button">Aceitar</Button>}
        >
            <form onSubmit={aceitarConvite}>
                <div className="modal-content">
                    <div className="container">
                        <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação</b></h4>
                        <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Por favor, preencha o cronograma de orientação.</b></p>
                        <div className="row">
                            <form onChange={(e) => pegarValores(e)}>
                                <label>
                                    <input class="with-gap" name="tipo" type="radio" value="Presencial" />
                                    <span>Presencial</span>
                                </label>
                                <label>
                                    <input class="with-gap" name="tipo" type="radio" value="On-line" />
                                    <span>On-line</span>
                                </label>
                            </form>
                        </div>
                        {dados.tipo != "" ? (
                            <>
                                <div className="input-field col s12">
                                    <input name="local" type="text" value={dados.local} onChange={(e) => pegarValores(e)} />
                                    <label for="local">Local:</label>
                                </div>
                                <div className="row">
                                    <label>Periodicidade</label>
                                    <form onChange={(e) => pegarValores(e)}>
                                        <label>
                                            <input class="with-gap" name="periodicidade" type="radio" value="Semanal" />
                                            <span>Semanal</span>
                                        </label>
                                        <label>
                                            <input class="with-gap" name="periodicidade" type="radio" value="Quinzenal" />
                                            <span>Quinzenal</span>
                                        </label>
                                    </form>
                                </div>
                            </>) : (
                            <div></div>
                        )
                        }
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="horas" type="text" value={dados.horas} onChange={(e) => pegarValores(e)} />
                                <label for="horas">Horário: </label>
                            </div>
                        </div>
                        <div className="row">
                            <label>Dia da semana: </label>
                            <div className="input-field col s12">
                                <select className="browser-default select-options" name="dia" onChange={(e) => pegarValores(e)}>
                                    <option value="" defaultChecked>Selecione o dia da semana</option>
                                    {dias.map((dia) => {
                                        return <option value={dia} defaultChecked>{dia}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <MessageTemplate mensagem={feeedback} />
                    <div className="modal-footer" style={{
                        display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                    }}>
                        <button type="submit" id="aceitar" className=" btn red accent-4" style={{ marginRight: '1rem' }}>Confirmar</button>
                        <button type="button" id="naoAceitar" className="modal-close btn grey">Não confirmar</button>
                    </div>
                </div>
            </form>
        </Modal>
    </>
}