export class Funcionario{
    id : string;
    nome : string;
    email : string;
    salario : string;
    matricula : string;
    cargo : string;
    
    setFuncionario(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.matricula = obj.matricula;
        this.salario = obj.salario;
        this.cargo = obj.cargo;
    }
}