import { useState } from "react";
import styles from "./ListGroup.module.css";
import { FaTruck } from "react-icons/fa6";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items = [], heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <>
      <h1>{heading}</h1>
      <FaTruck size={196} />
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul className={styles.listGroup}>
          {items.map((item, index) => (
            <li
              className={
                index === selectedIndex
                  ? `${styles.listGroupItem} ${styles.active}`
                  : styles.listGroupItem
              }
              key={item}
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ListGroup;
