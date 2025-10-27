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
}
