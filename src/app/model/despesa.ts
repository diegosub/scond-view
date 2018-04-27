export class Despesa {
    constructor(
        public idDespesa: Number,
        public idSegmento: string,
        public idEstabelecimento: string,
        public idCartao: string,
        public idUsuario: string,
        public dtCadastro: string ,
        public dtCompra: Date ,
        public dtReferencia: string,
        public dtManutencao: string,
        public vlCompra: string,
        public fgAtivo: string,
        public fgCartao: string,
        public vlMesCartao: string,
        public dsObservacao: string
    ){}
}
