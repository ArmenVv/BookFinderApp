'use client';
import React from "react";
import { useState, useEffect } from "react";
import { FetchBooks } from "../api/fetchdata";
import "./search.css"

export default function Search() {

    const [inputVal, setInputVal] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading,setPageLoading] = useState(true);
    
    const bookMouseOver = () => {

    }
    useEffect(()=>{
    const defFetch = async () => {
        setLoading(true);
        const defRes = await FetchBooks(0);
        setBooks(defRes);
        setLoading(false);
    };
     defFetch();
     const timer = setTimeout(()=>{

        setPageLoading(false);
     },3000);
     return () => clearTimeout(timer);
    },[]);

    const handleChange = (event) => {
        setInputVal(event.target.value);
    }
    useEffect(()=>{
        const delayFetch = setTimeout(async() =>{
        setLoading(true);
        if (!inputVal) {
            const defRes = await FetchBooks(0);
            setBooks(defRes);
            setLoading(false);
            return;
        }
        const results = await FetchBooks(inputVal);
        setBooks(results)
        setLoading(false);
    },3000);
    return () => clearTimeout(delayFetch);},[inputVal])
    if(pageLoading){
        return (
            <div className="loading-container">
                        <span>Loading...</span>
                        <div className="loading-animation"></div>
            </div>
        )
    }
    return (
        <div className="global-container">
            <input type="text" onChange={handleChange} value={inputVal} className="inputBook" placeholder="Search book..."/>
            {loading ? (
            <div className="loading-container">
                        <span>Loading...</span>
                        <div className="loading-animation"></div>
            </div>) :(
                books.length>0 ? (
                    <div className="books-container">
                        {books.map((books,index)=>(
                            <div className="book" onMouseEnter={(e)=>e.currentTarget.classList.add('grey-hover')}
                                onMouseLeave={(e)=>e.currentTarget.classList.remove('grey-hover')}>
                            {
                              books.cover_i ? (
                              <>
                              <img src={`https://covers.openlibrary.org/b/id/${books.cover_i}-L.jpg`}/>
                              <span key={index}>
                                {books.title.length<18?books.title:`${books.title.slice(0,18)}...`}</span>
                               <span>{books.author_name[0]}</span>
                               <span>{books.first_publish_year}</span></>):null}
                            </div>
                        ))}
                    </div>
                ) : (<p className="notif">There are no such books</p>))}
        </div>
    )
}