import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokelotteryComponent } from "./pokelottery.component";
import { LotteryResultComponent } from "./components/lottery-result/lottery-result.component";

@NgModule({
  declarations: [PokelotteryComponent, LotteryResultComponent],
  imports: [CommonModule],
  exports: [PokelotteryComponent],
})
export class PokelotteryModule {}
