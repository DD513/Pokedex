import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TravelFoodComponent } from "./travel-food.component";

const routes: Routes = [{ path: "", component: TravelFoodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelFoodRoutingModule {}
