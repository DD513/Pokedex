import { Component, OnInit, Input } from "@angular/core";
import { PokemonDictionaryEntry } from "../../../../../core/models/pokemon-dictionary.model";
import { IMAGE_PATHS } from "../../../../../core/constants/image-paths";

@Component({
  selector: "pokemon-dictionary-table",
  templateUrl: "./pokemon-dictionary-table.component.html",
  styleUrls: ["./pokemon-dictionary-table.component.css"],
})
export class PokemonDictionaryTableComponent implements OnInit {
  @Input() pokemonList: PokemonDictionaryEntry[] = [];
  @Input() isLoading: boolean = false;

  notFound = IMAGE_PATHS.POKEMON_DICTIONARY_NOT_FOUND;

  constructor() {}

  ngOnInit() {}
}
