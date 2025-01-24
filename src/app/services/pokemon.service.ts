import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { POKEMON_DATA } from "../data/pokemon.data";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pokemonData: Pokemon[] = POKEMON_DATA;

  constructor() {}

  // 獲取所有寶可夢資料
  getAllPokemon(): Pokemon[] {
    return this.pokemonData;
  }

  // 根據編號查詢寶可夢
  getPokemonByCode(code: string): Pokemon | undefined {
    return this.pokemonData.find((pokemon) => pokemon.Code === code);
  }

  // 搜尋寶可夢
  searchPokemon(query: string): Pokemon[] {
    const lowerQuery = query.toLowerCase().trim();
    return this.pokemonData.filter(
      (pokemon) =>
        pokemon.ChineseName.toLowerCase().includes(lowerQuery) ||
        pokemon.EnglishName.toLowerCase().includes(lowerQuery) ||
        pokemon.Types.some((type) =>
          type.Name.toLowerCase().includes(lowerQuery)
        )
    );
  }
}
