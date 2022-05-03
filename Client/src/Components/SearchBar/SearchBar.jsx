import React, {useState} from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {getProductsByName, getProducts} from '../../redux/actions/actions'

function SearchBar() {
    const dispatch = useDispatch();
    const [state, setState] = useState('');

    function handleChange(event){
        event.preventDefault()
        setState(event.target.value)
        if(event.target.value === ''){
            dispatch(getProducts())
        }
    };

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getProductsByName(state))
        
    }

    return(
        <form onSubmit={event => handleSubmit(event)}>
            <InputNavBar 
                onChange={handleChange} 
                name='input' value={state} 
                type="text" 
                placeholder="Buscar" 
            />
        </form>
    )
}

export default SearchBar


const InputNavBar = styled.input`
    margin-top:0.5rem ;
    width: 450px;
    height: 15px;
    border: none;
    padding: 15px;
    background-color: #ececec;
    border-radius: 40px;
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    font-family: 'Poppins', sans-serif; 
    font-size: 1rem;
    transition: all .2s ease;

    &:hover{
        background-color: #f5f5f5;
        box-shadow: 0 5px 10px #d4d4d4;
    }

    &:focus{
        background-color: #f5f5f5;
        box-shadow: 0 5px 10px #dfdfdf;
        outline: none;
    }

    @media(max-width: 1326px){ 
        width: 270px;
    }

    @media(max-width: 1265px){ 
        width: 250px;
    }

    @media(max-width: 1128px){ 
        width: 180px;
    }
    @media(max-width: 1056px){ 
        display: none;
    }
`