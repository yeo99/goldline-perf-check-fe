import React from 'react'
import './PageTitle.scss'

function PageTitle(props) {
  return (
    <div className='page-title-container'>
        {props.pageTitle}
    </div>
  )
}

export default PageTitle