import React from 'react'
import { Menu } from 'antd'
import classNames from 'classnames'

const SubMenu = Menu.SubMenu

const ESSubMenu = ({ className, ...props }) => {
  const classes = classNames(
    'es-sub-menu',
    className
  )
  
  return (
    <SubMenu className={classes} {...props} />
  )
}

export default ESSubMenu
