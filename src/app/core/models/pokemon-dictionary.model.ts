export interface PokemonDictionaryUrlResponse {
  results: { name: string; url: string }[];
}

export interface PokemonDictionaryEntry {
  results?: { name: string; url: string };
  img?: string;
  englishName?: string;
  chineseName?: string;
  simplifiedChineseName?: string;
  koreanName?: string;
  japaneseName?: string;
}
