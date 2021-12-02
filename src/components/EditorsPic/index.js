import {Link} from 'react-router-dom'

import './index.css'

const EditorsPic = props => {
  const {imageUrl, name, id} = props
  const url = imageUrl.map(eachItem => eachItem.url)

  return (
    <Link className="item-link" to={`/playlist/${id}`}>
      <li className="editors-pick-card">
        <img src={url} alt={name} className="editors-pick-image" />
        <p className="editors-pick-name">{name}</p>
      </li>
    </Link>
  )
}

export default EditorsPic
