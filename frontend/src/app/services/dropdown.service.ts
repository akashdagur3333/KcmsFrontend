import { Injectable } from '@angular/core';
import { Dropdowns } from '../qualification';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }



  getAll():Dropdowns[]{
    return [
    {Name:'BTech'},
    {Name:'BCA'},
    {Name:'MTech'},
    {Name:'MCA'},
    {Name:'Diploma'},
    {Name:'MBA'},
    {Name:'PGDCA'},
    {Name:'PGDCM'},
    {Name:'BSC'},
    ]
    }
}
