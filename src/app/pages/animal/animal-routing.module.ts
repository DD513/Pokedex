import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalPlanetComponent } from "./animal-planet/animal-planet.component";

const routes: Routes = [{ path: "", component: AnimalPlanetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalRoutingModule {}
