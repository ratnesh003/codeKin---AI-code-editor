"use client"

import React from 'react'
import { useParams } from 'next/navigation'

const FileEditPage = () => {
    const { id } = useParams()
  return (
    <div>FileEditPage : {id}</div>
  )
}

export default FileEditPage