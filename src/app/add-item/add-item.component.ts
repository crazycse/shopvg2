import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { items } from "../item";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.css"]
})
export class AddItemComponent implements OnInit {
  item_form: FormGroup;
  data: any;
  id: any;
  save = true;
  constructor(private rout: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get("itemId");
      console.log(this.id);
      if (isNaN(this.id)) {
        this.data = {
          Category: null,
          Name: null,
          Total_kg: null,
          Price_kg: null,
          Total_price: null,
          Exp_date: null
        };
      } else {
        this.data = items[this.id];
      }
    });
    this.item_form = new FormGroup({
      Category: new FormControl(this.data.Category, Validators.required),
      Name: new FormControl(this.data.Name, Validators.required),
      Total_kg: new FormControl(this.data.Total_kg, Validators.required),
      Price_kg: new FormControl(this.data.Price_kg, Validators.required),
      Exp_date: new FormControl(this.data.Exp_date, Validators.required)
    });
  }
  get Category() {
    return this.item_form.get("Category");
  }
  get Name() {
    return this.item_form.get("Name");
  }
  get Total_kg() {
    return this.item_form.get("Total_kg");
  }
  get Price_kg() {
    return this.item_form.get("Price_kg");
  }
  get Exp_date() {
    return this.item_form.get("Exp_date");
  }
  Onsubmit() {
    this.data = this.item_form.value;
    if (
      this.data.Category == null ||
      this.data.Name == null ||
      this.data.Total_kg == null ||
      this.data.Exp_date == null ||
      this.data.Price_kg == null
    ) {
      console.log("Not Work");
      this.save = false;
      return;
    } else {
      this.save = true;
    }
    this.data.Total_price = this.data.Total_kg * this.data.Price_kg;
    if (isNaN(this.id)) {
      items.push(this.data);
    } else {
      items.splice(this.id, 1, this.data);
    }
    console.log(this.data);
    this.rout.navigate(["/"]);
  }
}
