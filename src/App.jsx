import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorFetch from './components/ErrorFetch'
import Locationinfo from './components/Locationinfo'
import ResidentCard from './components/ResidentCard'
import Morty from './assets/morty.jpg'

function App() {

  const [location, setLocation] = useState()
  const [locationInput, setLocationInput] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let URL

    if (locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}}`
    } else {

      const randomIdLocation = Math.floor(Math.random() * 126) + 1
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`
    }

    axios.get(URL)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })
  }, [locationInput])

  const handleSubmit = e => {
    e.preventDefaul()
    setLocationInput(e.target.inputSearch.value)
  }


  return (
    <div className="App">
      <h1 className='title'>Rick and Morty</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input id='inputSearch' type="text" />
        <button>Search</button>
      </form>
      {
        hasError ?
          <ErrorFetch />
          :
          <>
            <Locationinfo location={location} />
            <div className='residents-container'>
              {
                location?.residents.map(url => (
                  <ResidentCard key={url} url={url} />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default App
