import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "../../models/pokemon.model";

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
    this.lotteryResult = this.pokemonService.getRandomPokemon(); // 立即顯示第一隻寶可夢
    this.gameCount = 1; // 遊戲次數從 1 開始
  }

  // drawLottery() {
  //   this.lotteryResult = null; // 清空當前結果，讓 UI 顯示"載入中..."
  //   setTimeout(() => {
  //     this.lotteryResult = this.pokemonService.getRandomPokemon();
  //     this.gameCount++;
  //   }, 1000); // 模擬抽獎延遲
  // }
  drawLottery() {
    if (this.isDrawing) return; // 如果正在抽獎，直接返回，避免重複點擊

    this.isDrawing = true; // 設置狀態，開始抽獎
    this.lotteryResult = null; // 清空當前結果，讓 UI 顯示"載入中..."

    setTimeout(() => {
      this.lotteryResult = this.pokemonService.getRandomPokemon();
      this.gameCount++;
      this.isDrawing = false; // 抽獎結束，解除冷卻狀態
    }, 1000); // 1 秒冷卻時間
  }
}
