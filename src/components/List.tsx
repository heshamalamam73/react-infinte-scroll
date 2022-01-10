import React, { useCallback, useRef, useState } from "react";
import useFetchData from "../hooks/useFetchData";
const listContainerStyle = {
  maxWidth: 300,
  margin: "auto"
};
const inputStyle = {
  width: "100%",
  fontSize: 20,
  padding: 10
};
const List = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { loading, hasMore, error, books } = useFetchData(query, page);
  const observer = useRef<any>();
  let options = {
    rootMargin: "0px",
    threshold: 1.0
  };
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );
  console.log(hasMore);
  const handleChangeQuery = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <div style={listContainerStyle}>
      <input
        value={query}
        type="text"
        style={inputStyle}
        placeholder="search"
        onChange={handleChangeQuery}
      />
      {loading && <div> ....loading </div>}
      {error && <div> ....error </div>}
      {books &&
        books.map((book, index) => {
          return books.length === index + 1 ? (
            <li key={index} ref={lastItemRef}>
              {" "}
              {book}
            </li>
          ) : (
            <li key={index}>{book}</li>
          );
        })}
    </div>
  );
};

export default List;
