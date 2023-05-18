import { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onSwitchTab }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(100 * index);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onSwitchTab(tab, index);
  };

  return (
    <div className="switch-tabs">
      <ul className="switch-tabs__items">
        {data.map((tab, index) => (
          <li
            key={index}
            className={`switch-tabs__item ${
              index === selectedTab ? "active" : ""
            }`}
            onClick={activeTab.bind(null, tab, index)}
          >
            {tab}
          </li>
        ))}
        <span className="switch-tabs__moving-bg" style={{ left }}></span>
      </ul>
    </div>
  );
};

export default SwitchTabs;
