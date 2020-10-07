import React from "react";
import "./Slider.scss";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import { Images } from "../../utils/images";

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100%;
  background-color: white;
  color: #fff;
  margin: 0 15px;
  font-size: 4em;
`;

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 850, itemsToShow: 1 },
  { width: 1150, itemsToShow: 1, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 1 },
  { width: 1750, itemsToShow: 1 },
];

const Slider = () => {
  return (
    <div>
      <Carousel breakPoints={breakPoints}>
        <Item>
          <img src={Images.Slider01} alt="" className="carousel-image" />
        </Item>
        <Item>
          <img src={Images.Slider02} alt="" className="carousel-image" />
        </Item>
        <Item>
          <img src={Images.Slider03} alt="" className="carousel-image" />
        </Item>
      </Carousel>
    </div>
  );
};

export default Slider;
