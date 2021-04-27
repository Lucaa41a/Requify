import { Component, OnInit } from '@angular/core';
import {AnalysisService} from '../analysis.service';
import { ReqService } from '../req.service';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {

  checked;

  constructor(public analysisService: AnalysisService, public reqService: ReqService) {}
  ngOnInit(): void {
    this.checked = true;
  }

  format(value){
    var numb = parseFloat(value);
    var length = (numb + '').replace('.', '').length;  // for floats
    if(length>4 && numb){
      return  numb.toPrecision(4)
    } else {
      return value;
    }

    
   /*
    console.log( parseFloat(value).toPrecision(4) )
    
    if(numb){
      return numb;
    } else {
      return value;
    }
    */
  }

  verify(row, index){
    var variableString = "";
    var feasible = true;
    for (var i = 0; i< row.length; i++){
      if(row[i]=="" || row[i]==="NA"){           //the solution is not complete so it's not verified
        return false;
      }      
      if( isNaN(row[i]) ){                       // if it's not a number, set null
        variableString = variableString + "var " +this.analysisService.header[i] +"="+ "null" + ";";
      } else{
        variableString = variableString + "var "+ this.analysisService.header[i] +"="+ row[i] + ";";
      }    
    }
    variableString = variableString.replace(/,/g, ".");
   
    if(index=="0"){
      this.checked = true;
    }

    for ( var i = 0; i < this.reqService.requirements.length; i++){
      if (this.reqService.requirements[i].selected){
        for (var j in this.reqService.requirements[i].constraints){
          // check if the constrait has a correct formulation only in the first row, all rows have the same formulation
          if(index=="0"){
            this.checked = this.checked && this.check(variableString + this.reqService.requirements[i].constraints[j].value+";", i);
          }
          if( this.checked ){
            feasible = feasible && eval(variableString + this.reqService.requirements[i].constraints[j].value+";");
          } else {
            feasible = false;
          }   
        }
      }
    }
    if(index == this.analysisService.analysis.length){
      this.checked = false;
    }
    return feasible;
  }


  // check if the string can be evaluated and if it can't alert the user
  check( stringEval:string, index:number){
    try{
      var check = eval(stringEval);
    } catch (err){
      var mess = err.message.split(" ");
      if(mess[2]+mess[3] === "notdefined"){          
        this.addMissingParam(mess[0], index);
      } else {
        this.errorFormulation(index);
      }
      return false;
    } 
    return true;
  }

  addMissingParam(param:string, index:number){
    if( this.reqService.requirements[index].missingParam.indexOf(param)<0 ){
      this.reqService.requirements[index].missingParam.push(param);
      alert(param + " è un parametro non presente nei risultati");
    }
  }

  errorFormulation(index:number){
    if(this.reqService.requirements[index].formulation){
      this.reqService.requirements[index].formulation = false;
      alert("Uno o più vincoli del requisito '"+this.reqService.requirements[index].name+"' non è scritto corretamente");
    }
  }

}
