import React from 'react'
import { Menu } from 'antd'
import classNames from 'classnames'

const Divider = Menu.Divider

const ESDivider = ({ className, ...props }) => {
  const classes = classNames(
    'es-divider',
    className
  )
  
  return (
    <Divider className={classes} {...props} />
  )
}

export default ESDivider
