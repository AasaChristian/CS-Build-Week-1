import React, { useState, useCallback, useRef } from "react";
import produce from 'immer'
function Cell(){
    const [numRows, setNumRows] = useState(50);
    const [numCols, setnumCols] = useState(50);
    let [generations, setGenerations] = useState(0)
    const [speed, setSpeed] = useState(100)
    const [running, setRunning] = useState(false)
    const opperations = [
        [0,1],
        [0, -1],
        [1,-1],
        [-1,1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0],
    ]
    const [grid, setGrid] = useState(() => {
    const rows = []
        for (let i = 0; i < numRows; i++){
         rows.push(Array.from(Array(numCols), () => 0))   
        }
        return rows
    });
    const [newGrid, setNewGrid] = useState(() => {
        const rows = []
            for (let i = 0; i < numRows; i++){
             rows.push(Array.from(Array(numCols), () => 0))   
            }
            return rows
        });

    const runningRef = useRef(running);
    runningRef.current = running;

    const runsimmulation = useCallback(() => {
        if (!runningRef.current){
            return;
        }
        setGrid((g) => {
            return produce(g, gridCopy => {
            for (let i = 0; i< numRows; i++){
                for (let k = 0; k< numRows; k++){
                    let neighbors = 0;
                    opperations.forEach(( [x, y]) => {
                        const newI = i + x;
                        const newK = k + y;
                        if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols){
                            neighbors += g[newI][newK]
                        }
                    })
                    if (neighbors < 2 || neighbors> 3){
                        gridCopy[i][k] = 0;
                    } else if (g[i][k] === 0 && neighbors === 3){
                        gridCopy[i][k] = 1
                    }
                }
            }   setGenerations(generations++)
             
            })           
        })


        setTimeout(runsimmulation, speed)
        
    }, [])

    const fixSize = () =>{
        if (numCols == 50){
            setnumCols(100) 
            
        }else{
            setnumCols(50) 
        }

        if (numRows == 50){
            setNumRows(100)
        }else{
            setNumRows(100)
        }
    }

    const clear = (x) => {
        x.preventDefault()
        setGrid(newGrid)
        setGenerations(0)
      }

    function arryClone(arr){
        return(JSON.parse(JSON.stringify(arr)))
      }
    let gridCopy = arryClone(grid);
    const seed = ()=>{
        for (let i = 0; i<numRows; i++){
          for (let j = 0; j<numCols; j++){
            if (Math.floor(Math.random() * 10) === 1){
              gridCopy[i][j] = true;
              
            }
          }
        }
        console.log(gridCopy)
        setGrid(gridCopy)
        console.log("here")
      }
 const speedFun = () => {
     if (speed > 50){
         setSpeed(speed/2)
     }else{
         setSpeed(1000)
     }
 }
return(
    <div>
        <p
        style={{
            display: 'inline-block',
            border: 'solid black 1px',
            paddingLeft : '5%',
            paddingRight: '5%'

        }}
        >The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
<ol>
    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
</ol>




These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
<ul>
    <li>Any live cell with two or three live neighbours survives.</li>
    <li>Any dead cell with three live neighbours becomes a live cell.</li>
    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
</ul>



The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.</p>
<section>
        <p>{generations}</p>
        </section>
        <button onClick={clear}>Clear</button>
<button 
onClick={fixSize}>Flip Me</button>
<button
type='submit'
onClick={seed}>Auto-Fill</button>
<button
onClick={ () => {
    setRunning(!running);
    runningRef.current = true;
    runsimmulation()
}

}
>{running ? 'stop' : 'start'}</button>
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
    }}>
    {grid.map((rows , i) =>
        rows.map((col, k) => <div 
        onClick={() =>{
            const newGrid = produce(grid, gridCopy => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1
            });
            setGrid(newGrid)
        }}
        key={`${i}-${k}`}
        style={{
            width: 20,
             height: 20,
             backgroundColor: grid[i][k]? 'red' : undefined,
            border: 'solid 1px black'}} />)
             )}
             </div>
</div>
)
}

export default Cell


