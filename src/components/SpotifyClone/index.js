import {Component} from 'react'
import moment from 'moment'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsHouseFill, BsMusicNoteBeamed} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {RiPlayListFill} from 'react-icons/ri'

import EditorsPic from '../EditorsPic'
import GenresAndMoods from '../GenresAndMoods'
import NewReleases from '../NewReleases'

import './index.css'

class SpotifyClone extends Component {
  state = {
    isLoading: true,
    editorsPick: [],
    genersAndModes: [],
    newReleases: [],
  }

  componentDidMount() {
    this.fetchHomeDetails()
  }

  // setting data to state function
  onEditorsPickApiFetcherSuccess = data => {
    this.setState({editorsPick: data})
  }

  onGenresAndMoodsApiFetcherSuccess = data => {
    this.setState({genersAndModes: data})
  }

  onNewReleasesApiFetcherSuccess = data => {
    this.setState({newReleases: data, isLoading: false})
  }

  // home api fetcher function
  fetchHomeDetails = () => {
    this.editorsPickApiFetcher()
    this.genresAndMoodsApiFetcher()
    this.newReleasesApiFetcher()
  }

  // Editor's Pick API
  editorsPickApiFetcher = async () => {
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    const country = 'in'
    const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timestamp}&offset=0&limit=12`
    const token = Cookie.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onEditorsPickApiFetcherSuccess(data)
      console.log(data)
    }
  }

  // Genres and Moods API
  genresAndMoodsApiFetcher = async () => {
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    const country = 'in'
    const url = `https://api.spotify.com/v1/browse/categories?country=${country}&timestamp=${timestamp}&offset=0&limit=18`
    const token = Cookie.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onGenresAndMoodsApiFetcherSuccess(data)
    }
  }

  // new releases API
  newReleasesApiFetcher = async () => {
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    const country = 'in'
    const url = `https://api.spotify.com/v1/browse/new-releases?country=${country}&timestamp=${timestamp}`
    const token = Cookie.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onNewReleasesApiFetcherSuccess(data)
    }
  }

  // render ui functions
  renderEditorsPic = () => {
    const {editorsPick} = this.state
    const playListItems = editorsPick.playlists.items

    return (
      <div className="editors-pic-section">
        <h1 className="editors-pic-heading">Editor&apos;s Pic</h1>
        <ul className="editor-container">
          {playListItems.map(eachItem => (
            <EditorsPic
              imageUrl={eachItem.images}
              name={eachItem.name}
              id={eachItem.id}
              key={eachItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderGenresAndMoods = () => {
    const {genersAndModes} = this.state
    const albums = genersAndModes.categories.items

    return (
      <div className="editors-pic-section">
        <h1 className="editors-pic-heading">Genre&apos;s And Moods</h1>
        <ul className="editor-container">
          {albums.map(eachItem => (
            <GenresAndMoods
              imageUrl={eachItem.icons}
              name={eachItem.name}
              key={eachItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderNewReleases = () => {
    const {newReleases} = this.state
    const categories = newReleases.albums.items

    return (
      <div className="editors-pic-section">
        <h1 className="editors-pic-heading">Genre&apos;s And Moods</h1>
        <ul className="editor-container">
          {categories.map(eachItem => (
            <NewReleases
              imageUrl={eachItem.images}
              name={eachItem.name}
              key={eachItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderSidebar = () => {
    const iconStyles = {
      color: '#ffffff',
      height: '40px',
      width: '30px',
      marginBottom: '20px',
    }

    const selected = {
      borderLeft: '5px solid #1ED760',
      height: '50px',
      width: '100%',
      paddingTop: '10px',
      paddingBottom: '10px',
      marginBottom: '20px',
      backgroundColor: '#181818',
    }

    return (
      <div className=".side-nav-bar">
        <div className="spotify-logo-container">
          <img
            className="spotify-logo"
            src="https://res.cloudinary.com/dv5sqjywy/image/upload/v1634802040/Vector_tzdjqy.png"
            alt="spotify"
          />
          <div className="icons-section">
            <CgProfile style={iconStyles} />
            <BsHouseFill style={(iconStyles, selected)} />
            <BsMusicNoteBeamed style={iconStyles} />
            <RiPlayListFill style={iconStyles} />
          </div>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // render main

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="home-page">
            <div className="side-bar">{this.renderSidebar()}</div>
            <div className="content-section">
              {this.renderEditorsPic()}
              {this.renderGenresAndMoods()}
              {this.renderNewReleases()}
            </div>
          </div>
        )}
      </>
    )
  }
}

export default SpotifyClone
