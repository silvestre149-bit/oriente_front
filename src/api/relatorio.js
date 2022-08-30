import { get, post } from './request.js';

export async function buscarRelatorioDeProjetos() {
    try {
        const dados = await get('/relatorio');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function gerarRelatorio(body) {
    try {
        const dados = await post('/relatorio', body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}