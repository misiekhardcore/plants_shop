import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const GalleryContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  overflow-y: hidden;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagesContainer = styled.div`
  max-width: 800px;
  padding: 2rem;
  background-color: black;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 200px;
  gap: 0.5rem;
  position: relative;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    cursor: pointer;
    background-color: black;

    &:hover,
    &focus {
      opacity: 0.8;
    }
  }
`;

const ImageMain = styled.div`
  width: auto;
  margin: 0 auto;

  img {
    max-height: 50vh;
  }
`;

const ImageOthers = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: none;

  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const PrevBtn = styled(CloseBtn)`
  top: 50%;
  left: 0.5rem;
`;

const NextBtn = styled(CloseBtn)`
  top: 50%;
  right: 0.5rem;
`;

interface ImageGalleryProps {
  startImg: number;
  images: string[];
  close: () => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = [""],
  startImg = 0,
  close = () => {},
}) => {
  const [pictureNumber, setPictureNumber] = useState(startImg);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hendleKeyClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keyup", hendleKeyClose);
    return () => {
      document.removeEventListener("keyup", hendleKeyClose);
    };
  }, [close]);

  const handleImageChange = (step: -1 | 1 = 1) => {
    const max = images.length;

    if ((step = 1)) {
      if (pictureNumber + 1 === max) {
        setPictureNumber(0);
      } else {
        setPictureNumber(pictureNumber + 1);
      }
    }
    if ((step = -1)) {
      if (pictureNumber - 1 < 0) {
        setPictureNumber(max - 1);
      } else {
        setPictureNumber(pictureNumber - 1);
      }
    }
  };

  return (
    <GalleryContainer
      onKeyUp={(e) => {
        console.log(e.key);
        if (e.key === "ESC") close();
      }}
      onClick={close}
    >
      <CloseBtn onClick={close}>
        <FaTimes />
      </CloseBtn>
      <ImagesContainer onClick={(e) => e.stopPropagation()}>
        <PrevBtn onClick={() => handleImageChange(-1)}>
          <FiChevronLeft />
        </PrevBtn>
        <NextBtn onClick={() => handleImageChange(1)}>
          <FiChevronRight />
        </NextBtn>
        <ImageMain>
          <img src={images[pictureNumber]} alt="" />
        </ImageMain>
        <ImageOthers>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              onClick={() => setPictureNumber(index)}
            />
          ))}
        </ImageOthers>
      </ImagesContainer>
    </GalleryContainer>
  );
};
