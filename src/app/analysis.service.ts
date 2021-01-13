import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
    header = [];
 //   analysisOBJ = [];
    analysis = [];

    addData(data:any){
        this.header = data[0];
        for(var i=1; i< data.length; i++){
          this.analysis.push(data[i]);
        }
    }

    close(){
      this.header = [];
      this.analysis = [];
    }

    
}
