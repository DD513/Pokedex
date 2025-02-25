import { Component, OnInit, Input } from "@angular/core";
import { PokemonDictionaryEntry } from "../../../../core/models/pokemon-dictionary.model";

@Component({
  selector: "pokemon-dictionary-table",
  templateUrl: "./pokemon-dictionary-table.component.html",
  styleUrls: ["./pokemon-dictionary-table.component.css"],
})
export class PokemonDictionaryTableComponent implements OnInit {
  @Input() pokemonList: PokemonDictionaryEntry[] = [];

  constructor() {}

  ngOnInit() {}
}
