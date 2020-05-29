import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import './App.css';
import Cell from './Cell'


function App() {
  const [inv, setInv] = useState()
  const rows = 25
  const cols = 25
  const [generations, setGenerations] = useState(0)
  const [loops, setLoops] = useState(100)
  const [load, setLoad] = useState(false)
  const [grid, setGrid] = useState(
    Array(rows).fill().map(() => Array(cols).fill(
    false
    ))
  );
  const [newGrid, setNewGrid] = useState(
    Array(rows).fill().map(() => Array(cols).fill(
      false
      ))
  )


const seed = ()=>{
  for (let i = 0; i<rows; i++){
    for (let j = 0; j<cols; j++){
      if (Math.floor(Math.random() * 10) === 1){
        gridCopy[i][j] = true;
        
      }
    }
  }
  console.log(gridCopy)
  setGrid(gridCopy)
  console.log("here")
}

  function arryClone(arr){
    return(JSON.parse(JSON.stringify(arr)))
  }

let gridCopy = arryClone(grid);

  const selectBox = (row, col) => {
  gridCopy[row][col] = !gridCopy[row][col]
  setGrid(gridCopy)
  }

  const play = (grid) => {
    let g = grid
    let g2 = arryClone(grid)
    for (let i = 0; i< rows; i++){
      for (let j = 0; j< cols; j++){
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i -1][j -1]) count++;
        if (i > 0 && j < cols -1 ) if (g[i -1][j +1]) count++;
        if (j < cols -1 ) if (g[i][j +1]) count++;
        if (j > 0) if (g[i][j -1]) count++;
        if (i < rows -1) if (g[i +1 ][j]) count++;
        if (i < rows -1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < rows -1 && cols -1) if(g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
      setGrid(g2)
    }
    
    setGenerations(generations + 1 )
    // console.log(generations, "Gens")
  }
let intervalId;

function playButton() {
 clearInterval(intervalId)
 intervalId = setInterval(play(grid), 1000)
  }

const stop = (x) => {
    x.preventDefault()
    console.log("stop")
    clearInterval(intervalId)
  }
  const clear = (x) => {
    x.preventDefault()
    setGrid(newGrid)
    setGenerations(0)
  }

  return(
  <div>
    <h2>The Game of Life</h2>
    {/* <Grid
    grid = {grid}
    rows = {rows}
    cols = {cols}
    selectBox = {selectBox}
    />
    <button onClick={clear}>Clear</button>
    <button onClick={playButton}>Play</button>
    <button onClick={stop}>Stop</button>
    <button onClick={seed}>Sead</button>
  <h2>Generations: {generations}</h2> */}
  <Cell/>

  </div>
  )
}
 
function Grid(props){
const width = (props.cols * 17 ) + 22
let rowsArr = []
var boxClass = "";
  for (let i = 0; i< props.rows; i++){
    for (let j = 0; j<props.cols; j++){
      let boxId = i + "_" + j;
      boxClass = props.grid[i][j] ? "box on" : "box off";
      rowsArr.push(<Box
      boxClass= {boxClass}
      key= {boxId}
      boxId = {boxId}
      row={i}
      col={j}
      selectBox={props.selectBox}
      />
    )}
  }
  return(
    <div className= "grid" style= {{width: width}}>
      {rowsArr}
    </div>
  )
}


function Box(props){
  const selectBox = () => {
    props.selectBox(props.row, props.col)
  }
  return(
    <div className= {props.boxClass} 
    id={props.boxId}
    onClick={selectBox}
    ></div>
  )
}

export default App;
