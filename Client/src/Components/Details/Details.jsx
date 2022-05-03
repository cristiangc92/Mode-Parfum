import { FaSearchMinus, FaSearchPlus, FaTimes } from "react-icons/fa";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Galeria,
  Detalles,
  Card,
  ContainerImg,
  Img,
  ImgZoom,
  Title,
  Container_Button,
  Caracteristicas,
  Hr,
  Subtitulo,
  Precio,
  Envio,
  H6,
  Button,
  Button2,
  ButtonEditar,
  Input,
  InputImg,
  Container_Edit,
  ContainerBtnZoom,
  ContainerCheckbox,
  Checkbox,
  Line,
  ContainerInput,
  Selection,
  Label,
  TituloCheckbox,
  Container_Stock,
  Stock,
} from "./styleDetails.jsx";
import {
  getProductId,
  resetStateDetail,
  setCartProduct,
  //   userUbication,
} from "../../redux/actions/actions";
import UpdatePerfum from "../Dashboard/CreateProduct/CreateProduct";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Details() {
  // const ubication = useSelector((state) => state.ubication);
  let token2 = JSON.parse(window.localStorage.getItem("loggedToken"));
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [currentPrice, setcurrentPrice] = useState(0);
  const [zoomImg, setZoomImg] = useState(false);
  const [height, setHeigth] = useState(80);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const data = detail[0];
  const amount = 1;

  useEffect(() => {
    dispatch(getProductId(id));
    // dispatch(userUbication());
    return () => {
      dispatch(resetStateDetail());
    };
  }, []);
  console.log(data);

  function handleEdit() {
    setEdit(true);
  }
  function cancel() {
    setEdit(false);
  }

  function zoom() {
    setZoomImg(!zoomImg);
  }

  function zoom_in() {
    setHeigth(height + 30);
  }
  function zoom_out() {
    setHeigth(height - 30);
  }

  function Login() {
    setLogin(!login);
  }

  function setStatecurrentPrice(e) {
    console.log(currentPrice);
    setcurrentPrice(Number(e.target.name));
  }
  function handleAddCart(data) {
    dispatch(setCartProduct(data));
    navigate("/cart");
  }

  if (!edit && data) {
    if (zoomImg) {
      return (
        <>
          <ContainerBtnZoom>
            <FaTimes
              style={{
                fontSize: "3rem",
                color: "#00000049",
                marginRight: "30px",
                cursor: "pointer",
              }}
              onClick={zoom}
            />
            <FaSearchPlus
              style={{
                fontSize: "3rem",
                color: "#00000049",
                marginRight: "30px",
                cursor: "pointer",
              }}
              onClick={zoom_in}
            />
            <FaSearchMinus
              style={{
                fontSize: "3rem",
                color: "#00000049",
                marginRight: "30px",
                cursor: "pointer",
              }}
              onClick={zoom_out}
            />
          </ContainerBtnZoom>
          <ImgZoom
            style={{ height: `${height}vh` }}
            onClick={zoom}
            src={data.img}
          ></ImgZoom>
        </>
      );
    } else {
      return (
        <>
          <NavBar></NavBar>
          {token2 !== null && token2.isAdmin !== false ? (
            <>
              <ButtonEditar onClick={handleEdit}>Editar</ButtonEditar>
              <ButtonEditar onClick={Login}>login</ButtonEditar>
            </>
          ) : (
            false
          )}
          <Container>
            <Galeria>
              <ContainerImg onClick={zoom}>
                <Img src={data.img}></Img>
              </ContainerImg>
            </Galeria>
            <Detalles>
              <Card>
                <Title>
                  {`${data.name}`}
                  <Subtitulo>{data.brand.name}</Subtitulo>
                </Title>
                <Caracteristicas style={{ marginBottom: "5px" }}>
                  {data.notes.map((note, i) =>
                    i === 0 ? `${note.name}` : `, ${note.name}`
                  )}
                </Caracteristicas>
                <Caracteristicas>{data.family.name}</Caracteristicas>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Precio>{`$ ${data.price[currentPrice][1].toLocaleString(
                    "es-AR"
                  )}`}</Precio>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {data.price.map((price, i) => {
                      return (
                        <Selection
                          style={
                            Number(currentPrice) !== i
                              ? { opacity: ".5" }
                              : { opacity: "1" }
                          }
                          onClick={(e) => setStatecurrentPrice(e)}
                          name={i}
                        >{`${price[0]}ml`}</Selection>
                      );
                    })}
                  </div>
                </div>
                <Container_Stock>
                  Stock:
                  <Stock>
                    <h6> {data.stock[currentPrice]}</h6>
                  </Stock>
                </Container_Stock>
                <Stock>
                  {data.stock[currentPrice] < 4 &&
                  data.stock[currentPrice] > 0 ? (
                    <h6 style={{ color: "red" }}>
                      ¡Ultimos {data.stock[currentPrice]} disponibles!
                    </h6>
                  ) : data.stock[currentPrice] === 0 ? (
                    <h6 style={{ color: "red" }}>¡Producto no disponible!</h6>
                  ) : (
                    <h1></h1>
                  )}
                </Stock>
                {!token2 && (
                  <>
                    <Hr></Hr>
                    <Subtitulo>¿Te interesa el producto?</Subtitulo>
                    <Link className="link" to="/SignUp">
                      <Button2>¡Registrate!</Button2>
                    </Link>
                  </>
                )}
                <Hr></Hr>
                {/* {ubication.pais ? (
                  <>
                    <H6>
                      Te encuentras en{" "}
                      <b>{`${ubication.provincia}, ${ubication.pais}`}</b>
                    </H6>
                    <Envio>{`¡Llega gratis en ${
                      waitTime.find((time) => time.name === ubication.provincia)
                        ? waitTime.find(
                            (time) => time.name === ubication.provincia
                          ).tiempo
                        : "10 dias"
                    }!`}</Envio> */}
                {/* <div>
                      <H6>¡Puedes retirarlo hoy mismo!</H6>
                    </div>
                    <Hr style={{ marginBottom: "20px" }}></Hr>
                  </>
                ) : (
                  <>
                    <H6>
                      Haz click en permitir ubicacion para calcular tiempo de
                      envio
                    </H6>
                    <Envio>¡Llega gratis en ...!</Envio>
                    <Hr style={{ marginBottom: "30px" }}></Hr>
                  </>
                )} */}
                {data.stock[currentPrice] === 0 ? (
                  <Button disabled style={{ background: "gray" }}>
                    AGREGAR AL CARRITO
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleAddCart({
                        name: data.name,
                        img: data.img,
                        price: data.price[currentPrice],
                        amount: amount,
                        currentPrice,
                      })
                    }
                  >
                    AGREGAR AL CARRITO
                  </Button>
                )}
              </Card>
            </Detalles>
          </Container>
        </>
      );
    }
  } else if (edit) {
    return <UpdatePerfum />;
  } else {
    return <div>Loading...</div>;
  }
}

export default Details;
