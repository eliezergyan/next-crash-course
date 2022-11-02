import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'

const ArticleItem = ({article}) => {
  return (
    <Link href='/article/[id]' as={`/article/${article.id}`} legacyBehavior>
        <a className={articleStyles.card}>
            <h3>{article.title} &rarr;</h3>
            <p>{article.excerpt}</p>
            {/* <p>author: {article?.author}</p>
            <p>date: {article?.dateCreated}</p> */}
        </a>
    </Link>
  )
}

export default ArticleItem