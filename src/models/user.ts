import { TipoPublicacion } from './tipo-publicacion'

export class User
{
  nombre_completo: string;
  email: string;
  password: string;
  intereses: TipoPublicacion[];

  constructor(data: any) {
    this.nombre_completo = data.nombre_completo;
    this.email = data.email;
    this.password = data.password;
    if( data.intereses )
    {
      for( let interes of data.intereses )
      {
        this.intereses.push( new TipoPublicacion( interes ) );
      }
    }
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
  factura: string;
  estado: string;
  cedula: string;
  state: boolean;

  constructor( data: any ){
    super( data );
    this.factura = data.factura;
    this.estado = data.estado;
    this.cedula = data.cedula;
    this.state = false;
  }
}

export class Cliente extends User
{

}
