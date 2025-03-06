import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { PokelotteryComponent } from "./pokelottery.component";
import { LotteryResultComponent } from "./components/lottery-result/lottery-result.component";
import { PokelotteryRoutingModule } from "./pokelottery-routing.module";

@NgModule({
  declarations: [PokelotteryComponent, LotteryResultComponent],
  imports: [CommonModule, FormsModule, PokelotteryRoutingModule],
  exports: [PokelotteryComponent],
})
export class PokelotteryModule {}
