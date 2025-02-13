import { Component, Input } from "@angular/core";
import { Pokemon } from "../../../../core/models/pokemon.model";
import { PokemonService } from "../../../../core/services/pokemon.service";

@Component({
  selector: "app-lottery-result",
  templateUrl: "./lottery-result.component.html",
  styleUrls: ["./lottery-result.component.css"],
})
export class LotteryResultComponent {
  @Input() lotteryResult: Pokemon | null = null;
  @Input() isDrawing: boolean = false; // 用來顯示 loading 狀態

  constructor(private pokemonService: PokemonService) {}

  // 獲取寶可夢類型顏色
  getTypeColor(type: string): string {
    return this.pokemonService.getTypeColor(type);
  }
}
