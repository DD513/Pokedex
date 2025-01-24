import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../../models/pokemon.model";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-pokedex",
  templateUrl: "./pokedex.component.html",
  styleUrls: ["./pokedex.component.css"],
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getAllPokemon();
  }
}
