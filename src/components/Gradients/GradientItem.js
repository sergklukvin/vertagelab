import React from 'react';
import './GradientItem.scss'


function GradientItem({data}) {

    return (
        <div className="gradientBox" style = {{background: `linear-gradient(to right, ${data[0]}, ${data[1]})`}}>
            <span>{data[0]}</span>
            <span>{data[1]}</span>
        </div>
    )
}

export default GradientItem
