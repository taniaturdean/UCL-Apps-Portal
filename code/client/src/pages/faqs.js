import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./faqs.css";
import * as React from "react";
import { useLocation } from "react-router-dom";
import useScrollTo from "../hooks/useScrollTo";
import { useMediaQuery } from "react-responsive";

//TO BE COMPLETED

const Faqs = () => {
  const location = useLocation();

  // custom hook to extract any hash params from url and scroll to those elements
  useScrollTo();

  const text =
    "University College London \n  Gower Street \n  London WC1E 6BT \n UK \n \n \n Telephone: \n E-mail: ";

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActiveIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  const isPhone = useMediaQuery({ minWidth: 0, maxWidth: 450 });
  const isLaptop = useMediaQuery({ minWidth: 451, maxWidth: 1823 });
  const isLargeMonitor = useMediaQuery({ minWidth: 1824});

  const getClassName = (baseClassName) => {
    if (isLargeMonitor) return `${baseClassName}--large-monitor`;
    if (isLaptop) return `${baseClassName}--laptop`;
    if (isPhone) return `${baseClassName}--phone`;
    return baseClassName;
  };

  return (
    <main className={getClassName("faqs")}>
      <img className="home-page-item-op" alt="" src="../ellipse-54.svg" />
      <img className="home-page-child-op" alt="" src="../ellipse-55.svg" />
      <img className="mask-group-icon-op" alt="" src="../mask-group33@2x.png" />
      <img className="mask-group-icon1-op" alt="" src="../teacher.png" />
      <img className="mask-group-icon2-op" alt="" src="../mask-group2@2x.png" />

      <h1 className={getClassName("opp")}>Frequently Asked Questions</h1>

      <Header />
      <div className={getClassName("text1-fa")}>Some text about students and FAQs.</div>
      <div className={getClassName("text12-fa")}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum
        nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor
        sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis
        fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris
        eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id
        facilisis malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi
        ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend
        quis tellus quis fermentum. Quisque cursus, lacus non malesuada
        pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis.
        Aenean varius eros id facilisis malesuada.
      </div>

      <div className={getClassName("Line-low-op")} />
      <div className={getClassName("accordion")}>
        <div
          className={`accordion-item ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => toggleActiveIndex(0)}
        >
          <div className={getClassName("accordion-title")}>
            Question 1 - What is ProjectConnect?
          </div>
          <div className="accordion-content">
            Text that answers the question - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam interdum nibh nisi, sit amet
            imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut
            sollicitudin est varius non.
          </div>
        </div>
        <div
          className={`accordion-item ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => toggleActiveIndex(1)}
        >
          <div className={getClassName("accordion-title")}>
            Question 2 - What is ProjectConnect?
          </div>
          <div className="accordion-content">
            Text that answers the question - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam interdum nibh nisi, sit amet
            imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut
            sollicitudin est varius non.
          </div>
        </div>
        <div
          className={`accordion-item ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => toggleActiveIndex(2)}
        >
          <div className={getClassName("accordion-title")}>
            Question 3 - What is ProjectConnect?
          </div>
          <div className="accordion-content">
            Text that answers the question - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam interdum nibh nisi, sit amet
            imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut
            sollicitudin est varius non.
          </div>
        </div>
        <div
          className={`accordion-item ${activeIndex === 3 ? "active" : ""}`}
          onClick={() => toggleActiveIndex(3)}
        >
          <div className={getClassName("accordion-title")}>
            {" "}
            Question 4 - What is ProjectConnect?
          </div>
          <div className="accordion-content">
            Text that answers the question - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam interdum nibh nisi, sit amet
            imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut
            sollicitudin est varius non.
          </div>
        </div>
        <div
          className={`accordion-item ${activeIndex === 4 ? "active" : ""}`}
          onClick={() => toggleActiveIndex(4)}
        >
          <div className={getClassName("accordion-title")}>
            Question 5 - What is ProjectConnect?
          </div>
          <div className="accordion-content">
            Text that answers the question - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam interdum nibh nisi, sit amet
            imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut
            sollicitudin est varius non.
          </div>
        </div>
      </div>
      <h2 id="contact" className={getClassName("connect-op")}>
        Contact Us
      </h2>

      <div className={getClassName("text4-ab")}>{text}</div>

      <div className={getClassName("phone")}>(617) 495-3067</div>
      <div className={getClassName("email")}>apps_portal@ucl.ac.uk</div>

      <Footer />
    </main>
  );
};

export default Faqs;
