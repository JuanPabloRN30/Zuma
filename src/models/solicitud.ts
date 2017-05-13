import { Interes } from './interes';
import { Cliente, Trabajador } from './user';

export class Solicitud
{
  id: number;
  fecha: Date;
  direccion: string;
  descripcion: string;
  estado: string;
  cliente: Cliente;
  trabajador: Trabajador;
  interes: Interes;

  constructor( data: any )
  {
    this.id = data.id;
    this.fecha = data.fecha;
    this.direccion = data.direccion;
    if( !data.estado )
      this.estado = "Pendiente";
    this.estado = data.estado;
    if( data.cliente )
      this.cliente = new Cliente(data.cliente);
    if( data.trabajador )
      this.trabajador = new Trabajador( data.trabajador );
    if( data.interes )
      this.interes = new Interes( data.interes );
  }

  export():any{
    var obj: any = {};
//    obj.fecha = this.fecha;
    obj.direccion = this.direccion;
//    obj.descripcion = this.descripcion;
    obj.id = this.id;
    obj.estado = this.estado;
    obj.trabajadorusername = this.trabajador.username;
    obj.interesnombre = this.interes.nombre;
    return obj;
  }
}
