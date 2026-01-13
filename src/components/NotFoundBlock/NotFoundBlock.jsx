import React from 'react'
import s from './NotFoundBlock.module.scss'

function NotFoundBlock() {
	return (
		<div className={s.root}>
			<span>😕</span>
			<br />
			<h1>Ничего не найдено</h1>
		</div>
	)
}

export default NotFoundBlock
