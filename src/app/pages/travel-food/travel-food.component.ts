import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../core/services/api.service";

@Component({
  selector: "app-travel-food",
  templateUrl: "./travel-food.component.html",
  styleUrls: ["./travel-food.component.css"],
})
export class TravelFoodComponent implements OnInit {
  travelFoodData: any[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTravelFoodData().subscribe((data) => {
      this.travelFoodData = data;
    });
  }
}
