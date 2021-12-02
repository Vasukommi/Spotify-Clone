import './index.css'

const NewReleases = props => {
  const {imageUrl, name} = props
  const url = imageUrl.map(eachItem => eachItem.url)

  const requiredImageUrl = url[0]
  const requiredName = name.slice(0, 20)

  return (
    <li className="editors-pick-card">
      <img src={requiredImageUrl} alt={name} className="editors-pick-image" />
      <p className="editors-pick-name">{requiredName}</p>
    </li>
  )
}

export default NewReleases
