import '../styles/globals.css'
import {BrowserRouter, Route, Routes, Link} from 'react-dom'
import Layout from './components/layout/layout'
import TodoList from './todoList'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />

}

export default MyApp
