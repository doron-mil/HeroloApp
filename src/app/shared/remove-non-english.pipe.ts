import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'removeNonEnglish'
})
export class RemoveNonEnglishPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  }

}
