import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusfilter'
})
export class StatusfilterPipe implements PipeTransform {

  transform(records: any[], enable: boolean): any {
    return null;
  }

}
