import { Injectable } from "@angular/core";

@Injectable()
export class ReqService{
    requirements = [];
    

    addReq(req:any){
        req.missingParam = [];
        req.formulation = true;         // I assume that the formulation of all contraints is correct 
        this.requirements.push(req);   
    }


}