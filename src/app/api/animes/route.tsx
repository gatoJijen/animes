import { NextResponse } from 'next/server';
import animeData from '@/data/catalog.json';

export async function GET() {
  return NextResponse.json(animeData);
}
