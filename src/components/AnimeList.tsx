"use client"
import React, { useEffect, useState } from 'react'

type Capitulo = {
  capitulo: string;
  audio: string;
  url: string;
};

type AnimeData = {
  [anime: string]: {
    [season: string]: Capitulo[];
  };
};

export default function AnimeList() {
  const [animes, setAnimes] = useState<AnimeData>({});

  useEffect(() => {
    const fetchAnimes = async () => {
      const res = await fetch('/api/animes');
      const data = await res.json();
      setAnimes(data);
    };

    fetchAnimes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Animes disponibles</h1>
      {Object.entries(animes).map(([animeTitle, seasons]) => (
        <div key={animeTitle} className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600">{animeTitle}</h2>
          {Object.entries(seasons).map(([season, episodes]) => (
            <div key={season} className="ml-4 mt-3">
              <h3 className="font-bold  text-white text-lg">Temporada {season}</h3>
              <ul className="ml-6 mt-2 space-y-2">
                {episodes.map((ep, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-black justify-between bg-gray-100 p-3 rounded-lg"
                  >
                    <span>
                      <strong>Capítulo {ep.capitulo}</strong> ({ep.audio})
                    </span>
                    <a
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      Descargar
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}