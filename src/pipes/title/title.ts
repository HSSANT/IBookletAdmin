import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(value: string, ...args) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
