import ReactDOM from 'react-dom/client'
import AnecdotesApp from './AnecdotesApp.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {NotificationContextProvider} from "./NotificationContext.jsx";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
            <AnecdotesApp/>
        </NotificationContextProvider>
    </QueryClientProvider>
)