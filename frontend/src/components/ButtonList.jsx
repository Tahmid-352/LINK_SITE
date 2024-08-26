import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ButtonList.css"; // Import the CSS file for styling

const ButtonList = () => {
  const [titles, setTitles] = useState([]);

  const fetchTitles = async () => {
    try {
      const response = await axios.get("/api/buttons");
      setTitles(response.data);
    } catch (error) {
      console.error("Error fetching titles:", error);
    }
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  const handleButtonClick = async (id, link) => {
    if (id) {
      const now = new Date();
      const lastClick = localStorage.getItem(`button-click-${id}`);
      const oneDay = 0 * 60 * 60 * 1000;

      if (!lastClick || now - new Date(lastClick) > oneDay) {
        localStorage.setItem(`button-click-${id}`, now);
        window.open(link, "_blank");
        // Optionally, trigger a refresh to update the button list
        fetchTitles();
      }
    }
  };

  return (
    <div className="button-list">
      {titles.map((item) => {
        const lastClick = localStorage.getItem(`button-click-${item._id}`);
        const isClickedToday =
          lastClick && new Date() - new Date(lastClick) <= 0 * 60 * 60 * 1000;
        return (
          <button
            key={item._id}
            onClick={() => handleButtonClick(item._id, item.link)}
            className={`button-list__button ${
              isClickedToday ? "button-list__button--clicked" : ""
            }`}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonList;
