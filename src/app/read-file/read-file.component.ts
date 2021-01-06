import { Component, Input, OnInit } from '@angular/core';
import {ReService} from '../re.service';
import { parseString } from 'xml2js';

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
  constructor(private reqService: ReService) { }

  ngOnInit(): void {
  }

  fileChanged(e){
    this.file = e.target.files[0];
  }

  loadFile() {
    this.split = (this.file.name).split(".");
    if(this.file && this.type=="XML"){
      if(this.split[this.split.length-1]=="xml"){
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
    } else{ if(this.file && this.type=="json"){
      if(this.split[this.split.length-1]=="json"){
        console.log("json");
      }
    }}

    
    
  }


  parsingXML(){
    var tempReq = {};
    parseString(this.xmlFile, function(err, result) {
      if (err) console.log(err);

      // get id and name of requirements
      for(let p of result["xmi:XMI"]["uml:Model"]["0"]["packagedElement"]){
        if(p["$"]["name"] === "Requirements"){
          for(let n of p["packagedElement"]){
            tempReq[n['$']['xmi:id']] = {Name:n["$"]["name"]};
            tempReq[n['$']['xmi:id']]["Constraints"] = [];
          }
        }
      }
      // get requirements text
      for (let r of result["xmi:XMI"]["sysml:Requirement"]) {
        tempReq[r["$"]["base_Class"]]["Text"] = r["$"]["Text"];

      }
      //get constraint of requirement
      for(let p of result["xmi:XMI"]["uml:Model"]["0"]["packagedElement"]){
        if(p["$"]["name"] === "Analysis"){
          // get all the constraints id associated with the req
          for(let n of p["packagedElement"]){
            if(n["$"]["xmi:type"]==="uml:Abstraction"){
              tempReq[n["supplier"][0]["$"]["xmi:idref"]]["Constraints"].push({IdConstraint:n["client"][0]["$"]["xmi:idref"], Value:""});
            }
          }
          //get all the constraint name and value associated with the req
          for(let n of p["packagedElement"]){
            if( n["$"]["xmi:type"] === "uml:Class" ){
              for(let t in tempReq){
                for(let c in tempReq[t]["Constraints"]){
                  if(n["$"]["xmi:id"] === tempReq[t]["Constraints"][c]["IdConstraint"]){
                    tempReq[t]["Constraints"][c]["Name"] = n["$"]["name"];
                    tempReq[t]["Constraints"][c]["Value"] = n["ownedRule"][0]["specification"][0]["body"][0];
                  }
                }
              }  
            }
            
          }
        }
      }
  })
  for(let t in tempReq){
    this.reqService.addReq(tempReq[t]);
  }
     
   console.log(this.reqService.requirements);
  }  


}
