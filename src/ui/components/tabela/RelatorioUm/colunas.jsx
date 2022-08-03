/**@type {import('react-table').Column[]} */
export const COLUNAS_RELATORIO_UM = [
    {
        Header: 'Nome do Aluno',
        accessor: 'nome',
    },
    {
        Header: 'TIA',
        accessor: 'cod',
    },
    {
        Header: '1º Turma',
        accessor: 'turmaUm',
    },
    {
        Header: '2º Turma',
        accessor: 'turmaDois',
    },
    {
        Header: 'Título do Projeto',
        accessor: 'titulo',
    },
    {
        Header: 'Professor Orientador',
        accessor: 'professor',
    },
    {
        Header: 'Status',
        accessor: 'statusProfessor',
    },
]