import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
    header = [];
    analysis = [];

    addData(data:any){
        this.header = data[0];
        console.log(data.length);
        for(var i=1; i< data.length; i++){
          if(data[i]==""){
            // this row is empty
          } else {
            this.analysis.push(data[i]);
          }
          
        }
    }

    close(){
      this.header = [];
      this.analysis = [];
    }

    
}
