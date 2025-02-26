import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { POKEMON_DATA } from "../data/pokemon.data";
import { ApiService } from "./api.service";
import {
  PokemonType,
  PokemonTypeColors,
} from "../constants/enums/pokemon-type.enum";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pokemonData: Pokemon[] = POKEMON_DATA;
  private favoritePokemonCodes: Set<string> = new Set();
  private favoritesSubject = new BehaviorSubject<Set<string>>(new Set()); // 讓 PokedexComponent 可以訂閱收藏變化

  constructor(private apiService: ApiService) {
    this.loadFavorites();
  }

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

  // 隨機抽取一隻寶可夢
  getRandomPokemon(): Pokemon {
    const randomIndex = Math.floor(Math.random() * this.pokemonData.length);
    return this.pokemonData[randomIndex];
  }

  // 讀取收藏的寶可夢 (從 localStorage)
  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem("favoritePokemon");
    if (storedFavorites) {
      try {
        this.favoritePokemonCodes = new Set(JSON.parse(storedFavorites));
        this.favoritesSubject.next(this.favoritePokemonCodes);
      } catch (error) {
        console.error("無法解析收藏紀錄", error);
        this.favoritePokemonCodes.clear();
      }
    }
  }

  // 檢查是否已收藏
  checkIsFavorite(pokemon: Pokemon): boolean {
    return this.favoritePokemonCodes.has(pokemon.Code);
  }

  // 切換收藏狀態
  toggleFavorite(pokemon: Pokemon): void {
    const isFavorite = this.favoritePokemonCodes.has(pokemon.Code);
    isFavorite
      ? this.favoritePokemonCodes.delete(pokemon.Code)
      : this.favoritePokemonCodes.add(pokemon.Code);

    if (!isFavorite) {
      localStorage.setItem(
        "favoritePokemon",
        JSON.stringify([...this.favoritePokemonCodes])
      );
    } else {
      localStorage.removeItem("favoritePokemon"); // 🔹 若全部刪除則清空 localStorage
    }

    this.favoritesSubject.next(this.favoritePokemonCodes);
  }

  // 取得所有收藏的寶可夢
  getFavoritePokemon(): Pokemon[] {
    return this.pokemonData.filter((pokemon) =>
      this.favoritePokemonCodes.has(pokemon.Code)
    );
  }

  // 監聽收藏狀態變化
  getFavoritesObservable(): Observable<Set<string>> {
    return this.favoritesSubject.asObservable();
  }

  // 清空收藏
  clearFavorites(): void {
    this.favoritePokemonCodes.clear();
    localStorage.removeItem("favoritePokemon");
    this.favoritesSubject.next(new Set());
  }

  // 寶可夢類型顏色對應
  getTypeColor(type: string): string {
    // 轉換 `string` → `PokemonType`
    const pokemonType = Object.values(PokemonType).find((t) => t === type);

    return pokemonType ? PokemonTypeColors[pokemonType] : "#FFCB05";
  }

  // 取得寶可夢字典的URL列表
  getPokemonDictionaryUrlList(limit: number = 10): Observable<any> {
    return this.apiService.getPokemonUrlList(limit);
  }

  // 取得寶可夢物種和圖片
  getPokemonSpeciesAndSprites(
    pokemonDictionaryResultList: any[]
  ): Observable<any[]> {
    return this.apiService.getPokemonSpeciesAndSprites(
      pokemonDictionaryResultList
    );
  }

  // 取得寶可夢的多語言分類名稱
  getPokemonGeneraNames(pokemonDictionaryList: any[]): Observable<any[]> {
    return this.apiService.getPokemonGeneraNames(pokemonDictionaryList);
  }
}
