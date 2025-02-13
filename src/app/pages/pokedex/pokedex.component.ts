import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../../core/models/pokemon.model";
import { PokemonService } from "../../core/services/pokemon.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-pokedex",
  templateUrl: "./pokedex.component.html",
  styleUrls: ["./pokedex.component.css"],
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];

  private searchSubject: Subject<string> = new Subject<string>(); // RxJS Subject

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getAllPokemon();
    this.filteredPokemonList = [...this.pokemonList];

    // 訂閱防抖搜尋事件
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.filteredPokemonList = this.pokemonService.searchPokemon(query);
    });
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }
}
