// App.js
import React, { useEffect, useState, useCallback } from "react";
import { GIPHY_API_KEY } from '../config';

const App = () => {
  const [gifResults, setGifResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openedImg, setOpenedImg] = useState('');
  const apiKey = GIPHY_API_KEY;

  // fetch trending gif data from API
  const trendingResults = () => {
    fetch(`http://api.giphy.com/v1/gifs/trending?&api_key=${apiKey}&limit=25`)
      .then(response => response.json())
      .then(response => {
        console.log(response.data)
        setGifResults(response.data)
      }
      )
      .catch(err => console.error(err))
  }

  // render trending results on first page load
  useEffect(() => {
    trendingResults();
  }, [])

  // fetch search results from API
  const getGifs = (event) => {
    event.preventDefault();
    fetch(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=25`)
      .then(response => response.json())
      .then(response => {
        setGifResults(response.data)
      }).catch(err => console.error(err))
  }

  // set search value from form
  const inputGifName = (event) => {
    setSearchTerm(event.target.value)
  }

  const openModal = (gif) => {
    setOpenedImg(gif)
  }

  const closeModal = () => {
    setOpenedImg(!openedImg)
  }

  return (
    <>
      {openedImg ?
        <div className="modal" onClick={closeModal}>
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
            gifResults &&
            <div className="image-grid dw">
              {
                gifResults.map(gif =>
                  <div className="image-container">
                    <picture>
                      <source type="img/webp" srcSet="{gif.images.fixed_height_downsampled.webp}" />
                      <img
                        key={gif.id}
                        src={gif.images.fixed_height_downsampled.url}
                        alt={gif.title}
                        className="gif-image"
                        onClick={() => openModal(gif)} />
                    </picture>
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
