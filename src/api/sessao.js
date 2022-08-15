import { get, post, del, patch } from './request';

export async function buscarSessoes() {
    try {
        const dados = await get('/sessao');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function buscarSessao(id) {
    try {
        const dados = await get('/sessao/' + id);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function criarSessao(body) {
    try {
        const dados = await post('/sessao/', body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}


