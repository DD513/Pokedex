import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { TravelFoodComponent } from "./travel-food.component";
import { TravelFoodCardComponent } from "./components/travel-food-card/travel-food-card.component";
import { TravelFoodRoutingModule } from "./travel-food-routing.module";

@NgModule({
  declarations: [TravelFoodComponent, TravelFoodCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TravelFoodRoutingModule,
  ],
  exports: [TravelFoodComponent, TravelFoodCardComponent],
})
export class TravelFoodModule {}
