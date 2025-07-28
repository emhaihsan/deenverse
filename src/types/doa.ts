// types/doa.ts
export interface Doa {
    id: number;
    grup: string;
    nama: string;
    ar: string;
    tr: string;
    idn: string;
    tentang: string;
    tag: string[];
  }
  
  export interface DoaListResponse {
    status: string;
    total: number;
    data: Doa[];
  }
  
  export interface DoaDetailResponse {
    status: string;
    data: Doa;
  }