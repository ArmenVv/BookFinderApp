"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FetchBooks } from "../api/fetchdata";
import "./search.css";

export default function Search() {
  const [inputVal, setInputVal] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [favorites,setFavorites] = useState([]);
  const [notifications,setNotifications] = useState("");
  const [page,setPage] = useState(1);
  const [numFound,setNumFound] = useState(0);
  const PAGE_SIZE = 20;

  const toggleFavorite = (bookKey,bookTitle) => {
    if(favorites.includes(bookKey)){
        setFavorites(favorites.filter((key)=>key!==bookKey));
        setNotifications(`${bookTitle} was removed from favorites`);
        setTimeout(()=>setNotifications(""),3000);
    }
    else{
        setFavorites([...favorites,bookKey]);
        setNotifications(`${bookTitle} was added to favorites`);
        setTimeout(()=>setNotifications(""),3000);
    }
  }
  useEffect(()=>localStorage.setItem("favorites", JSON.stringify(favorites)),[favorites]);
  useEffect(() => {
    const defFetch = async () => {
      setLoading(true);
      const start = (page-1)*PAGE_SIZE;
      const defRes = await FetchBooks(0,start);
      setBooks(defRes.docs);
      setNumFound(defRes.numFound);
      setLoading(false);
    };
    defFetch();
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event) => {
    setInputVal(event.target.value);
    setPage(1);
    
  };
  useEffect(() => {
    const delayFetch = setTimeout(async () => {
      setLoading(true);
      const start =(page-1)*PAGE_SIZE;
      const results = await FetchBooks(inputVal||0,start);
      setBooks(results.docs || []);
      setNumFound(results.numFound||0);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(delayFetch);
  }, [inputVal,page]);
  const totalPages = Math.ceil(numFound/PAGE_SIZE);
  if (pageLoading) {
    return (
      <div className="loading-container">
        <span>Loading...</span>
        <div className="loading-animation"></div>
      </div>
    );
  }
  return (
    <div className="global-container">
      <input
        type="text"
        onChange={handleChange}
        value={inputVal}
        className="inputBook"
        placeholder="Search book..."
      />
      {notifications && (<div className="Notification">{notifications}</div>)}
      {loading ? (
        <div className="loading-container">
          <span>Loading...</span>
          <div className="loading-animation"></div>
        </div>
      ) : books.length > 0 ? (
        <>
        <div className="books-container">
          {books.map((book, index) => (
            <div className="book">
              {book.cover_i ?  (
                <>
                  <div className="star">
                    <button onClick={() => toggleFavorite(book.key,book.title,book.cover_i)}>
                      {favorites.includes(book.key) ? (<img src ="src/assets/star1.png"/>):(<img src ="src/assets/star2.PNG"/>)}
                    </button>
                  </div>
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                    alt={book.title}
                    key={book.cover_i}
                    onMouseEnter={() => setHoveredId(index)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      filter:
                        hoveredId === index
                          ? "grayscale(100%)"
                          : "grayscale(0%)",
                      transition: hoveredId === index ? "filter 0.3s ease" : "",
                      cursor: hoveredId === index ? "pointer" : "",
                    }}
                  />
                  <span key={book.key}>
                    {book.title.length < 18
                      ? book.title
                      : `${book.title.slice(0, 18)}...`}
                  </span>
                  <span>{book.author_name[0]}</span>
                  <span>{book.first_publish_year}</span>
                </>
              ) : null}
            </div>
          ))}
        </div>
        <div>
        <button onClick={()=>{setPage(p=>Math.max(p-1,1));}} disabled={page===1}>Previous</button>
        <span>{page} of {totalPages}</span>
        <button onClick={()=>setPage(p=>(p<totalPages?p+1:p))} disabled={page===totalPages}>Next</button>
        </div>
        </>
      ) : (
        <p className="notif">There are no such books</p>
      )}
    </div>
  );
}
