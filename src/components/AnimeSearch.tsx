'use client';

import { useEffect, useState } from 'react';

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

export default function AnimeSearch() {
    const [animes, setAnimes] = useState<AnimeData>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [openAnime, setOpenAnime] = useState<string | null>(null); // guarda el anime abierto

    const [openPart, setOpenPart] = useState<string | null>(null); // guarda el anime abierto

    useEffect(() => {
        const fetchAnimes = async () => {
            const res = await fetch('/api/animes');
            const data = await res.json();
            setAnimes(data);
        };

        fetchAnimes();
    }, []);

    const filteredAnimes = Object.entries(animes).filter(([title]) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleAnime = (animeTitle: string) => {
        setOpenAnime((prev) => (prev === animeTitle ? null : animeTitle));
    };
    const togglePart = (part: string) => {
        setOpenPart((prev) => (prev === part ? null : part));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Buscar Animes</h1>
            <input
                type="text"
                placeholder="Escribe el nombre del anime..."
                className="w-full p-2 mb-6 border rounded text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredAnimes.length === 0 ? (
                <p className="text-gray-500">No se encontraron animes con ese nombre.</p>
            ) : (
                filteredAnimes.map(([animeTitle, seasons]) => (
                    <div key={animeTitle} className="mb-8">
                        <h2
                            onClick={() => toggleAnime(animeTitle)}
                            className="text-xl cursor-pointer font-semibold text-blue-600 hover:underline"
                        >
                            {animeTitle}
                        </h2>

                        {openAnime === animeTitle && (
                            <div className="mt-2">
                                {Object.entries(seasons).map(([season, episodes]) => (
                                    <div key={season} className="ml-4 mt-3">
                                        <h3 onClick={() => togglePart(season)} className="font-medium cursor-pointer hover:underline text-lg text-gray-400">Part {season}</h3>
                                        {openPart === season && (
                                            <ul className="ml-6 mt-2 space-y-2">
                                                {episodes.map((ep, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-center justify-between bg-gray-100 text-black p-3 rounded-lg"
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
                                        )}

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
