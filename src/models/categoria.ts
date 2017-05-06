import { TipoPublicacion } from './tipo-publicacion';

export class Categoria
{
  nombre: string;
  tipo_publicacion: TipoPublicacion[];

  constructor(data: any) {
    this.nombre = data.nombre;
    this.tipo_publicacion = data.tipo_publicacion;
  }
}
