import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeDashes'})

export class RemoveDashes implements PipeTransform {
  transform(value: string): string {
    return value.replace('_', ' ').toLowerCase();
  }
}
