export class Funcionario{
    id : string;
    matricula : string;
    nome : string;
    email : string;
    salario : string;
    cargo : string;
    
    setFuncionario(obj : any, id : any){
        this.id = id;
        this.matricula = obj.matricula;
        this.nome = obj.nome;
        this.email = obj.email;
        this.salario = obj.salario;
        this.cargo = obj.cargo;
    }
}