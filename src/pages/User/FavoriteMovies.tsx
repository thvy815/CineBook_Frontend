import React, { useState } from "react";

interface FavoriteMovie {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  genre: string;
}

const FavoriteMovies: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([
    {
      id: "MV002",
      title: "Venom: The Last Dance",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/u5nY7pY2Y58o7dSM9cy6NclOV8V.jpg",
      releaseDate: "2025-09-30",
      genre: "Hành động, Khoa học viễn tưởng",
    },
  ]);

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className="flex-1 text-white">
      <h2 className="text-2xl font-bold mb-4 mt-3">PHIM YÊU THÍCH</h2>

      <div className="bg-white text-black p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Danh sách phim yêu thích</h3>

        {favorites.length === 0 ? (
          <p className="text-gray-500">Bạn chưa thêm phim nào vào danh sách yêu thích.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-3 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-base line-clamp-2">
                      {movie.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {movie.genre}
                    </p>
                    <p className="text-sm text-gray-500">
                      Phát hành: {movie.releaseDate}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(movie.id)}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded transition self-end"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
