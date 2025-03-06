import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Pokemon } from "../../../../../core/models/pokemon.model";
import { PokemonService } from "../../../../../core/services/pokemon.service";
import { IMAGE_PATHS } from "../../../../../core/constants/image-paths";

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.css"],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  @Input() isFavorite: boolean = false;
  @Output() toggleFavorite: EventEmitter<Pokemon> = new EventEmitter();

  // 🔹 圖片路徑
  favoriteFilled = IMAGE_PATHS.FAVORITE_FILLED;
  favoriteOutline = IMAGE_PATHS.FAVORITE_OUTLINE;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {}

  /**
   * 切換寶可夢的收藏狀態
   */
  toggleFavoriteStatus(): void {
    this.toggleFavorite.emit(this.pokemon);
  }

  /**
   * 根據寶可夢類型獲取對應顏色
   */
  getTypeColor(type: string): string {
    return this.pokemonService.getTypeColor(type);
  }
}
