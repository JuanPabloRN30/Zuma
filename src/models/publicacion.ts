import { TipoPublicacion } from './tipo-publicacion';
import { User } from './user';

export class Publicacion
{
  id: number;
  titulo: string;
  tipo_publicacion: TipoPublicacion;
  valoracion: number;
  total_valoracion: number;
  //comentarios
  descripcion: string;
  precio: number;
  creador: User;
  estado: boolean;
  foto: string;

  constructor( data: any )
  {
    this.id = data.id;
    this.titulo = data.titulo;
    if( data.tipo_publicacion )
      this.tipo_publicacion = new TipoPublicacion( data.tipo_publicacion );
    this.valoracion = 0;
    this.total_valoracion = 0;
    this.descripcion = data.descripcion;
    this.precio = data.precio;
    this.estado = true;
    this.foto = data.foto;
  }
}
