import { Injectable } from "@angular/core";

@Injectable()
export class ReService{
    requirements = [];

    addReq(req:any){
        this.requirements.push(req);
    
    }


}