import ArticleItem from './ArticleItem'
import articleStyles from '../styles/Article.module.css'
import Header from './Header'
const ArticleList = ({articles}) => {
  return (
    <>
    <Header />
    <div className={articleStyles.grid}>
      {articles.map((article) => (
          <ArticleItem key={article.id} article={article}/>
      ))}
    </div>
    </>
  )
}

export default ArticleList