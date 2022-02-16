import React, { useState,useEffect } from 'react'
import './pagination.css'

function Pagination(props){
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxpageNumberLimit, setmaxpageNumberLimit] = useState(5);
    const [minpageNumberLimit, setminpageNumberLimit] = useState(0);
    
    const changePage=()=>{
        setCurrentPage(1)
    }
    console.log(props)
    React.useEffect(() => {
        console.log("hiii")
        if (props.pagination) {
          setCurrentPage(1)
          props.handlePagination()
        }

      }, [])
    const handleNextbn = (e) => {
        window.scrollTo(0,0)
        e.preventDefault();
        if(currentPage<props.pages){
            setCurrentPage(currentPage + 1)
            props.handlePageChange(currentPage,1)
        }
        // console.log(currentPage, maxpageNumberLimit)
        if ((currentPage + 1) > maxpageNumberLimit) {
            // console.log("next")
            setmaxpageNumberLimit(maxpageNumberLimit + pageNumberLimit);
            setminpageNumberLimit(minpageNumberLimit + pageNumberLimit);
        }
    }
    const handlePrevbtn = (e) => {
        window.scrollTo(0,0)
        e.preventDefault();
        if(currentPage>1){
        setCurrentPage(currentPage - 1);
        props.handlePageChange(currentPage,2)
        }
        // console.log(currentPage  , maxpageNumberLimit)
        if (currentPage>1 && (currentPage - 1) % pageNumberLimit == 0) {
            // console.log("prev")
            setmaxpageNumberLimit(maxpageNumberLimit - pageNumberLimit)
            setminpageNumberLimit(minpageNumberLimit - pageNumberLimit)
        }
        
    }
    const renderPageNumbers = Array.from(Array(props.pages), (e, i) => {
        if (i + 1 < maxpageNumberLimit + 1 && i + 1 > minpageNumberLimit) {
            return <li key={i} value={i + 1} id={i + 1} onClick={(e) => { e.preventDefault();setCurrentPage(Number(e.target.id)); props.handlePageChange(Number(e.target.id),0) }}
                className={currentPage == i + 1 ? 'active' : null}>{i + 1}</li>
        }
        else {
            return null
        }
    })
    let pageIncrementBtn=null;
    if(props.pages>maxpageNumberLimit){
        pageIncrementBtn=<li onClick={handleNextbn}>&hellip;</li>
    }
    let pageDecrementBtn=null;
    if(minpageNumberLimit>1){
        pageDecrementBtn=<li onClick={handlePrevbtn}>&hellip;</li>
    }
    return (
        <div>
            <ul className="pageNumbers">
                <li>
                    <button><p style={{ fontSize: "0.7em" }} onClick={handlePrevbtn}>Prev</p></button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li>
                    <button><p style={{ fontSize: "0.7em" }} onClick={handleNextbn}>Next</p></button>
                </li>
            </ul>

        </div>
    )

}
export default Pagination