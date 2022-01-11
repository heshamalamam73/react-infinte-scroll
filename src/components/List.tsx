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

  const handleChangeQuery = (e: any) => {
    setQuery(e.target.value);
  };
  const listitem = {
    border: "1px solid #eee",
    listStyle: "none",
    marginBottom: 10,
    padding: 10
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
      {books && (
        <ul>
          {books.map((book, index) => {
            return books.length === index + 1 ? (
              <li style={listitem} key={index} ref={lastItemRef}>
                {" "}
                {book}
              </li>
            ) : (
              <li key={index} style={listitem}>
                {book}
              </li>
            );
          })}
          {loading && books.length > 1 && (
            <li style={listitem}>Loading .....</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default List;
