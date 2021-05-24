import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchKeyword: string,searchKey:string): any {

    if (!value || !searchKeyword) return value;

    let filteredArray : any[]=[];
    filteredArray =  value.filter(item => searchKey.split(',')
        .some(key => item.hasOwnProperty(key) && new RegExp(searchKeyword,'gi').test(item[key])));
    return filteredArray;
  }
}
