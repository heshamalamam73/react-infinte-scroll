import { forwardRef } from "react";
import { Book } from "../hooks/useFetchData";

type Item = {
  book: number;
};
type Ref = HTMLElement | null;
const itemStyle = {
  border: "1px solid #eee",
  padding: 10,
  marginBottom: 5
};

const ListItemW: React.FC<Item> = ({ book }, ref) => {
  return (
    <div style={itemStyle} ref={ref}>
      {book}
    </div>
  );
};

const ListItem = forwardRef(ListItemW);
export default ListItem;
