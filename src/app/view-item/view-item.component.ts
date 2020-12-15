import { Component, OnInit } from "@angular/core";
import { items } from "../item";
@Component({
  selector: "app-view-item",
  templateUrl: "./view-item.component.html",
  styleUrls: ["./view-item.component.css"]
})
export class ViewItemComponent implements OnInit {
  data: any;
  constructor() {}

  ngOnInit(): void {
    this.data = items;
  }
  remove(id: any) {
    this.data.splice(id, 1);
  }
}
