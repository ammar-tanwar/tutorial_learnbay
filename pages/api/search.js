import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  let posts;
  const { q } = req.body;

  if (process.env.NODE_ENV === "production") {
    // @todo - fetch rom cache
  } else {
    const files = fs.readdirSync(path.join("posts/Topic"));
    posts = files.map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("posts/Topic", filename),
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
      title.toLowerCase().indexOf(q) != -1 ||
      category.toLowerCase().indexOf(q) != -1 ||
      tag.toLowerCase().indexOf(q) != -1
  );

  res.status(200).send(results);
}
