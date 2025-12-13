import { useEffect, useState } from "react";
import DateSelector from "./DateSelector";
import ProvinceSelector from "./ProvinceSelector";
import TheaterShowtimes from "./TheaterShowtimes";
import { provinceService } from "../../services/showtime/provinceService";
import { showtimeService } from "../../services/showtime/showtimeService";
import type { Province } from "../..//types/province";
import type { TheaterShowtime } from "../../types/showtime";

export default function ShowtimeSection({ movieId }: { movieId: string }) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [provinceId, setProvinceId] = useState<string>();
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [data, setData] = useState<TheaterShowtime[]>([]);

  useEffect(() => {
    provinceService.getAll().then(setProvinces);
  }, []);

  useEffect(() => {
    if (!provinceId) 
      {
        setData([]);
        return;
      }

    showtimeService
      .filterByAll(provinceId, movieId, date)
      .then(setData)
      .catch(err => {
      console.error(err);
      setData([]);
    });
  }, [provinceId, date, movieId]);

  return (
    <section className="p-6 rounded-xl mt-10">
      <h2 className="text-white text-4xl text-center font-extrabold mb-10">LỊCH CHIẾU</h2>

      <DateSelector selectedDate={date} onChange={setDate} />

      <div className="flex items-center justify-between mt-4">
        {/* Bên trái */}
        <h3 className="text-white text-3xl font-bold">
          DANH SÁCH RẠP
        </h3>

        {/* Bên phải */}
        <ProvinceSelector
          provinces={provinces}
          value={provinceId}
          onChange={setProvinceId}
        />
      </div>

      <div className="mt-6">
        <TheaterShowtimes data={data} />
      </div>
    </section>
  );
}
