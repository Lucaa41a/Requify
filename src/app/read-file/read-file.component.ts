import { Component, Input, OnInit } from '@angular/core';
import {ReqService} from '../req.service';
import {AnalysisService} from '../analysis.service';
import { parseString } from 'xml2js';
import { parse } from 'papaparse';

@Component({
  selector: 'app-read-file',
  templateUrl: './read-file.component.html',
  styleUrls: ['./read-file.component.scss']
})
export class ReadFileComponent implements OnInit {
  @Input() type:String; 
  file:File;
  public xmlFile;
  split:String[];
  constructor(private reqService: ReqService, private analysisService: AnalysisService) { }

  ngOnInit(): void {
  }

  fileChanged(e){
    this.file = e.target.files[0];
  }

  loadFile() {
    if(this.file === undefined){
      alert("Nessun file selezionato");
    } else {
      this.split = (this.file.name).split(".");

      if(this.file && this.type=="XML"){
        if(this.split[this.split.length-1]=="xml"){       // it's a SysML file
          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            this.xmlFile=fileReader.result;
            this.parsingXML();
            };
          fileReader.readAsText(this.file);
          this.file = null; 
        } else {
          alert("Il file inserito non è corretto.");
        }

      } else{ if(this.file && this.type=="csv"){        
        if(this.split[this.split.length-1]=="csv"){     // it's a result file
          parse(this.file, {
            complete: (results) => {
              this.analysisService.addData(results.data);
              console.log(this.analysisService.analysis);
            }
          });

        } else {
          alert("Il file inserito non è corretto.");
        }
      }} 
    }
  }
  parsingXML(){
    var tempReq = {};
    parseString(this.xmlFile, function(err, result) {
      if (err) console.log(err);

      // get id and name of requirements
      for(let p of result["xmi:XMI"]["uml:Model"]["0"]["packagedElement"]){
        if(p["$"]["name"] === "Requirements"){
          for(let n of p["packagedElement"]){
            tempReq[n['$']['xmi:id']] = {name:n["$"]["name"]};
            tempReq[n['$']['xmi:id']]["constraints"] = [];
          }
        }
      }
      // get requirements text
      for (let r of result["xmi:XMI"]["sysml:Requirement"]) {
        tempReq[r["$"]["base_Class"]]["text"] = r["$"]["Text"];

      }
      //get constraint of requirement
      for(let p of result["xmi:XMI"]["uml:Model"]["0"]["packagedElement"]){
        if(p["$"]["name"] === "Analysis"){
          // get all the constraints id associated with the req
          for(let n of p["packagedElement"]){
            if(n["$"]["xmi:type"]==="uml:Abstraction"){
              tempReq[n["supplier"][0]["$"]["xmi:idref"]]["constraints"].push({IdConstraint:n["client"][0]["$"]["xmi:idref"], value:""});
            }
          }
          //get all the constraint name and value associated with the req
          for(let n of p["packagedElement"]){
            if( n["$"]["xmi:type"] === "uml:Class" ){
              for(let t in tempReq){
                for(let c in tempReq[t]["constraints"]){
                  if(n["$"]["xmi:id"] === tempReq[t]["constraints"][c]["IdConstraint"]){
                    tempReq[t]["constraints"][c]["name"] = n["$"]["name"];
                    tempReq[t]["constraints"][c]["value"] = n["ownedRule"][0]["specification"][0]["body"][0];
                  }
                }
              }  
            }
            
          }
        }
      }
  })
  for(let t in tempReq){
    tempReq[t]["selected"] = false;           // flag if the requirement is selected for the analysis
    this.reqService.addReq(tempReq[t]);
  }
     
   console.log(this.reqService.requirements);
  }  


}
