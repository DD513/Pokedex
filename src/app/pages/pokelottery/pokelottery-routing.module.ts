import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokelotteryComponent } from "./pokelottery.component";

const routes: Routes = [
  { path: "", component: PokelotteryComponent }, // `/pokelottery`
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokelotteryRoutingModule {}
