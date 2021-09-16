import React from "react";
import styles from "./SideBarItem.module.css";

const SideBarItem = (props: any) => (
  <div
    onClick={() => {
      props.doOnClick(props.position);
      props.filterOnClick(props.value);
    }}
    className={
      props.selected === false ? styles.sideBarItem : styles.sideBarItemSelected
    }
  >
    {props.text}
  </div>
);

export default SideBarItem;
