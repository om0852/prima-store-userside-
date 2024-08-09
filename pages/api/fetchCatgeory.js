import Categories from "@/models/Category";

export default async function handler(req, res) {
  try {
    res.json(await Categories.find());
  } catch (error) {
    res.json(error.message);
  }
}
