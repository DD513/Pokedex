import { Component, OnInit, Input } from "@angular/core";
import { TravelFood } from "../../../../core/models/travel-food.model";

@Component({
  selector: "app-travel-food-card",
  templateUrl: "./travel-food-card.component.html",
  styleUrls: ["./travel-food-card.component.css"],
})
export class TravelFoodCardComponent implements OnInit {
  @Input() travelFoodItem!: TravelFood;
  @Input() fallbackImage: string = "";

  constructor() {}

  ngOnInit() {}

  get foodImage(): string {
    return this.travelFoodItem.PicURL &&
      this.travelFoodItem.PicURL !== "Not Found"
      ? this.travelFoodItem.PicURL
      : this.fallbackImage;
  }
}
