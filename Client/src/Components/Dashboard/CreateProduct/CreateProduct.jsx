import NavBar from "../../NavBar/NavBar";
import { useEffect, useState } from "react";
import {
  Galeria,
  Detalles,
  Card,
  ContainerImg,
  Img,
  Container_Button,
  ButtonEditar,
  Input,
  InputImg,
  Container_Edit,
  ContainerCheckbox,
  Checkbox,
  Line,
  ContainerInput,
  TituloCheckbox,
  ColumnHeader,
  Title,
  Label,
} from "./styleCreateProduct.jsx";
import imgDefault from "../img/img_default.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getAllBrand,
  getNotes,
} from "../../../redux/actions/actions";
import toast, { Toaster } from "react-hot-toast";

function UpdatePerfum() {
  const [notas, setNotas] = useState([]);
  const [filterNotas, setFilterNotas] = useState("");
  const [cant_botellas, setCant_botellas] = useState(1);
  const [botellas, setBotellas] = useState([""]);
  const notes = useSelector((state) => state.notes);
  const brands = useSelector((state) => state.brands);
  const familys = useSelector((state) => state.familias);
  const dispatch = useDispatch();
  const genres = ["masculino", "femenino", "unisex"];
  const types = ["fragancia", "perfume"];
  const [data, setData] = useState({
    name: "",
    idBrand: "",
    genre: "",
    type: "",
    idFamily: "",
    notes: "",
    price: [["", ""]],
    img: ``,
    available: true,
    stock: [""],
  });

  useEffect(() => {
    dispatch(getNotes());
    dispatch(getAllBrand());
    setNotas(notes);
  }, [notes, dispatch]);
  function handleCant_Botellas(e) {
    let aux = [];
    for (let i = 0; i < e.target.value; i++) {
      aux.push("");
    }

    let arr = data.price;
    if (arr.length === 1) {
      arr.push(["", ""]);
      setData((prev) => {
        return {
          ...prev,
          price: arr,
        };
      });
      let stock = data.stock;
      stock.push("");
      setData((prev) => {
        return {
          ...prev,
          stock: stock,
        };
      });
    } else if (Number(e.target.value) === 1 && arr.length === 2) {
      arr.pop();
      setData((prev) => {
        return {
          ...prev,
          price: arr,
        };
      });
      let stock = data.stock;
      stock.pop();
      setData((prev) => {
        return {
          ...prev,
          stock: stock,
        };
      });
    }

    setBotellas(aux);
    setCant_botellas(e.target.value);
  }

  function handleChangeInput(e) {
    console.log(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleCheckTypes(e) {
    setData((prev) => {
      return {
        ...prev,
        type: e.target.value,
      };
    });
  }

  function handleCheckGenres(e) {
    setData((prev) => {
      return {
        ...prev,
        genre: e.target.value,
      };
    });
  }

  function handleCheckFamilys(e) {
    console.log(e.target.value)
    setData((prev) => {
      return {
        ...prev,
        idFamily: parseInt(e.target.value),
      };
    });
  }

  function handleCheckBrands(e) {
    setData((prev) => {
      return {
        ...prev,
        idBrand: parseInt(e.target.value),
      };
    });
  }

  function handleCheck(e) {
    if (!data.notes.includes(e.target.value)) {
      setData((prev) => {
        return {
          ...prev,
          notes: data.notes
            ? [...data.notes, e.target.value]
            : [e.target.value],
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          notes: data.notes.filter((note) => note !== e.target.value),
        };
      });
    }
    console.log(data.notes);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createProduct(data));
    toast.success("Se creo tu producto");
    setFilterNotas("");
    setNotas(notes);
  }

  function handleFilterNotas(e) {
    setFilterNotas(e.target.value);
    setNotas(notes.filter((nota) => nota.name.includes(e.target.value)));
  }
  function setPrecios(e) {
    let arr = data.price;
    arr[e.target.name][1] = parseInt(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        price: arr,
      };
    });
  }
  function setMl(e) {
    // if(!isNaN(parseInt(e.target.value))){
    let arr = data.price;
    arr[e.target.name][0] = parseInt(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        price: arr,
      };
    });
    // }
    // else{
    //   alert("El campo solo admite números")
    // }
  }

  function setStock(e) {
    let arr = data.stock;
    arr[e.target.name] = parseInt(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        stock: arr,
      };
    });
    console.log(data);
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Container_Edit>
        <Galeria>
          <ContainerImg>
            <Img src={data.img ? data.img : imgDefault} className="img"></Img>
            <InputImg
              value={data.img}
              placeholder="Url Imagen"
              onChange={handleChangeInput}
              name="img"
              type="text"
            />
          </ContainerImg>
        </Galeria>
        <Detalles>
          <Card style={{ alignItems: "center" }}>
            <ContainerInput>
              {/* <Label>Nombre: </Label> */}
              <Input
                placeholder="Nombre"
                value={data.name}
                onChange={handleChangeInput}
                name="name"
                type="text"
              />
            </ContainerInput>
            <ContainerInput>
              {/* <Label>Marca: </Label> */}
              {/* <Input
              placeholder="Marca"
                value={data.marca}
                onChange={handleChangeInput}
                name="marca"
                type="text"
              /> */}
            </ContainerInput>
            <ContainerCheckbox>
              <TituloCheckbox
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0px",
                }}
              >
                Géneros:
              </TituloCheckbox>
              <select
                onChange={handleCheckGenres}
                style={{ backgroundColor: "black", color: "white" }}
              >
                {genres?.map((genre) => {
                  return <option value={genre}>{genre}</option>;
                })}
              </select>
              {/* <Checkbox>
                    <label style={{ minWidth: "max-content" }} forhtml={genre}>
                      {genre}
                    </label>
                    <Line style={{ marginLeft: "5px" }}></Line>
                      <input
                //       type="radio"
                //       onChange={handleCheckGenres}
                //       value={genre}
                //       name="generos"
                //       // checked={data.notas.includes(nota.name) ? true : null}
                //       id={genre}
                //       key={genre}
                //     />
                //   </Checkbox> */}
            </ContainerCheckbox>
            <ContainerCheckbox>
              <TituloCheckbox
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0px",
                }}
              >
                Tipos:
              </TituloCheckbox>
              <select
                onChange={handleCheckTypes}
                style={{ backgroundColor: "black", color: "white" }}
              >
                {types?.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
              {/* // <Checkbox>
                //   <label style={{ minWidth: "max-content" }} forhtml={type}>
                //     {type}
                //   </label>
                //   <Line style={{ marginLeft: "5px" }}></Line>
                //   <input
                //     type="radio"
                //     onChange={handleCheckTypes}
                //     value={type}
                //     name="tipos"
                //     // checked={data.notas.includes(nota.name) ? true : null}
                //     id={type}
                //     key={type}
                //   />
                // </Checkbox> */}
            </ContainerCheckbox>
            <ContainerCheckbox>
              <TituloCheckbox
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0px",
                }}
              >
                Familia:
              </TituloCheckbox>
              <select
                onChange={handleCheckFamilys}
                style={{ backgroundColor: "black", color: "white" }}
              >
                {familys?.map((family, i) => {
                  return (
                    <option value={i+1} id={i+1} name="familias">
                      {family.name}
                    </option>
                  );
                })}
              </select>
              {/* // <Checkbox>
                //   <label style={{ minWidth: "max-content" }} forhtml={family.name}>
                //     {family.name}
                //   </label>
                //   <Line style={{ marginLeft: "5px" }}></Line>
                //   <input
                //     type="radio"
                //     onChange={handleCheckFamilys}
                //     value={family.name}
                //     name="familias"
                //     // checked={data.notas.includes(nota.name) ? true : null}
                //     id={i+1}
                //     key={family.name}
                //   />
                // </Checkbox> */}
            </ContainerCheckbox>
            <ContainerCheckbox>
              <TituloCheckbox
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0px",
                }}
              >
                Marcas:
              </TituloCheckbox>
              <select
                onChange={handleCheckBrands}
                style={{ backgroundColor: "black", color: "white" }}
              >
                {brands?.map((brand, i) => {
                  return (
                    <option value={i+1} id={i+1}>
                      {brand.name}
                    </option>
                  );
                })}
              </select>
              {/* // <Checkbox>
                //   <label style={{ minWidth: "max-content" }} forhtml={brand.name}>
                //     {brand.name}
                //   </label>
                //   <Line style={{ marginLeft: "5px" }}></Line>
                //   <input
                //     type="radio"
                //     onChange={handleCheckBrands}
                //     value={brand.name}
                //     name="marca"
                //     // checked={data.notas.includes(nota.name) ? true : null}
                //     id={i+1}
                //     key={brand.name}
                //   />
                // </Checkbox> */}
            </ContainerCheckbox>
            <ContainerInput>
              <Label>Cantidad de Botellas :</Label>
              <Input
                placeholder="Cantidad de Botellas"
                value={cant_botellas}
                onChange={handleCant_Botellas}
                name="nombre"
                type="number"
                min={1}
                max={2}
                style={{ width: "40%" }}
              />
            </ContainerInput>

            <ContainerCheckbox style={{ height: "100px" }}>
              <TituloCheckbox>Stock:</TituloCheckbox>
              {botellas.map((botella, i) => {
                return (
                  <Checkbox>
                    <Input
                      type="number"
                      style={{ width: "35%", padding: "2px", margin: "2px" }}
                      onChange={setMl}
                      value={data.price[i][0]}
                      name={i}
                      key={`ml${i}`}
                      id={i}
                      placeholder={"ml"}
                    />
                    <label style={{ width: "20%" }} forhtml={i}>{`ml`}</label>
                    <Line style={{ width: "40%" }}></Line>
                    <Input
                      type="number"
                      style={{ width: "35%", padding: "2px", margin: "2px" }}
                      onChange={setStock}
                      value={data.stock[i]}
                      name={i}
                      key={`stock${i}`}
                      id={i}
                      placeholder="stock"
                    />
                  </Checkbox>
                );
              })}
            </ContainerCheckbox>
            <ContainerCheckbox style={{ height: "100px" }}>
              <TituloCheckbox>Precios:</TituloCheckbox>
              {botellas.map((botella, i) => {
                return (
                  <Checkbox>
                    <label
                      style={{ width: "20%" }}
                      forhtml={i}
                    >{`${data.price[i][0]}ml`}</label>
                    <Line style={{ width: "40%" }}></Line>
                    <Input
                      type="number"
                      style={{ width: "35%", padding: "2px", margin: "2px" }}
                      onChange={(e) => setPrecios(e)}
                      value={data.price[i][1]}
                      name={i}
                      key={`precios${i}`}
                      id={i}
                      placeholder="precio"
                    />
                  </Checkbox>
                );
              })}
            </ContainerCheckbox>
            <ContainerCheckbox>
              <TituloCheckbox
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0px",
                }}
              >
                Notas:
                <Line
                  style={{ width: "30%", backgroundColor: "#fff" }}
                ></Line>{" "}
                <Input
                  value={filterNotas}
                  onChange={handleFilterNotas}
                  placeholder="Buscar nota"
                  style={{ width: "50%", padding: "2px" }}
                ></Input>
              </TituloCheckbox>
              {notas?.map((note) => {
                return (
                  <Checkbox>
                    <label
                      style={{ minWidth: "max-content" }}
                      forhtml={note.name}
                    >
                      {note.name}
                    </label>
                    <Line style={{ marginLeft: "5px" }}></Line>
                    <input
                      type="checkbox"
                      onChange={handleCheck}
                      value={note.name}
                      checked={data.notes.includes(note.name) ? true : null}
                      id={note.name}
                      key={note.name}
                    />
                  </Checkbox>
                );
              })}
            </ContainerCheckbox>
            <Container_Button>
              <ButtonEditar onClick={handleSubmit}>Guardar</ButtonEditar>
              <ButtonEditar>Cancelar</ButtonEditar>
            </Container_Button>
          </Card>
        </Detalles>
      </Container_Edit>
    </>
  );
}

export default UpdatePerfum;
