import React, { useState, useEffect } from "react";
import { MdEdit as Edit, MdClose as Close } from "react-icons/md";
import M from 'materialize-css';
import { pegarSemestreAberto } from "../../../../api/semestre.js";
import MessageTemplate from "../../errorMessageTemplate/index.jsx";
import { buscarSessao, buscarSessoes } from "../../../../api/sessao.js";

const form = {
    local: String,
    data: String,
    horário: Array,
    semestre: String
};

export default function ModalEditarSessao() {
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [formValores, setValores] = useState(form);
    const [sessao, setSessao] = useState([]);
    const [semestre, setSemestre] = useState();
    const [sessoes, setSessoes] = useState([]);
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
        };

        const pegarSessoes = async () => {
            const res = await buscarSessoes();
            setSessoes(res.data);
        };

        buscarSemestre();
        pegarSessoes();
    }, []);

    const pegarValores = (e) => {
        const { name, value } = e.target;

        setValores({ ...formValores, semestre: semestre[0]._id, [name]: value });
    };

    const pegarDadosSessao = async (value) => {
        const res = await buscarSessao(value);

        setSessao(res.data);
    };

    console.log(sessao);

    const editarSessao = async (e) => {
        e.preventDefault();

        try {
            await editarSessao(formValores);
            setFeedback({
                status: "sucesso",
                descricao: "Sessão editada com sucesso!"
            });
        } catch (e) {
            console.log(e);

            return setFeedback({
                status: "falha",
                descricao: "Não foi possível editar a sessão, tente mais tarde!"
            });
        }
    }

    return <>
        <br />
        <div style={{ marginBottom: '15px' }}>
            <div className="row">
                <div className="col s12">
                    <a href="#editarSessao" className="btn red accent-4 modal-trigger">
                        <Edit style={{ verticalAlign: "middle", marginRight: "0.5em" }} />editar sessão
                    </a>
                </div>
            </div>
        </div>
        <div id="editarSessao" className="modal open">
            <div className="modal-content">
                <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}>
                    <Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                <div className="container">
                    <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Editar sessão</b></h4>
                    <form className="col s12" onSubmit={editarSessao}>
                        <div class="row">
                            <label>Selecione a sessão</label>
                            <div className="custom-select">
                                <select value={e => e.target.index} onChange={e => { pegarDadosSessao(e.target.value);}} class="browser-default select-options ">
                                    <option disabled selected>Selecione uma sessão</option>
                                    {sessoes.sort().map((sessao, index) => {
                                        return <option key={index} value={sessao._id}>{sessao.titulo}</option>
                                    })}
                                </select>
                                <span className="custom-arrow"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="titulo" type="text" onChange={pegarValores} />
                                <label for="titulo">Título: {sessao.titulo}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="quantidade" type="text" onChange={pegarValores} />
                                <label for="quantidade">Quantidade de pôsteres: {sessao.quantidade}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="local" type="text" onChange={pegarValores} />
                                <label for="local">Local: {sessao.local}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="data" type="text" onChange={pegarValores} />
                                <label for="data">Data: {sessao.data}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="horario" type="text" onChange={pegarValores} />
                                <label for="horario">Horário: {sessao.horario}</label>
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