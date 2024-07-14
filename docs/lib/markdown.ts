import path from 'node:path'
import { promises as fs } from 'node:fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import { visit } from 'unist-util-visit'
import { page_routes } from './routes-config'

// custom components imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Pre from '@/components/pre'

interface MdxFrontmatter {
  title: string
  description: string
}

// add custom components
const components = {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  pre: Pre,
}

export async function getMarkdownForSlug(slug: string) {
  try {
    const contentPath = getContentPath(slug)
    const rawMdx = await fs.readFile(contentPath, 'utf-8')
    return await compileMDX<MdxFrontmatter>({
      source: rawMdx,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            preProcess,
            rehypeCodeTitles,
            rehypePrism,
            rehypeSlug,
            rehypeAutolinkHeadings,
            postProcess,
          ],
          remarkPlugins: [remarkGfm],
        },
      },
      components,
    })
  }
  catch (err) {
    console.warn(err)
  }
}

export async function getTocs(slug: string) {
  const contentPath = getContentPath(slug)
  const rawMdx = await fs.readFile(contentPath, 'utf-8')
  // captures between ## - #### can modify accordingly
  const headingsRegex = /^(#{2,4})\s(.+)$/gm
  const extractedHeadings = []
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const headingLevel = match[1].length
    const headingText = match[2].trim()
    const slug = sluggify(headingText)
    extractedHeadings.push({
      level: headingLevel,
      text: headingText,
      href: `#${slug}`,
    })
  }
  return extractedHeadings
}

export function getPreviousNext(path: string) {
  const index = page_routes.findIndex(({ href }) => href === path)
  return {
    prev: page_routes[index - 1],
    next: page_routes[index + 1],
  }
}

function sluggify(text: string) {
  const slug = text.toLowerCase().replace(/\s+/g, '-')
  return slug.replace(/[^a-z0-9-]/g, '')
}

function getContentPath(slug: string) {
  // eslint-disable-next-line node/prefer-global/process
  return path.join(process.cwd(), '/contents/docs/', `${slug}.mdx`)
}

// for copying the code
function preProcess() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node?.type === 'element' && node?.tagName === 'pre') {
        const [codeEl] = node.children
        if (codeEl.tagName !== 'code')
          return
        node.raw = codeEl.children?.[0].value
      }
    })
  }
}

function postProcess() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node?.type === 'element' && node?.tagName === 'pre') {
        node.properties.raw = node.raw
      // console.log(node);
      }
    })
  }
}
