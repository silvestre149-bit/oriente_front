import { ERRO_TYPES } from "./types";

/**
 * @param {{id: string, msg: string}} erro 
 */
export const apresentarErro = (erro) => {
    const msg = 'Erro: ' + erro.id + ' - ' + erro.msg;
    throw new Error(msg);
}

/**
 * @param {{name:string,message:string}} erro 
 */
export const tratarErroJWT = (erro) => {
    switch (erro.name) {
        case 'TokenExpiredError':
            return ERRO_TYPES.JWT_TEMPO_EXPIRADO;
        case 'JsonWebTokenError':
            return ERRO_TYPES.JWT_NAO_AUTENTICADO;
        case 'NotBeforeError':
            return ERRO_TYPES.JWT_NAO_AUTENTICADO;
        default:
            return ERRO_TYPES.JWT_NAO_AUTENTICADO;
    }
}

export const tratarErroToken = (erro) => {
    if (erro) {
        return console.error('dados do token inválido');
    } 
}