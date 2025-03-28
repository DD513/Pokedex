import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AnimalRoutingModule } from "./animal-routing.module";
import { AnimalPlanetComponent } from "./animal-planet/animal-planet.component";

@NgModule({
  declarations: [AnimalPlanetComponent],
  imports: [CommonModule, HttpClientModule, AnimalRoutingModule],
})
export class AnimalModule {}
