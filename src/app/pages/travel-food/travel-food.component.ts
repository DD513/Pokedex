import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { TravelFood } from "../../core/models/travel-food.model";
import { IMAGE_PATHS } from "../../core/constants/image-paths";

@Component({
  selector: "app-travel-food",
  templateUrl: "./travel-food.component.html",
  styleUrls: ["./travel-food.component.css"],
})
export class TravelFoodComponent implements OnInit {
  travelFoodList: TravelFood[] = [];
  fallbackImage = IMAGE_PATHS.NO_TRAVEL_FOOD;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTravelFoodData().subscribe((data) => {
      this.travelFoodList = data;
    });
  }
}
