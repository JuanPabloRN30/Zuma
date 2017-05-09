import { TipoPublicacion } from './tipo-publicacion'

export class User
{
  username: string;
  password: string;
  email: string;
  first_name: string;
  intereses: TipoPublicacion[];

  constructor(data: any) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.first_name = data.first_name;
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
    obj.username = this.username;
    obj.password = this.password;
    obj.email = this.email;
    obj.first_name = this.first_name;
    return obj
  }
}

export class Cliente extends User
{

  constructor( data: any ){
    super( data );
  }
  
  export(): any {
        var obj = super.export();
        return obj
  }
}

export class Trabajador extends User
{
  photo: string;
  factura: string;
  cedula: string;
  valoracion: number;
  cantidad_votos: number;
  estado: boolean;


  constructor(data: any) {
    super( data );
    this.photo = data.photo;
    this.factura = data.factura;
    this.cedula = data.cedula;
    this.valoracion = data.valoracion;
    this.cantidad_votos = data.cantidad_votos;
    this.estado = data.estado;
  }

  export(): any {
        var obj = super.export();
        obj.photo = this.photo;
        obj.factura = this.factura;
        obj.cedula = this.cedula;
        obj.valoracion = this.valoracion;
        obj.cantidad_votos = this.cantidad_votos;
        obj.estado = this.estado;
        return obj
  }
}
