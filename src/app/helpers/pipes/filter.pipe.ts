import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(arr: any[], texto_buscar: string, campo: string): any[] {
    if (texto_buscar === '') {
      return arr
    }
    return arr.filter(item => {
      return item[campo].includes(texto_buscar.toUpperCase())
    });
  }
}
