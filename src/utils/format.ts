// Format Title
export const formatTitle = (title: string) => {
  if (!title) return "";
  return title.replace(":", ":\n");
};

// Format Genres — nhận string[] | string | null | undefined → trả string
export const formatGenres = (genres: string[] | string | null | undefined): string => {
  if (!genres) return "N/A";
  if (Array.isArray(genres)) return genres.join(", ");
  if (typeof genres === "string") {
    // Nếu backend gửi "Action, Drama" thì cứ hiển thị luôn
    // (nếu muốn tách mảng thì: return genres.split(",").map(s => s.trim()).join(", "))
    return genres;
  }
  return "N/A";
};

// Format Spoken Language — đổi để “ăn” mọi kiểu và trả string cho JSX
import ISO6391 from "iso-639-1";
export function formatSpokenLanguages(langs: string[] | string | null | undefined): string {
  let arr: string[] = [];
  if (Array.isArray(langs)) arr = langs;
  else if (typeof langs === "string") arr = langs.split(",").map(s => s.trim());

  return arr.map(code => ISO6391.getName(code) || code).join(", ");
};

// Format quốc gia sang tiếng Việt
const countryMap: Record<string, string> = {
  vn: "Việt Nam",
  us: "Mỹ",
  uk: "Anh",
  fr: "Pháp",
  jp: "Nhật Bản",
  kr: "Hàn Quốc",
  cn: "Trung Quốc",
  id: "Indonesia",
  th: "Thái Lan",
  in: "Ấn Độ",
  ph: "Philippines",
  sg: "Singapore",
  my: "Malaysia",
  ca: "Canada",
  de: "Đức",
  it: "Ý",
  es: "Tây Ban Nha"
};

export const formatCountry = (code: string | null | undefined): string => {
  if (!code) return "N/A";
  const lower = code.toLowerCase();
  return countryMap[lower] || code.toUpperCase();
};

// Format độ tuổi: thêm dấu +
export const formatAge = (age: string | number | null | undefined): string => {
  if (!age) return "N/A";
  return `${age}+`;
};

import dayjs from "dayjs";

// 🗓️ Format ngày phát hành: dd/mm/yyyy
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  const date = dayjs(dateString);
  return date.isValid() ? date.format("DD/MM/YYYY") : "N/A";
};

