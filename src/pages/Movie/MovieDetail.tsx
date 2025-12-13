import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosterUrl } from "../../utils/getPosterUrl";
import { formatCountry, formatAge, formatDate } from "../../utils/format";
import { movieService } from "../../services/movie/movieService";
import type { MovieDetail } from "../../types/movie";
import ShowtimeSection from "../../components/showtime/ShowtimeSelection";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy thông tin phim 
  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await movieService.getMovieDetail(id);
        setMovie(res);
      } catch (err) {
        console.error(err);
        setError("Không thể tải thông tin phim.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Loading
  if (loading)
    return (
        <div className="text-center text-white mt-20">Đang tải...</div>
    );

  // Error
  if (error)
    return (
        <div className="text-center text-red-400 mt-20">{error}</div>
    );

  // Nếu không tìm thấy phim
  if (!movie)
    return (
        <div className="text-center text-gray-400 mt-20">Không tìm thấy phim.</div>
    );

  return (
      <main className="max-w-6xl mx-auto px-4 text-white pt-20 md:pt-24 pb-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-[350px] lg:w-[400px] flex-shrink-0 mx-auto md:mx-0">
            <img
              src={getPosterUrl(movie.posterUrl)}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Thông tin phim */}
          <div className="flex-1 flex flex-col">
            {/* Tên phim */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
              {movie.title}
            </h1>
            <div className="space-y-2 text-base md:text-lg">
              {/* Thể loại */}
              <p>
                <span className="font-bold">🎭 Thể loại:</span>{" "}
                {Array.isArray(movie.genres)
                    ? movie.genres.join(", ")
                    : movie.genres || "N/A"}
              </p>

              {/* Thời lượng */}
              <p><span className="font-bold">⏱ Thời lượng:</span> {movie.time}’</p>

              {/* Ngôn ngữ */}
              <p>
                <span className="font-bold">🗣 Ngôn ngữ:</span>{" "}
                {Array.isArray(movie.spokenLanguages)
                    ? movie.spokenLanguages.join(", ")
                    : movie.spokenLanguages || "N/A"}
              </p>

              {/* Quốc gia*/}
              <p>
                <span className="font-bold">🌍 Quốc gia:</span>{" "}
                {formatCountry(movie.country)}
              </p>

              {/* Độ tuổi */}
              <p>
                <span className="font-bold">🔞 Độ tuổi:</span>{" "}
                {formatAge(movie.age)}
              </p>

              {/* Ngày phát hành */}
              <p>
                <span className="font-bold">📅 Ngày phát hành:</span>{" "}
                {formatDate(movie.releaseDate)}
              </p>
            </div>

            {/* Nội dung phim */}
            <div className="mt-6">
              <h2 className="text-lg md:text-xl font-bold mb-2">📖 Nội dung phim</h2>
              <p className="text-justify leading-relaxed">{movie.overview}</p>
            </div>

            {/* Đạo diễn */}
            {movie.crew && (
            <div className="mt-6">
                <h2 className="text-lg md:text-xl font-bold mb-2">🎬 Đạo diễn</h2>
                <p>
                {Array.isArray(movie.crew)
                    ? movie.crew.join(", ")
                    : movie.crew || "N/A"}
                </p>
            </div>
            )}

            {/* Diễn viên */}
            {movie.cast && (
            <div className="mt-6">
                <h2 className="text-lg md:text-xl font-bold mb-2">⭐ Diễn viên</h2>
                <p>
                {Array.isArray(movie.cast)
                    ? movie.cast.join(", ")
                    : movie.cast || "N/A"}
                </p>
            </div>
            )}

            {/* Trailer */}
            {movie.trailer && (
            <div className="mt-8">
                <h2 className="text-lg md:text-xl font-bold mb-4">📺 Trailer</h2>
                <div className="aspect-video">
                <iframe
                    src={
                    movie.trailer.includes("watch?v=")
                        ? movie.trailer.replace("watch?v=", "embed/")
                        : movie.trailer
                    }
                    title="Trailer"
                    allowFullScreen
                    className="w-full h-full rounded-xl shadow-lg"
                />
                </div>
            </div>
            )}
          </div>
        </div>

        {/* Thông tin phim */}
        {id && <ShowtimeSection movieId={id} />}
      </main>
  );
}
