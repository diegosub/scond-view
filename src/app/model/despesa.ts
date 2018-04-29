import { Estabelecimento } from "./estabelecimento";
import { Segmento } from "./segmento";

export class Despesa {
    constructor(
        public idDespesa: Number,
        public idSegmento: string,
        public idEstabelecimento: string,
        public idCartao: string,
        public idUsuario: string,
        public dtCadastro: Date,
        public dtCompra: Date,
        public dtReferencia: Date,
        public dtManutencao: Date,
        public vlDespesa: string,
        public fgAtivo: string,
        public fgCartao: string,
        public vlMesCartao: string,
        public dsObservacao: string,
        public segmento: Segmento,
        public estabelecimento: Estabelecimento,

        public dtCompraInicio: Date,
        public dtCompraFim: Date,

        public strVlDespesa: string
    ){}
}
