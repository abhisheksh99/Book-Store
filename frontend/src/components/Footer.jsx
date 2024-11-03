import React from 'react'

const Footer = () => {
    const getFullYear= new Date().getFullYear()
  return (
    <footer className='flex -items-center justify-center'>
        Copyright &copy; {getFullYear}

    </footer>

  )
}

export default Footer
