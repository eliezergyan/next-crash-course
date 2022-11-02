import Meta from '../../../components/Meta'
import {server} from '../../../config/index'
import Link from "next/link"


const Article = ({article}) => {

  return (
    <>  
        <Meta title={article.title} description={article.excerpt}/>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <br />
        <div>Comments</div>
        <textarea cols={60} rows={5}></textarea>
        <button>Comment</button>
        <br />
        <Link href='/' legacyBehavior>Go Back</Link>
    </>
  )
}


export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/articles/${context.params.id}`)

    const article = await res.json()

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/articles`)

    const articles = await res.json()

    const ids = articles.map(article => article.id)

    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}




export default Article