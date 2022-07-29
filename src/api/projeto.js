import {get, post, patch } from "./request";

export async function buscarProjetos() {
    try {
        const dados = await get('/projeto');
        return {...dados };
    } catch (erro) {
        return { erro }
    }
};

export async function pegarProjeto(id) {
    try {
        const dados = await get('/projeto/' + id);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function buscarProjetoDoAluno(id) {
    try {
        const dados = await get('/projeto/aluno/' + id);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
};

export async function buscarCoordenadorDoProjeto(id) {
    try {
        const dados = await get('/projeto/coordenador/' + id);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
};

export async function buscarAvaliadorDoProjeto(id) {
    try {
        const dados = await get('/projeto/avaliador/' + id);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
};

export async function buscarSuplenteDoProjeto(id) {
    try {
        const dados = await get('/projeto/suplente/' + id);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
};

export async function inserirParticipacaoProjeto(id, body) {
    try {
        const dados = await post('/projeto/participante/' + id, body);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function adicionarCronogramaOrientacao(id, body) {
    try {
        const dados = await patch('/projeto/cronograma/' + id, body);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function removerOrientadorProjeto(id) {
    try {
        const dados = await patch('/projeto/remover/orientador/' + id);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function removerAvaliadorProjeto(id) {
    try {
        const dados = await patch('/projeto/remover/avaliador/' + id);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function removerSuplenteProjeto(id) {
    try {
        const dados = await patch('/projeto/remover/suplente/' + id);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};