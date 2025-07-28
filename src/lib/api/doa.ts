// lib/api/doa.ts
import { DoaListResponse, DoaDetailResponse } from "@/types/doa";

const API_BASE_URL = "https://equran.id/api";

export async function getDoaList(params?: {
  grup?: string;
  tag?: string;
}): Promise<DoaListResponse> {
  const query = new URLSearchParams();
  if (params?.grup) query.append("grup", params.grup);
  if (params?.tag) query.append("tag", params.tag);

  const res = await fetch(`${API_BASE_URL}/doa?${query.toString()}`);
  return res.json();
}

export async function getDoaById(id: number): Promise<DoaDetailResponse> {
  const res = await fetch(`${API_BASE_URL}/doa/${id}`);
  return res.json();
}