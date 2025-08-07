import {filterChange} from "../reducers/filterReducer.js";
import { useDispatch } from 'react-redux'

const AnecdotesFilter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filterText = event.target.value
        dispatch(filterChange(filterText))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input name='anecdoteFilterText' onChange={handleChange} />
        </div>
    )
}

export default AnecdotesFilter