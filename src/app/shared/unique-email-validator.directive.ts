import { ApiService } from './../service/api.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[uniqueEmail]',
  providers:[{provide:NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi:true}]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  constructor(private api:ApiService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return this.api.getUserByEmail(control.value).pipe(
        map(users =>{
          return users && users.length > 0 ? {'uniqueEmail':true}:null;
        })
      );  
    }
}
