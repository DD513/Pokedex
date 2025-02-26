export interface PokemonDictionaryUrlResponse {
  results: PokemonDictionaryUrlEntry[];
}

export interface PokemonDictionaryUrlEntry {
  name: string;
  url: string;
}

export interface PokemonNameTranslations {
  englishName: string;
  japaneseName: string;
  koreanName: string;
  traditionalChineseName: string;
  simplifiedChineseName: string;
}

export interface PokemonDictionaryEntry {
  name?: string;
  url?: string;
  speciesName?: string;
  speciesUrl?: string;
  imageUrl?: string;
  names?: PokemonNameTranslations;
}
