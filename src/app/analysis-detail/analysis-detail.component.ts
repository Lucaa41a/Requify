import { Component, OnInit } from '@angular/core';
import {AnalysisService} from '../analysis.service';
import { ReqService } from '../req.service';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {

  errorFlag:boolean = false;
  missingParam:string [];

  constructor(public analysisService: AnalysisService, public reqService: ReqService) { }
  ngOnInit(): void {
    console.log("cacca");
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

  verify(row, index){
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
      if (this.reqService.requirements[i].selected){
        for (var j in this.reqService.requirements[i].constraints){
          // check if the constrait has a correct formulation 
          if( this.check(variableString + this.reqService.requirements[i].constraints[j].value+";")){
            feasible = feasible && eval(variableString + this.reqService.requirements[i].constraints[j].value+";");
          } else {
            return false;
          }   
        }
      }
    }
    return feasible;
  }


  // check if the string can be evaluated and if it can't alert the user, only for the first row
  check( stringEval:string ){
    try{
      var check = eval(stringEval);
    } catch (err){
      if(!this.errorFlag){
        var mess = err.message.split(" ");
        if(mess[2]+mess[3] ==="notdefined"){
          alert(mess[0]+" è un parametro non presente nei risultati.");

        } else {
          alert("Il formato della formula non è corretto.");
        }
        this.errorFlag = true;
        return false;
      }
      return false;
    }
    this.errorFlag = false;
    return true;
  }


}
