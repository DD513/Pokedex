import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AuthLayoutModule } from "./layout/auth-layout/auth-layout.module";
import { PokemonLayoutModule } from "./layout/pokemon-layout/pokemon-layout.module";

import { AuthService } from "./services/auth.service";
import { ApiService } from "./services/api.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    PokemonLayoutModule,
    AuthLayoutModule,
  ],
  exports: [PokemonLayoutModule, AuthLayoutModule],
  providers: [AuthService, ApiService],
})
export class CoreModule {
  // @Optional：找不到就給null，不報錯。 @Self：只找自己。 @SkipSelf：跳過自己從父層的 injector 開始找。 @Host：到 host element 之後就停下來，不要再找了。
  // 這邊使用@SkipSelf()檢查，確保 CoreModule 只會被 AppModule 載入一次。
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule 已經被載入，請勿重複載入！");
    }
  }
}
