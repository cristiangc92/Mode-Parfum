import styled from "styled-components";
export const NavContainer = styled.nav`
  width: 100%;
  padding: 5px;
  background-color: #fffffff8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1px solid #f1f1f1;
  position: fixed;
  z-index: 3;

  * {
    @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
    font-family: "Poppins", sans-serif;
  }

  img {
    position: relative;
    top: 0.5rem;
    margin-left: 1rem;
  }
  #logout {
    margin: 25px 12px 25px 0;
    background-color: #fff;
    padding: 5px 20px;
    color: #414141;
    letter-spacing: 2px;
    text-decoration: none;
    font-size: 15px;
    transition: 0.1s;
    border-radius: 5px;
    border: none;
    left: 70px;
    box-shadow: 0 5px 10px rgba(255, 255, 255, 0.568);
    &:hover {
      color: black;
      // -webkit-transition: 0.8s;
      transition: 0.8s;
      border: none;
      text-shadow: 0 0 10px #f1f3f7b5, 5px 8px 19px #ffffffb5,
        0px 0px 20px #3e4350fa;
      cursor: pointer;
    }
  }
  a {
    letter-spacing: 2px;
    font-weight: 600;
    color: #2a2a2a;
    text-decoration: none;
    margin-right: 3rem;
    @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
    font-family: "Poppins", sans-serif;
    transition: all 0.2s ease;

    &:hover {
      color: #9693a3;
    }
  }

  .burger-media {
    @media (min-width: 1045px) {
      display: none;
    }
  }

  /* .user-logg{ 
        display: flex;
        margin-left: 50px;
        list-style: none;
        position: fixed; 
        right: 10rem;
        top:2rem; 
        transition: all 500ms ease;

        .submenu-logout{
            list-style:none;  
            margin-top: 20px;
            position: relative; 
            background-color: #fff;  
            box-shadow: 3px 10px 10px rgba(0,0,0,0.2); 
            height: 10rem;
            li{ 
                font-size: 14px; 
                position: relative; 
            }
    
            button{ 
                // margin: 25px 0 25px 0; 
                margin-top: 5px;
                background-color: #ededed;
                padding: 5px 20px;
                color: #414141;
                letter-spacing: 2px;
                text-decoration: none;
                font-size: 15px;
                transition: 0.1s;
                border-radius: 5px;
                border: none;
                left: 70px;
                box-shadow: 0 5px 10px rgba(255, 255, 255, 0.568);
                &:hover {
                  color: black;
                  box-shadow: 0 0 10px #8893b1b5, 0 0 10px #8893b1b5, 0 0 15px #8893b1b5;
                  transition: 0.8s;
                  border: none;
                  color: white;
                  background-color: #8893b1b5;
                  cursor: pointer;
                }
            }
            display: none;
        }
        &:hover { 

            .submenu-logout{ 
                display: block;
            }
        }
        
    }
     */

  .nav-links-media {
    position: absolute;
    top: 300px;
    bottom: 0;
    left: -2000px;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    text-align: center;
    transition: all 0.1s ease;

    a {
      font-size: 2rem;
      display: block;
      font-weight: 600px;
    }

    @media (min-width: 1045px) {
      position: initial;
      margin: 0;
      a {
        font-size: 1rem;
        display: inline;
      }
    }
  }

  .nav-links-media.active {
    width: 100vw;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 160px;
    left: 0;
    right: 0;
    text-align: center;
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(11px);
    height: max-content;
    padding: 21px;

    a {
      font-size: 1.5rem;
      margin-top: 2rem;
      font-weight: 200;

      &:hover {
        color: #645d85;
      }
    }

    .fav_nav {
      position: relative;
      left: 20px;
    }

    .person_icon_nav {
      position: relative;
      left: 100px; 
    } 

    .bag_nav {
      position: relative;
      left: 13px;
    }
  }

  .bag_nav {
    font-size: 1.7rem;
    position: relative;
    top: 4.3px;
    margin-left: 1rem;
  }

  .fav_nav {
    font-size: 1.5rem;
    position: relative;
    top: 0.3rem;
  }

  .person_icon_nav_ahre {
    font-size: 2rem;
    position: relative;
    top: 0.4rem;
    left: 1.5rem;
    margin-right: 1.7rem;
  }
  .person_icon_nav-ndeah{
    color: white;
    cursor: pointer;
    background-color: rgb(136 115 155);
    border-radius: 9999px;
    padding: 5px;
    position: relative;
    top: 0.48rem;
    left: -4.5rem;
    font-size: 1.5rem;
    box-shadow: rgb(0 0 0) 0px 0px 4px;
  }
  .person_icon_nav {
    font-size: 2rem;
    position: relative;
    top: 0.4rem;
    margin-right: 4.7rem;
  }

  .person_icon_nav:hover {
    color: #9693a3;
    cursor: pointer;
  }

  .span-cart {
    padding: 2px 5px;
    background-color: #89739b;
    color: #ebeaea;
    font-weight: 600;
    border-radius: 100%;
    position: relative;
    top: -15px;
    left: -6px;
    letter-spacing: 0cm;
  }
  }
`;

export const BackGroundDiv = styled.div`
  position: absolute;
  background-color: #ffffff;
  top: -1000px;
  height: -1300px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 0.3s ease;
  &.active {
    top: 0;
    left: 0;
    width: 100%;
    height: 75%;
  }
`;
export const DropDown = styled.div`
  position: absolute;
  width: max-content;
  height: 15px;
  z-index: 4;
  background-color: #89739b;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;
  padding: 18px 15px 32px 14px;
  top: 120px;
  right: 100px;
  border-radius: 3px;
  animation: forwards animation 300ms;
  @keyframes animation {
    to {
      height: 40px;
    }
  }
`;

export const Button_DropDown = styled.div`
  cursor: pointer;
  color: #fff;
  &:hover {
    border-bottom: 1px solid #fff;
  }
`;
