import { Categoria } from "./categoria";

export class Segmento {
    constructor(
        public idSegmento: Number,
        public dsSegmento: string,
        public idCategoria: string,
        public fgAtivo: string ,
        public idUsuario: string,
        public dtCadastro: string,
        public dtManutencao: string,
        public categoria: Categoria
    ){}
}
