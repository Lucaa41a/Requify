import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-req-detail',
  templateUrl: './req-detail.component.html',
  styleUrls: ['./req-detail.component.scss']
})
export class ReqDetailComponent implements OnInit {
  @Input() detail;
  constructor() { }

  ngOnInit(): void {
  }
}


