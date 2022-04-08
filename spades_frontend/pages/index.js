import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from './components/layout/layout'
import TodoList from './todoList'
import Route from 'react'

import { useEffect, useState } from "react";


export default function Home() {




  return (
    
    <>
       {/* <Layout />  */}
      <TodoList/>

    </>
  )
}
