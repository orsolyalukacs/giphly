// App.js
import React, { useEffect, useState } from "react";
import { GIPHY_API_KEY } from '../config';

const App = () => {
  const [gifResults, setGifResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingGifs, setTrendingGifs] = useState(null);
  const [openedImg, setOpenedImg] = useState('');
  const apiKey = GIPHY_API_KEY;

  const trendingResults = () => {
    fetch(`http://api.giphy.com/v1/gifs/trending?&api_key=${apiKey}&limit=25`)
      .then(response => response.json())
      .then(response => setTrendingGifs(response.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    trendingResults();
  }, [])

  const getGifs = (event) => {
    event.preventDefault();
    fetch(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=25`)
      .then(response => response.json())
      .then(response => {
        setGifResults(response.data)
        setTrendingGifs(null)
      }).catch(err => console.error(err))
  }

  const inputGifName = (event) => {
    setSearchTerm(event.target.value)
  }

  const openModal = (gif) => {
    setOpenedImg(gif);
  }

  return (
    <>
      {openedImg ?
        <div className="modal" onClick={() => { setOpenedImg(!openedImg) }}>
          <img className="image-large" src={openedImg.images.original.url} />
        </div> : null
      }
      <main className="page-container">
        <div>
          <h1 className="app-title">GIPHLY - a giphy inspired app</h1>
          <form onSubmit={getGifs}>
            <input
              placeholder="Search gifs..."
              onChange={inputGifName}
              type="search">
            </input>
          </form>
          {
            trendingGifs &&
            <div>
              <h2 className="sub-title">Trending</h2>
              <div className="image-grid dw">
                {
                  trendingGifs.map(gif =>
                    <div className="image-container">
                      <img
                        key={gif.id}
                        src={gif.images.downsized_medium.url}
                        className="gif-image"
                        onClick={() => openModal(gif)} />
                    </div>
                  )
                }
              </div>
            </div>
          }
          {
            gifResults &&
            <div className="image-grid dw">
              {
                gifResults.map(gif =>
                  <div className="image-container">
                    <img
                      key={gif.id}
                      src={gif.images.downsized_medium.url}
                      className="gif-image"
                      onClick={() => openModal(gif)} />
                  </div>
                )
              }
            </div>
          }
        </div>
      </main>
    </>
  )
}

export default App;
