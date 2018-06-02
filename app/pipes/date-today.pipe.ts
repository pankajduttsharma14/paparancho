import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToday'
})
export class DateTodayPipe implements PipeTransform {
	
	filterItems:any=Array()


	transform(records: any[], enable: boolean): any {
			if(!enable) return records;
			var d=new Date();
    		var dd1=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    		for(var i=0; i<records.length;i++)
    		{
			var d2=new Date(records[i].createdAt);
			var dd2=d2.getDate()+"/"+(d2.getMonth()+1)+"/"+d2.getFullYear();				
			 if(dd1==dd2)
    			{
    				this.filterItems.push(records[i]);
    			}
    		}
			return this.filterItems;
    		// return records;
    }

}
