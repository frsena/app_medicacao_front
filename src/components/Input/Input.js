import React, { forwardRef } from 'react';
import './Input.css';


export default forwardRef(function  Input(props, ref) {

    return (
        <>
        {props.label && <label>{props.label}</label>}
        <input {...props} ref={ref}/>
        </>
    )
})



        