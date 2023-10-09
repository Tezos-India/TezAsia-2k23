import WeeklyGameCard from "./WeeklyGamesCard";
import sudokuImg from '../assets/sudoku.png'
import whackImg from '../assets/whack-a-mole-bg.png'

const WeeklyGame =()=>{
    
return(
    <div className="Flex flex-column weekly-games w-full h-max justify-center items-center">
        <span className="text-[5rem] weekly-heading w-full h-max font-bold mb-3 "> Weekly Contest </span>
        <div className="flex justify-between">
        {/* <WeeklyGameCard image={sudokuImg} bidAmount='100' name ='Sudoku Game' deadline='October,31,2023'/> */}
        <WeeklyGameCard image={whackImg} bidAmount='1' name='Whack-A-Mole' deadLine='September,30,2023'  />
        </div>
    </div>
)

}

export default WeeklyGame;