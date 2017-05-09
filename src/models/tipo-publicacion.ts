import {Categoria} from './categoria'

export class Interes
{
  id: number;
  nombre: string;
  categoria: Categoria;

  constructor(data: any) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.categoria = data.categoria;
  }
}
