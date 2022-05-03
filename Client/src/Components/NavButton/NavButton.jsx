import React from 'react'
import styled from 'styled-components'

function NavButton(props) {
  return (
    <NavIcon>
    <div onClick={props.handleClick} 
         className={`icon nav-icon-6 ${props.click ? 'open' : ''}`}
    >
        <span></span>
        <span></span>
        <span></span>
    </div>
    </NavIcon>
  )
}

export default NavButton;

const NavIcon = styled.div`
.nav-icon-6{
  width: 30px;
  height: 30px;
  top: 0.4rem;
  margin: 10px 10px;
  position: relative;
  cursor: pointer;
  display: inline-block;
}
.nav-icon-6 span{
  background-color:#2a2a2a;
  position: absolute;
  border-radius: 2px;
  transition: .3s cubic-bezier(.8, .5, .2, 1.4);
  width:100%;
  height: 3px;
}
.nav-icon-6 span:nth-child(1){
  top:0px;
  left: 0px;
}
.nav-icon-6 span:nth-child(2){
  top:10px;
  left: 0px;
}
.nav-icon-6 span:nth-child(3){
  bottom:6px;
  left: 0px;
}
.nav-icon-6:not(.open):hover span:nth-child(1){
  transform:  scaleY(1.2);
  left: -5px;
}
.nav-icon-6:not(.open):hover span:nth-child(2){
  transform: rotate(5deg) scaleY(1.1);
}
.nav-icon-6:not(.open):hover span:nth-child(3){
  transform:  scaleY(1.2);
  left: 5px;
}
.nav-icon-6.open span:nth-child(1){
  background-color: #848095;
  transform: rotate(45deg) scaleX(0.7);
  top: 13PX;
  left: -8px;
}
.nav-icon-6.open span:nth-child(2){
  transform: scale(0);
  transition-duration: 50ms
}
.nav-icon-6.open span:nth-child(3){
  background-color: #645d85;
  transform: rotate(-45deg) scaleX(0.7);
  top: 13PX;
  left: 7px;
}
`