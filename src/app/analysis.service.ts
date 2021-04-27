import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
    header = [];
    analysis = [];

    addData(data:any){
        this.header = data[0];
        for(var i=1; i< data.length; i++){
          if(data[i]==""){
            // this row is empty
          } else {
            this.analysis.push(data[i]);
          }
        }
        // check if the last row is empty
        if(this.header[this.header.length-1] == ""){
          this.header = this.header.slice(0, -1);
          for(var i=0; i<this.analysis.length; i++){
            this.analysis[i] = this.analysis[i].slice(0, -1);
          }
        }
    }

    close(){
      this.header = [];
      this.analysis = [];
    }

    
}
