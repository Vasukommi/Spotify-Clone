import './index.css'

const GenresAndMoods = props => {
  const {imageUrl, name} = props
  const url = imageUrl.map(eachItem => eachItem.url)

  return (
    <li className="editors-pick-card">
      <img src={url} alt={name} className="editors-pick-image" />
      <p className="editors-pick-name">{name}</p>
    </li>
  )
}

export default GenresAndMoods
