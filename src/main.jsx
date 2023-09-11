
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();


// this will help not to go in stale within seconds
//  const queryClient = new QueryClient({
//   defaultOptions:{queries:{staleTime:1000 * 60 * 5}}
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools/>
  </QueryClientProvider>,
)
