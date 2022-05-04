import styled from "styled-components";

export const Container_Edit = styled.form`
  width: 100%;
  height: max-content;
  position: relative;
  color: aliceblue;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-family: "Red Hat Text", sans-serif;
  padding-top: 50px;
  @media (max-width: 700px) {
    width: 100vw;
    height: max-content;
    flex-direction: column;
    justify-content: center;
  }
`;
export const ColumnHeader = styled.div`
 width: calc(100% + 40px);
  height: 50px;
  background-color: #ffffff7a;
  position: absolute;
  top: -20px;
  left: -20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h3`
  font-style: italic;
  width: max-content;
  text-align: center;
  color: #6c7293;
  margin-left: 10px;
`;

export const Galeria = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    width: 98vw;
    height: 500px;
  }
`;

export const ContainerImg = styled.div`
  width: 85%;
  height: 720px;
  background-color: #ffffff;
  /* background-color: #fff; */
  outline: solid 1px #c5c5c561;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  overflow: hidden;
  position: relative;
  padding: 25px;
  @media (max-width: 700px) {
    width: 90%;
    border-radius: 7px 7px 0px 0px;
  }
`;

export const Detalles = styled.div`
  width: 50%;
  height: 100%;
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
  width: 100%;
  height: 510px;
  position: relative;
  z-index: 2;
  border-radius: 10px;
  padding: 30px;
  /* filter: invert(1); */
`;

export const Card = styled.div`
  width: 85%;
  height: 720px;
  background-color: #fff;
  border-radius: 10px;
  padding: 25px 15px;
  color: #6c7293;
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    border-radius: 0;
    width: calc(90% - 50px);
    border-radius: 0px 0px 7px 7px;
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
  outline: solid 1px #6c7293;
  padding: 5px;
  border-radius: 5px;
  width: 780%;
  margin: auto;
  background-color: transparent;
  color: #6c7293;
  &:hover {
    outline: solid 1px #6c7293;
  }
  &:focus-visible {
    border: none;
    outline: solid 1px #6c7293;
  }
  &::placeholder {
  color: #6c7293;
  }
`;

export const Label = styled.label`
margin-right: 27px;
width: 149px;
font-size: .9rem;
`;

export const InputImg = styled.input`
  position: absolute;
  z-index: 10;
  top: 700px;
  border: none;
  outline: solid 1px #6c7293;
  padding: 5px;
  border-radius: 5px;
  background-color: transparent;
  color: #6c7293;
  &:hover {
    outline: solid 1px #6c7293;
  }
  &:focus-visible {
    border: none;
    outline: solid 1px #6c7293;
  }
  &::placeholder{
      color: #6c7293;
  }
  @media (max-width: 700px) {
    top: 500px;
  }
`;
export const ButtonEditar = styled.button`
  font-size: 1rem;
  padding: 10px;
  background-color: transparent;
  border: none;
  outline: solid 1px #6c7293;
  color: #6c7293;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.9;
  display: flex;
  &:last-child {
    color: #333;
    outline: solid 1px #333;
    margin-left:10px ;
  }
  &:hover {
    opacity: 1;
  }
`;

export const ContainerCheckbox = styled.div`
  width: 80%;
  height: 80px;
  overflow-y: scroll;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  &::-webkit-scrollbar{
    width: 10px;
  }
  &::-webkit-scrollbar-thumb{
    border: solid 3px #ffffff;
    background-color: #6c7293;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #6c7293;
    border-radius: 10px;
}
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
  margin: 3px 0px;
  align-items: center;
`;


export const TituloCheckbox = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0px;
  margin-bottom: 10px;
  color: #6c7293;
`;

export const SelectAtribute = styled.select`
background-color: #fff;
color: #6c7293;
`;