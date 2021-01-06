import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
    analysisJSON;

    saveJSON(analysis:any){
        this.analysisJSON = analysis;
    
    }
}
