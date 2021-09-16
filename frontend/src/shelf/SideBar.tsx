import React from "react";
import styles from "./SideBar.module.css";
import SideBarItem from "./SideBarItem";

class SideBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sideBarItems: [
        { name: "All", value: "all", selected: true },
        { name: "Currently reading", value: "reading", selected: false },
        { name: "Read", value: "read", selected: false },
        { name: "Want to read", value: "want to read", selected: false },
      ],
      selectedItemPosition: 0,
    };
  }

  //Change this.state.sideBarItems depending on which button is clicked in sidebar
  selectFunc = (position: number) => {
    const newSideBarItems = [...this.state.sideBarItems];
    newSideBarItems[this.state.selectedItemPosition].selected = false;
    newSideBarItems[position].selected = true;
    this.setState({
      sideBarItems: newSideBarItems,
      selectedItemPosition: position,
    });
  };

  render() {
    return (
      <div className={styles.container}>
        {this.state.sideBarItems.map((item: any, index: number) => (
          <SideBarItem
            text={item.name}
            selected={item.selected}
            position={index}
            doOnClick={this.selectFunc}
            filterOnClick={this.props.filterOnClick}
            value={item.value}
          />
        ))}
      </div>
    );
  }
}
export default SideBar;
