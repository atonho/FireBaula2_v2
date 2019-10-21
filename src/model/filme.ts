export class Filme{
  
    id : string;
    titulo : string;
    diretor : string;
    anoLancamento : string;
    producao : string;
    genero : string;
    resumo : string;
  setFilme: any;
    
    setCliente(obj : any, id : any){
        this.id = id;
        this.titulo = obj.titulo;
        this.diretor = obj.diretor;
        this.anoLancamento = obj.anoLancamento;
        this.producao = obj.producao;
        this.genero = obj.genero;
        this.resumo = obj.resumo;

    }
}