import { useState } from 'react'
import { articles } from '../data'

const CreatePost = () => {
  const [postBody, setPostBody] = useState('')
  const [postHeading, setPostHeading] = useState('')

  const uniqueId = Date.now()

  const handleSubmit = (e) => {
    e.preventDefault()
    articles.push({ id: uniqueId, title: postHeading, body: postBody })
  }

  console.log(articles)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}
        >
          <label>Create A Post</label>
        </div>
        <br></br>
        <label>Heading</label>
        <div>
          <input
            type="text"
            size={108}
            onChange={(e) => setPostHeading(e.target.value)}
          ></input>
        </div>
        <br></br>
        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          rows={30}
          cols={100}
        />
        <div style={{textAlign: 'center'}}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
