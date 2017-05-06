export class TipoPublicacion
{
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;

  constructor(data: any) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.icono = data.icono;
  }
}
