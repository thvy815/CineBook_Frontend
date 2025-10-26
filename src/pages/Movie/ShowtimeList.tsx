// src/pages/Movie/ShowtimeList.tsx
import React from "react";
import Layout from "../../components/layout/Layout";
import DateDropdown from "../../components/shared/ShowTime/DateDropdown";
import MovieDropdown from "../../components/shared/ShowTime/MovieDropdown";
import CinemaDropdown from "../../components/shared/ShowTime/CinemaDropdown";
import { useShowtimeSelector } from "../../hooks/ShowTime/useShowtimeSelector";

const ShowtimeList: React.FC = () => {
    const {
        loading,
        selectedDate,
        selectedMovieId,
        selectedCinemaId,
        availableDates,
        availableMovies,
        availableCinemas,
        showtimesResult,
        onSelectDate,
        onSelectMovie,
        onSelectCinema,
        clearAll,
    } = useShowtimeSelector();

    return (
        <Layout>
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <DateDropdown options={availableDates} value={selectedDate} onChange={onSelectDate} />
                    <MovieDropdown options={availableMovies} value={selectedMovieId} onChange={onSelectMovie} />
                    <CinemaDropdown options={availableCinemas} value={selectedCinemaId} onChange={onSelectCinema} />
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Kết quả ({showtimesResult.length})</h3>
                        <button onClick={clearAll} className="text-sm text-blue-600 underline">Reset</button>
                    </div>

                    {/*{loading ? (*/}
                    {/*    <p>Loading...</p>*/}
                    {/*) : showtimesResult.length === 0 ? (*/}
                    {/*    <p className="text-gray-500 mt-4">Chưa có kết quả. Hãy chọn ít nhất một trường.</p>*/}
                    {/*)};*/}
                    {/*//: (*/}
                    {/*//    //<div className="mt-4 space-y-4">*/}
                    {/*//    //    {showtimesResult.map((s:string) => (*/}
                    {/*//    //        <div key={s.id} className="p-4 border rounded flex items-center justify-between bg-white">*/}
                    {/*//    //            <div>*/}
                    {/*//    //                <div className="font-semibold">{s.movieTitle} — {s.time}</div>*/}
                    {/*//    //                <div className="text-sm text-gray-500">{s.cinemaName} • {s.date}</div>*/}
                    {/*//    //            </div>*/}
                    {/*//    //            <div className="text-right">*/}
                    {/*//    //                <div className="text-lg font-bold">{s.price.toLocaleString()}đ</div>*/}
                    {/*//    //                <button className="mt-2 px-3 py-1 rounded bg-yellow-400 text-black">Đặt vé</button>*/}
                    {/*//    //            </div>*/}
                    {/*//    //        </div>*/}
                    {/*//    //    ))}*/}
                    {/*//    //</div>*/}
                    {/*////*/}
                    {/*//)}*/}
                </div>
            </div>
        </Layout>
    );
};

export default ShowtimeList;
