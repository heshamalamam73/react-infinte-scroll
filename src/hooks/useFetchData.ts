import axios from "axios";
import { useEffect, useState } from "react";
export type Book = string;
const useFetchData = (query: string, page: number = 1) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(false);
      let cancelToken;
      axios({
        method: "GET",
        url: `https://openlibrary.org/search.json?page=${page}&q=${query}`,
        cancelToken: new axios.CancelToken((c) => (cancelToken = c))
      })
        .then((res) => {
          setBooks((prevBooks) => {
            return [
              ...new Set([...prevBooks, ...res.data.docs.map((b) => b.title)])
            ];
          });
          setLoading(false);
          setHasMore(res.data.docs.length > 0);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
        });
      return () => cancelToken();
    }
  }, [query, page]);

  return { books, loading, hasMore, success, error };
};

export default useFetchData;
