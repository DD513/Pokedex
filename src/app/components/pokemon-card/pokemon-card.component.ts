import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Pokemon } from "../../core/models/pokemon.model";
import { PokemonService } from "../../core/services/pokemon.service";

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.css"],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  @Input() isFavorite: boolean = false;
  @Output() toggleFavorite: EventEmitter<Pokemon> = new EventEmitter();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {}

  onToggleFavorite() {
    this.toggleFavorite.emit(this.pokemon);
  }

  // 獲取寶可夢類型顏色
  getTypeColor(type: string): string {
    return this.pokemonService.getTypeColor(type);
  }
}
