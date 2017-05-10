import {Categoria} from './categoria'

export class Interes
{
  //id: number;
  nombre: string;
  categoria: Categoria;

  constructor(data: any) {
    //this.id = data.id;
    this.nombre = data.nombre;
    if( data.categoria )
      this.categoria = new Categoria(data.categoria);
  }

  export(): any {
        var obj: any ={};
        obj.nombre = this.nombre;
        return obj
  }
}
