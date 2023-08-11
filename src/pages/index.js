import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import Item from "../components/item";
import question1 from "../data/question";
import question2 from "../data/question2";
import question3 from "../data/question3";
import question4 from "../data/question4";
import markSchemes from "../data/markSchemes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const IndexPage = () => {
  const questions = [question1, question2, question3, question4];
  const [question, setQuestion] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(questions[question]);
  const [reviewMode, setReviewMode] = useState(false);
  const [optionPool, setOptionPool] = useState(activeQuestion.options);
  const [source, setSource] = useState(null);
  const [markScheme, setMarkScheme] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectionValue, setSelectionValue] = useState(null);
  let initalCategoryArray = new Array(questions[question].categories.length);
  for (let i = 0; i < questions[question].categories.length; i++) {
    initalCategoryArray[i] = new Array();
  }
  const [categoryValues, setCategoryValues] = useState(initalCategoryArray);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    let currentMarkScheme = markSchemes;
    currentMarkScheme = currentMarkScheme.filter(
      (markScheme) => markScheme.id === questions[question].markScheme
    )[0];
    setMarkScheme(currentMarkScheme);

    setActiveQuestion(questions[question]);
    setOptionPool(questions[question].options);
    setReviewMode(false);
    let initalCategoryArray = new Array(questions[question].categories.length);
    questions[question].categories.map((category, i) => {
      initalCategoryArray[i] = { id: category.id, options: [] };
    });
    setCategoryValues(initalCategoryArray);
    setFeedback([]);
    resetValues();
  }, [question]);

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const evaluateAnswer = (answers) => {
    setReviewMode(true);
    let correctAnswers = 0;
    let totalAnswers = 0;
    answers.map((category) => {
      // looping through each category answered
      category.options.map((item) => {
        // each item in that category
        const parentId = markScheme?.answers.filter(
          (answer) => answer.id === item.id
        )[0].parent;
        if (category.id === parentId) {
          correctAnswers++;
        } else {
          // check feedback matrix
          if (markScheme?.feedbackMatrix) {
            let filterOne = markScheme.feedbackMatrix.filter(
              (matrixItem) => matrixItem.itemId === item.id
            );
            let filterTwo = filterOne.filter(
              (matrixItem) => matrixItem.categoryId === category.id
            );
            let currentFeedback = feedback;
            currentFeedback.push(filterTwo[0]);
            setFeedback(currentFeedback);
          }
        }
        totalAnswers++;
      });
    });
    if (markScheme?.scoringModel !== undefined) {
      if (markScheme.scoringModel === 0) {
        if (correctAnswers / totalAnswers === 1) {
          console.log("1 mark");
        }
      } else {
        console.log(correctAnswers + " marks");
      }
    }
  };

  const submitAnwer = (e) => {
    e.preventDefault();
    evaluateAnswer(categoryValues);
  };

  const drag = (e) => {
    // SAVE THE VALUE OF THE CURRENT OPTION
    setSelectionValue(
      activeQuestion.options.find(
        (option) => option.id === parseInt(e.target.dataset.id)
      )
    );
    ////////////////////////////////////////////////////////////
    // SET SOURCE OF ITEM
    setSource(e.target.dataset.source);
    e.target.dataset.category &&
      setCategory(parseInt(e.target.dataset.category));
  };

  const removeFromPool = (item) => {
    // CREATE A NEW INSTANCE OF THE OPTIONS
    let newOptionPool = [...optionPool];
    // GET THE INDEX OF THE CURRENT OPTION
    const index = optionPool.findIndex((option) => option.id === item.id);
    // REMOVE OPTION FROM THE NEW OPTIONS
    newOptionPool.splice(index, 1);
    // REPLACE THE OPTIONS
    setOptionPool(newOptionPool);
  };

  const addToPool = (item) => {
    // CREATE A NEW INSTANCE OF THE OPTIONS
    let newOptionPool = [...optionPool];
    // ADD OPTION TO THE NEW OPTIONS INSTANCE
    newOptionPool.push(item);
    // REPLACE THE OPTIONS
    setOptionPool(newOptionPool);
  };

  const removeFromCategory = (category, item) => {
    // CREATE A NEW INSTANCE OF CATEGORIES
    let newCategoryValues = categoryValues;
    // GET INDEX OF SELECTED CATEGORY
    const indexOfCategory = newCategoryValues.findIndex(
      (categoryValue) => categoryValue.id === category
    );
    let currentCategory = categoryValues[indexOfCategory];
    // REMOVE OPTION FROM THAT CATEGORY
    const indexOfItem = currentCategory.options.findIndex(
      (itemInCategory) => itemInCategory.id === item
    );
    newCategoryValues[indexOfCategory].options.splice(indexOfItem, 1);
    // REPLACE THE CATEGORIES
    setCategoryValues(newCategoryValues);
  };

  const addToCategory = (category, item) => {
    // CREATE A NEW INSTANCE OF CATEGORIES
    let newCategoryValues = categoryValues;
    const indexOfCategory = newCategoryValues.findIndex(
      (categoryValue) => categoryValue.id === category
    );
    // ADD OPTION TO THE NEW CATEGORIES INSTANCE
    newCategoryValues[indexOfCategory].options.push(item);
    // REPLACE THE CATEGORIES
    setCategoryValues(newCategoryValues);
  };

  const resetValues = () => {
    setSelectionValue(null);
  };

  const dropInAnswerPool = () => {
    // DOES NOT EXIST AND NOT ORIGINATED FROM POOL
    const exists =
      optionPool.find((option) => option.id === selectionValue) !== undefined;
    if (source !== "pool" && !exists) {
      addToPool(selectionValue);
      removeFromCategory(category, selectionValue);
    }
    resetValues();
  };

  const dropInCategory = (e) => {
    // IF ITEM HASN'T ORIGINATED FROM CATEGORY
    if (source !== "category") {
      removeFromPool(selectionValue);
    } else {
      removeFromCategory(category, selectionValue);
    }
    addToCategory(parseInt(e.target.dataset.id), selectionValue);
    resetValues();
  };

  const moveOption = (option, categoryFrom, categoryTo, dataSource) => {
    setSelectionValue(option);
    // SET SOURCE OF ITEM
    setSource(dataSource);
    categoryFrom && setCategory(categoryFrom);
    //
    if (dataSource === "pool" && categoryTo !== undefined) {
      removeFromPool(option);
      addToCategory(categoryTo, option);
    } else if ((dataSource = "category" && categoryFrom !== undefined)) {
      removeFromCategory(categoryFrom, option);
      addToCategory(categoryTo, option);
    }
    resetValues();
  };

  return (
    <>
      <div className="question-area">
        <button
          className={`${question === 0 ? " active" : ""}`}
          onClick={() => {
            setQuestion(0);
          }}
        >
          Question 1
        </button>
        <button
          className={`${question === 1 ? " active" : ""}`}
          onClick={() => {
            setQuestion(1);
          }}
        >
          Question 2
        </button>
        <button
          className={`${question === 2 ? " active" : ""}`}
          onClick={() => {
            setQuestion(2);
          }}
        >
          Question 3
        </button>
        <button
          className={`${question === 3 ? " active" : ""}`}
          onClick={() => {
            setQuestion(3);
          }}
        >
          Question 4
        </button>
      </div>
      <div>
        <h1 className="question-title">{activeQuestion.title}</h1>
        <p className="question-prompt">{activeQuestion.prompt}</p>
        <div className="answer-pool">
          <h2 className="title">{activeQuestion.optionsTitle}</h2>
          {optionPool &&
            optionPool.map((option, i) => (
              <Item
                dataSource="pool"
                option={option}
                key={i}
                drag={drag}
                categories={activeQuestion.categories}
                moveOption={moveOption}
              />
            ))}
          <div
            className="drop-area"
            onDrop={() => {
              dropInAnswerPool();
            }}
            onDragOver={(e) => allowDrop(e)}
          >
            Drop Here
          </div>
        </div>
        <div className="categories">
          <h2 className="title">{activeQuestion.categoriesTitle}</h2>
          {activeQuestion &&
            activeQuestion.categories?.map((category, i) => (
              <div className="category" key={i}>
                <div className="category-name">{category.name}</div>
                <div
                  className="drop-area"
                  data-id={i}
                  onDrop={(e) => dropInCategory(e)}
                  onDragOver={(e) => allowDrop(e)}
                >
                  Drop Here
                </div>
                {categoryValues &&
                  categoryValues[i]?.options?.map(
                    (option, a) =>
                      option && (
                        <Item
                          reviewMode={reviewMode}
                          answers={markScheme?.answers}
                          fullwidth
                          dataSource="category"
                          dataCategory={i}
                          option={option}
                          key={a}
                          drag={drag}
                          categories={activeQuestion.categories}
                          moveOption={moveOption}
                        />
                      )
                  )}
              </div>
            ))}
        </div>
        {feedback.length > 0 && (
          <div className="feedback-area">
            <div className="table-row">
              <div className="table-column table-header">User Action</div>
              <div className="table-column table-header">Feedback</div>
            </div>
            {feedback.map(
              (feedbackItem, i) =>
                feedbackItem && (
                  <div key={i} className="table-row">
                    <div className="table-column">
                      <div className="tile">
                        {
                          activeQuestion.options.filter(
                            (option) => option.id === feedbackItem.itemId
                          )[0].name
                        }
                      </div>
                      <FontAwesomeIcon icon={faArrowRight} />
                      <div className="tile">
                        {
                          activeQuestion.categories.filter(
                            (category) =>
                              category.id === feedbackItem.categoryId
                          )[0].name
                        }
                      </div>
                    </div>
                    <div className="table-column">
                      {feedbackItem.feedback}
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <div className="submit-area">
        <button
          className="button fullwidth"
          onClick={(e) => {
            submitAnwer(e);
          }}
          disabled={optionPool.length !== 0 || reviewMode}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
