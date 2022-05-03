import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  padding-top: 200px;
  background-color: rgb(251, 251, 251);
  color: aliceblue;
  display: flex;
  flex-direction: row;
  font-family: "Red Hat Text", sans-serif;

  @media (max-width: 700px) {
    width: 100vw;
    height: max-content;
    flex-direction: column;
    justify-content: center;
  }
`;

export const Container_Edit = styled.form`
  width: 100vw;
  background-color: rgb(251, 251, 251);
  color: aliceblue;
  display: flex;
  flex-direction: row;
  font-family: "Red Hat Text", sans-serif;

  @media (max-width: 700px) {
    width: 100vw;
    height: max-content;
    flex-direction: column;
    justify-content: center;
  }
`;

export const Galeria = styled.div`
  width: 60%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;

  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    width: 98vw;
    height: 500px;
  }
`;

export const ContainerImg = styled.div`
  width: 95%;
  height: 510;
  /* background-color: #F8F8F8; */
  outline: solid 1px #c5c5c561;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 570px;
    border-radius: 7px;
    cursor: zoom-in;
    background-color: #3a10422b;
    opacity: 0;
    transition: all 1s;
  }
  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 700px) {
    width: 90%;
    border-radius: 7px 7px 0px 0px;
    &::before {
      width: 100%;
      border-radius: 7px 7px 0px 0px;
      height: 570px;
    }
  }
`;

export const Detalles = styled.div`
  width: 40%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: start;
  align-items: center;

  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    width: 98vw;
  }
`;

export const Img = styled.img`
  width: auto;
  height: 510px;
  position: relative;
  z-index: 1;
  border-radius: 10px;
  padding: 30px;
`;

export const ImgZoom = styled.img`
  display: block;
  margin: auto;
  width: auto;
  /* height: 110vh; */
  cursor: zoom-out;
  opacity: 0;
  transition: all 2s;
  animation: start forwards 1.5s;
  @keyframes start {
    to {
      opacity: 1;
    }
  }
`;

export const Card = styled.div`
  width: 85%;
  height: 520px;
  /* background-color: #F8F8F8; */
  outline: solid 1px #c5c5c561;

  border-radius: 10px;
  padding: 25px 25px;
  color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;

  .link {
    text-align: center;
  }

  @media (max-width: 700px) {
    border-radius: 0;
    width: calc(90% - 50px);
    border-radius: 0px 0px 7px 7px;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  margin: 0;

  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

export const Container_Stock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #96288d;
`;

export const Stock = styled.div`
  display: flex;
  margin-left: 2px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2.3rem;
`;

export const Caracteristicas = styled.h5`
  text-align: center;
  margin: 10px;
`;

export const Precio = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  color: #575757;
  margin: 10px 0;
  transition: all 1s;
  @media (max-width: 800px) {
    font-size: 2rem;
  }
`;

export const Hr = styled.div`
  width: 100%;
  background-color: #cbcbcb;
  padding: 1px;
  margin: 2px;
`;

export const Subtitulo = styled.h3`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 20px;
`;
export const H6 = styled.h6`
  margin: 10px;
  font-size: 0.9rem;
  font-weight: 400;
  color: #1f1f1f;
  &:last-child {
    text-align: center;
  }

  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

export const Envio = styled.h4`
  text-align: center;
  margin: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #47e185;
`;

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #856a99;
  color: #fff;
  font-size: 1.2rem;
  padding: 5px;
  width: max-content;
  margin: auto;
  margin-top: 70px;
  cursor: pointer;
  &:hover {
    background-color: #89739b;
  }
  &:last-child {
    /* margin-top: -10px; */
    margin-bottom: 15px;
  }
  @media (max-width: 800px) {
    &:last-child {
      font-size: 1.1rem;
    }
  }
  @media (max-width: 360px) {
    &:last-child {
      font-size: 1rem;
    }
  }
`;

export const Button2 = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #856a99;
  color: #fff;
  font-size: 1.2rem;
  padding: 5px;
  width: max-content;
  margin: auto;
  cursor: pointer;
  &:hover {
    background-color: #89739b;
  }
  &:last-child {
    /* margin-top: -10px; */
    margin-bottom: 15px;
  }
  @media (max-width: 800px) {
    &:last-child {
      font-size: 1.1rem;
    }
  }
  @media (max-width: 360px) {
    &:last-child {
      font-size: 1rem;
    }
  }
`;

export const Container_Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
export const Input = styled.input`
  border: none;
  outline: solid 1px #856a99;
  padding: 5px;
  border-radius: 5px;
  width: 780%;
  margin: auto;
  &:hover {
    outline: solid 1px #5b4a68;
  }
  &:focus-visible {
    border: none;
    outline: solid 1px #5b4a68;
  }
`;

export const InputImg = styled.input`
  position: absolute;
  z-index: 10;
  top: 500px;
  border: none;
  outline: solid 1px #856a99;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    outline: solid 1px #5b4a68;
  }
  &:focus-visible {
    border: none;
    outline: solid 1px #5b4a68;
  }
  @media (max-width: 700px) {
    top: 500px;
  }
`;
export const ButtonEditar = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #7ba33bdf;
  color: #fff;
  font-size: 1.2rem;
  padding: 5px;
  width: max-content;
  margin: 7px;
  margin-bottom: 5px;
  opacity: 0.8;
  top: 154px;
  position: relative;
  cursor: pointer;
  &:last-child {
    background-color: #a84f1bdf;
  }
  &:hover {
    opacity: 1;
  }
`;

export const ContainerBtnZoom = styled.div`
  position: fixed;
  display: flex;
  margin-left: 30px;
  margin-bottom: 30px;
  z-index: 100;
  width: 100vh;
  top: 90vh;
`;

export const ContainerCheckbox = styled.div`
  width: 80%;
  height: 140px;
  overflow-y: scroll;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

export const Checkbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Line = styled.div`
  color: rgb(29, 29, 29);
  max-width: 50%;
  width: 90%;
  height: 2px;
  background-color: rgb(105, 105, 105);
  margin: 10px 5px;
`;

export const ContainerInput = styled.div`
  width: 80%;
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  margin: 3px 0px;
`;

export const Label = styled.label`
  margin-right: 27px;
`;

export const TituloCheckbox = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0px;
  margin-bottom: 10px;
  color: #661d6e;
`;

export const Selection = styled.button`
  border: none;
  background-color: #8c5699;
  color: aliceblue;
  height: max-content;
  font-size: 1.2rem;
  border-radius: 5px;
  margin: auto 4px;
  cursor: pointer;
  padding: 2px;
  transition: all 1s;
`;
