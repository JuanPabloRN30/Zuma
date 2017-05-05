export class User
{
  nombre_completo: string;
  email: string;
  password: string;

  constructor(data: any) {
    this.nombre_completo = data.nombre_completo;
    this.email = data.email;
    this.password = data.password;
  }

  export(): any {
    var obj: any = {};
    obj.nombre_completo = this.nombre_completo
    obj.email = this.email
    obj.password = this.password
    return obj
  }
}

export class Vendedor extends User
{

}

export class Cliente extends User
{

}
