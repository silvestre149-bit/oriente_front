import React, { useState, useEffect } from "react";
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import M from 'materialize-css';
import { pegarSemestreAberto } from "../../../../api/semestre.js";
import MessageTemplate from "../../errorMessageTemplate/index.jsx";
import { criarSessao } from "../../../../api/sessao.js";

const form = {
    local: String,
    data: String,
    horário: Array,
    semestre: String
};

export default function ModalAdicionarSessao() {
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [formValores, setValores] = useState(form);
    const [semestre, setSemestre] = useState();
    useEffect(() => {
        var elemsModalSessao = document.querySelectorAll(".modal");
        M.Modal.init(elemsModalSessao, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
        var elemsSelectSessao = document.querySelectorAll('select');
        M.FormSelect.init(elemsSelectSessao);
    }, []);

    useEffect(() => {
        const buscarSemestre = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        }

        buscarSemestre();
    }, []);

    const pegarValores = (e) => {
        const { name, value } = e.target;

        setValores({ ...formValores, semestre: semestre[0]._id, [name]: value });
    };

    const adicionarSessao = async (e) => {
        e.preventDefault();

        try {
            await criarSessao(formValores);
            setFeedback({
                status: "sucesso",
                descricao: "Sessão criada com sucesso!"
            });
        } catch (e) {
            console.log(e);

            return setFeedback({
                status: "falha",
                descricao: "Não foi possível criar a sessão, tente mais tarde!"
            });
        }
    }

    return <>
        <br />
        <div style={{ marginBottom: '15px' }}>
            <div className="row">
                <div className="col s12">
                    <a href="#criarSessao" className="btn red accent-4 modal-trigger">
                        <Add style={{ verticalAlign: "middle", marginRight: "0.5em" }} />adicionar sessão
                    </a>
                </div>
            </div>
        </div>
        <div id="criarSessao" className="modal open">
            <div className="modal-content">
                <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}>
                    <Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                <div className="container">
                    <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Adicionar sessão</b></h4>
                    <form className="col s12" onSubmit={adicionarSessao}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="titulo" type="text" onChange={pegarValores} />
                                <label for="titulo">Título:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="quantidade" type="text" onChange={pegarValores} />
                                <label for="quantidade">Quantidade de pôsteres:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="local" type="text" onChange={pegarValores} />
                                <label for="local">Local:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="data" type="text" onChange={pegarValores} />
                                <label for="data">Data:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="horario" type="text" onChange={pegarValores} />
                                <label for="horario">Horário:</label>
                            </div>
                        </div>
                        <MessageTemplate mensagem={feedback} />
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "center", marginBottom: "1.5em"
                        }}>
                            <button type="submit" id="addAluno" className="btn red accent-4">Criar sessão de pôster</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}