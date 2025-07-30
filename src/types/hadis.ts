// types/hadis.ts

export interface HadisBook {
  name: string;
  id: string;
  available: number;
}

export interface HadisContent {
  number: number;
  arab: string;
  id: string; // Indonesian translation
}

export interface HadisResponse {
  code: number;
  message: string;
  data: HadisBook[];
  error: boolean;
}

export interface HadisRangeResponse {
  code: number;
  message: string;
  data: {
    name: string;
    id: string;
    available: number;
    requested: number;
    hadiths: HadisContent[];
  };
  error: boolean;
}

export interface HadisSpecificResponse {
  code: number;
  message: string;
  data: {
    name: string;
    id: string;
    available: number;
    contents: HadisContent;
  };
  error: boolean;
}
