import { Injectable } from "@angular/core";

@Injectable()
export class ReqService{
    requirements = [];
    

    addReq(req:any){
        this.requirements.push(req);   
    }


}