import {useState, useEffect} from "react";

const GameCard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=f1bc84f17256489a84bd0d318a22c0d3&dates=2023-01-01,2023-12-31&platforms=18,1,7&page_size=8`
        );
        const data = await response.json();
        setGames(data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchGames();
  }, []);
  if (loading) return (
    <div className="text-center text-3xl mt-3 font-semibold text-gray-900 sm:text-2xl">
      Cargando juegos...
    </div>
  );
  if (error) return <div className="text-red-500 text-3xl font-semibold p-8 sm:text-2xl">Error: {error}</div>;

  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <div
          key={game.id}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-56 w-full">
              <img
                className="mx-auto h-full w-full object-cover rounded-t-lg"
                src={
                  game.background_image ||
                  "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                }
                alt={game.name}
                // loading="eager"
              />
          </div>
          <div className="pt-6">
            <h3 className="text-lg font-semibold leading-tight text-gray-900">
              {game.name}
            </h3>
            <ul className="mt-2 flex items-center gap-4 flex-wrap">
              {game.genres.slice(0, 2).map((genre) => (
                <li key={genre.id} className="flex items-center gap-2">
                  <p
                    className="text-sm font-medium text-gray-500 px-2 py-1.5 bg-purple-200 border border-gray-200 rounded-lg">
                    {genre.name}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center">
                {game.parent_platforms?.map(({platform}) => (
                  <span key={platform.id} className="mr-2 text-sm">
                    {platform.name === "PlayStation"
                      ? "PS"
                      : platform.name.slice(0, 3)}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 transition-colors">
                <svg
                  className="-ms-2 me-1 h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameCard;
