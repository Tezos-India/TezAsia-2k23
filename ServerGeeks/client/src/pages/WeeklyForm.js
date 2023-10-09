import { createWeeklyOperation } from "../utils/operation";

const WeeklyForm =()=>{
    const CreateGame = async() => {
        // alert(e.option.value);
        try {
            await createWeeklyOperation("wack-a-mole");
            alert("Weekly Game Created")
          } catch (error) {
            alert(error);
            throw error;
          }
    }
    return(
        <div className=" weekly-div">

        <h1 >Weekly Contest Form </h1>
            <form onSubmit={() => CreateGame()} className="flex flex-col h-max w-max justify-between weekly-form">
            <label >
			<span className="weekly-form-label">Select an option:</span>
				<select required>
                    <option value="wack-a-mole">Wack-A-Mole</option>
                    <option value="sudoku">Sudoku</option>
			    </select>
		</label>

        <label>
            <span className="weekly-form-label" >Start Time: </span>
            <input required type='datetime-local' /> 
        </label>
        <label>
            <span className="weekly-form-label" >End Time: </span>
            <input required type='datetime-local' /> 
        </label>
        <button type="submit">
            Create Game
        </button>

        </form>
        </div>
    )
}

export default WeeklyForm