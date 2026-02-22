export interface GenerateNameRequest {
  surname: string;
  gender: "male" | "female" | "neutral";
}

export interface NameRecommendation {
  fullName: string;
  givenName: string;
  pinyin: string;
  source: {
    book: string;
    bookEn: string;
    chapter: string;
    chapterEn: string;
    originalText: string;
    translation: string;
  };
  meaning: string;
  meaningEn: string;
}

export interface GenerateNameResponse {
  names: NameRecommendation[];
}
