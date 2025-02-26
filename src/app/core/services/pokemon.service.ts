import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { Pokemon } from "../models/pokemon.model";
import {
  PokemonDictionaryEntry,
  PokemonDictionaryUrlResponse,
} from "../models/pokemon-dictionary.model";
import { POKEMON_DATA } from "../data/pokemon.data";
import { ApiService } from "./api.service";
import {
  PokemonType,
  PokemonTypeColors,
} from "../constants/enums/pokemon-type.enum";

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

  // Pokemon Dictionary
  // 取得完整的寶可夢字典（包含名稱、圖片、多語言分類）
  // 這邊選擇SwitchMap，因為這些 API 有依賴關係，完成後才能進行下一個，而不是同時進行。mergeMap適用於同時進行的請求，concatMap適用於順序進行的請求。
  getFullPokemonDictionary(
    limit: number = 10
  ): Observable<PokemonDictionaryEntry[]> {
    return this.getPokemonDictionaryUrlList(limit).pipe(
      switchMap(
        (urlListResponse) => this.getPokemonSpeciesAndSprites(urlListResponse) // 取得物種資訊和圖片
      ),
      switchMap(
        (speciesAndSpritesList) => this.getPokemonNames(speciesAndSpritesList) // 取得多語言分類名稱
      )
    );
  }

  // 取得寶可夢字典的URL列表
  private getPokemonDictionaryUrlList(
    limit: number = 10
  ): Observable<PokemonDictionaryEntry[]> {
    return this.apiService.getPokemonUrlList(limit).pipe(
      map((response: PokemonDictionaryUrlResponse) =>
        response.results.map((pokemon) => ({
          pokemonName: pokemon.name,
          url: pokemon.url,
          speciesName: "",
          speciesUrl: "",
          imageUrl: "",
          names: {
            englishName: "",
            japaneseName: "",
            koreanName: "",
            traditionalChineseName: "",
            simplifiedChineseName: "",
          },
        }))
      )
    );
  }

  // 取得寶可夢物種和圖片(species, sprites)
  private getPokemonSpeciesAndSprites(
    pokemonList: PokemonDictionaryEntry[]
  ): Observable<PokemonDictionaryEntry[]> {
    return forkJoin(
      // forkJoin 同時發送多個請求，等待所有請求完成後再返回。 combineLastest 是持續監聽，會發送最新的值。 zip 是同時進行，當所有 Observable 都有對應數據時才發送，適合一對一數據匹配。
      pokemonList.map((pokemon) =>
        this.apiService.getPokemonDetails(pokemon.url).pipe(
          map((data) => ({
            ...pokemon,
            speciesName: data.species.name,
            speciesUrl: data.species.url,
            imageUrl: data.sprites.front_default,
          }))
        )
      )
    );
  }

  // 取得寶可夢的多語言分類名稱
  private getPokemonNames(
    pokemonList: PokemonDictionaryEntry[]
  ): Observable<PokemonDictionaryEntry[]> {
    // console.log("speciesAndSpritesList", pokemonList);
    return forkJoin(
      pokemonList.map((pokemon) =>
        this.apiService.getPokemonSpeciesDetails(pokemon.speciesUrl).pipe(
          map((response) => ({
            ...pokemon,
            names: {
              englishName: this.extractNames(response.names, "en"),
              japaneseName: this.extractNames(response.names, "ja"),
              koreanName: this.extractNames(response.names, "ko"),
              traditionalChineseName: this.extractNames(
                response.names,
                "zh-Hant"
              ),
              simplifiedChineseName: this.extractNames(
                response.names,
                "zh-Hans"
              ),
            },
          }))
        )
      )
    );
  }

  // 提取指定語言的分類名稱
  private extractNames(namesList: any[], languageCode: string): string {
    const namesObj = namesList.find((g) => g.language.name === languageCode);
    return namesObj ? namesObj.name : "undefined"; // 若找不到則返回 "undefined"
  }
}
