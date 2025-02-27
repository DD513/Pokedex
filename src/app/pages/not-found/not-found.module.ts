import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotFoundComponent } from "./not-found.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: NotFoundComponent }]),
  ],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
