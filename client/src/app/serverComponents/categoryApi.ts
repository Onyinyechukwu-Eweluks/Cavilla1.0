const url = "http://localhost:4000/categories";
export interface CategoryData {
  id: number;
  name: String;
}

export async function getCategory() {
  try {
    const data = await fetch(url);
    const res = await data.json();
    if (!res) {
      return "No data found";
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}
