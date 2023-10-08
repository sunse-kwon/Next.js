import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'blogposts')

export function getSortedPostsData() {
    // get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // user gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
        }

        // combine the data with the id
        return blogPost
    });
    // Sort posts by date , ? 뒤에 return 1 if it is true, -1 if it false.
    return allPostsData.sort((a,b) => a.date < b.date ? 1 : -1);
}

export async function getPostData(id: string) {
    // read markdown file as string
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // user gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const blogPostWithHTML: BlogPost & { contentHtml: string} = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml,
    }

    return blogPostWithHTML
};
