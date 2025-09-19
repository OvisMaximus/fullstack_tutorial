import { useDispatch } from 'react-redux'
import {
    FILTER_ALL,
    FILTER_IMPORTANT,
    FILTER_NOT_IMPORTANT,
    setFilter,
} from '../reducers/filterReducer'

const VisibilityFilter = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <br />
            all
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(setFilter(FILTER_ALL))}
            />
            <br />
            important
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(setFilter(FILTER_IMPORTANT))}
            />
            <br />
            nonimportant
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(setFilter(FILTER_NOT_IMPORTANT))}
            />
            <br />
            <br />
        </div>
    )
}

export default VisibilityFilter
