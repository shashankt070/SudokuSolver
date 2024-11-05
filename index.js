const grid = document.querySelector('.main');
const display = document.querySelector('.display');
const solve = document.querySelector('#solve');
const reset = document.querySelector('#reset');
let arr = new Array(9);
for(let i=0;i<9;i++)
{
    arr[i] = new Array(9);
}
function set(){
for(let i=0;i<9;i++)
{
    for(let j = 0;j<9;j++)
    {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.max = '9';
        input.id = `input-${i}-${j}`;
        input.className = 'input';
        grid.appendChild(input);
    }
}
}
set();

solve.addEventListener('click', function(){
    store();
    solution();
});

reset.addEventListener('click', function(){
   restore();
})

function restore()
{
    display.classList.remove('active');
    grid.classList.remove('inactive');
    grid.innerHTML = '';
    set();
}

function store()
{
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let input = document.querySelector(`#input-${i}-${j}`);
            arr[i][j] = parseInt(input.value) || 0; 
        }
    }
}

async function solution()
{
    let solved = await isItSudoku(arr);
    if (!solved) {
        alert('Invalid Sudoku');
    } else {
        grid.classList.add('inactive'); 
        display.classList.add('active'); 
        display.innerHTML = ''; 
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '1'; 
                input.max = '9'; 
                input.readOnly = true;
                input.value = arr[i][j] > 0 ? arr[i][j] : ''; 
                display.appendChild(input);
            }
        }
    }
}

async function isItSudoku(matrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            if (matrix[i][j] === 0) {
                for (let k = 1; k <= 9; k++) {

                    if (isValid(i, j, k, matrix)) {
                        matrix[i][j] = k; 

                        if (await isItSudoku(matrix)) {
                            return true; 
                        } else {
                            matrix[i][j] = 0; 
                        }
                    }
                }
                return false; 
            }
        }
    }
    return true; 
}


function isValid(row, col, k, matrix) {

    for (let i = 0; i < 9; i++) {
        if (matrix[row][i] === k) return false;
    }

    for (let i = 0; i < 9; i++) {
        if (matrix[i][col] === k) return false;
    }


    let rowStart = Math.floor(row / 3) * 3;
    let colStart = Math.floor(col / 3) * 3;

    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
            if (matrix[i][j] === k) return false;
        }
    }
    return true; 
}



