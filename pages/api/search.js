import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  let posts;
  const {q} = JSON.parse(req.body);
  console.log(q);
  if (process.env.NODE_ENV === "production") {
    // @todo - fetch rom cache
  } else {
    const files = fs.readdirSync(path.join("posts"));
    posts = files.map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);
      return {
        frontmatter,
      };
    });
  }


  const results = posts.filter(
    ({ frontmatter: { title, category, tag } }) =>
    console.log(title.toLowerCase().indexOf(q)) ||
      title.toLowerCase().indexOf(q) != -1 ||
      category.toLowerCase().indexOf(q) != -1 ||
      tag.toLowerCase().indexOf(q) != -1
  )
console.log(results);
  res.status(200).json(JSON.stringify({ results }))
}
