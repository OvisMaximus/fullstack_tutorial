import ReactDOM from 'react-dom/client'
import './index.css'
import Notes from "./Notes.jsx";
import {StrictMode} from "react";
import AddressBook from "./AddressBook.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AddressBook/>
        <Notes/>
    </StrictMode>
)


