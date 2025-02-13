import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../../core/services/pokemon.service";
import { Pokemon } from "../../core/models/pokemon.model";

@Component({
  selector: "app-pokelottery",
  templateUrl: "./pokelottery.component.html",
  styleUrls: ["./pokelottery.component.css"],
})
export class PokelotteryComponent implements OnInit {
  lotteryResult: Pokemon | null = null;
  gameCount: number = 0;
  isDrawing: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.startNewLottery(); // 直接顯示初始寶可夢
  }

  drawLottery() {
    if (this.isDrawing) return; // 如果正在抽獎，直接返回，避免重複點擊
    this.isDrawing = true;
    this.lotteryResult = null;

    setTimeout(() => {
      this.startNewLottery();
    }, 800);
  }

  private startNewLottery() {
    this.lotteryResult = this.pokemonService.getRandomPokemon();
    this.gameCount++;
    this.isDrawing = false;
  }
}
