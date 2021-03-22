import { Component, OnInit } from '@angular/core';
import {AnalysisService} from '../analysis.service';
import { ReqService } from '../req.service';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {

  t:number = 0;

  constructor(public analysisService: AnalysisService, public reqService: ReqService) { }
  ngOnInit(): void {
  }

  format(value){
    var numb;
    numb = Math.round(parseFloat(value)*100)/100;
    if(numb){
      return numb;
    } else {
      return value;
    }
  }

  verify(row){
    this.t++;
    var variableString = "";
    for (var i = 0; i< row.length; i++){
      if(row[i]==""){
        variableString = variableString + "var " +this.analysisService.header[i] +"="+ "null" + ";";
      } else{
        variableString = variableString + "var "+ this.analysisService.header[i] +"="+ row[i] + ";";
      }     
    }
    var feasible = true;

    for ( var i = 0; i < this.reqService.requirements.length; i++){
      if (this.reqService.requirements[i].Selected){
        for (var j in this.reqService.requirements[i].Constraints){
          //    console.log(variableString + this.reqService.requirements[i].Constraints[j].Value);

          // controllo eval
          feasible = feasible && eval(variableString + this.reqService.requirements[i].Constraints[j].Value+";");
        }
      }
    }

    return !feasible;
  }
}
