import { Interes } from './interes';
import { Cliente, Trabajador } from './user';

export class Solicitud
{
  id: number;
  fecha: string;
  direccion: string;
  estado: string;
  cliente: Cliente;
  trabajador: Trabajador;
  interes: Interes;

  constructor( data: any )
  {
    this.id = data.id;
    this.fecha = data.fecha;
    this.direccion = data.direccion;
    this.estado = data.estado;
    if( data.cliente )
      this.cliente = new Cliente(data.cliente);
    if( data.trabajador )
      this.trabajador = new Trabajador( data.trabajador );
    if( data.interes )
      this.interes = new Interes( data.interes );
  }
}
