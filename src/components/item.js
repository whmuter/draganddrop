import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";

const Option = ({
  option,
  drag,
  categories,
  fullwidth,
  dataSource,
  dataCategory,
  moveOption,
  reviewMode,
  answers,
}) => {
  const [description, toggleDescription] = useState(false);
  const [menu, toggleMenu] = useState(false);
  return (
    <div
      data-id={option.id}
      data-category={dataCategory}
      data-source={dataSource}
      title={option.description}
      className={`option${fullwidth ? " fullwidth" : ""}${
        reviewMode && answers ? answers.filter((answer)=> answer.id === option.id )[0].parent === dataCategory
          ? " correct"
          : reviewMode
          ? " incorrect"
          : "":""
      }`}
      draggable={!reviewMode}
      onDragStart={(e) => drag(e)}
      tabIndex={0}
    >
      <div className="option-header">
        <div className="option-title">{option.name}</div>
        <FontAwesomeIcon
          icon={faArrowsUpDownLeftRight}
          tabIndex={0}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              toggleMenu(!menu);
            }
          }}
          onClick={() => {
            toggleMenu(!menu);
          }}
          className="move-icon"
        />
        <div className={`option-menu${menu ? " open" : ""}`}>
          {categories &&
            categories.map((category, i) => (
              <div
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    moveOption(option, dataCategory, category.id, dataSource);
                    toggleMenu(false);
                  }
                }}
                key={i}
                className="item"
              >
                {category.name}
              </div>
            ))}
        </div>
      </div>
      <div
        className={`option-description${description ? " open" : ""}`}
        onClick={() => {
          toggleDescription(!description);
        }}
      >
        {option.description}
      </div>
    </div>
  );
};

export default Option;
