import { useState } from 'react'

import { css } from "@emotion/css"
import { motion } from "framer-motion"
import tw from "twin.macro"

import { Typography, Tabs, Tab, ErrorPage403, ErrorPage404, ErrorPage404ServerSide, ErrorPage500 } from '../components/UI'
import SpaceParticles from "../components/UI/ErrorPages/SpaceParticles"


const creditItems: Record<string, { creditName: string; creditLink: string }> = {
	404:             {
		creditName: 'helloChad',
		creditLink: 'https://codepen.io/hellochad',
	},
	403:             {
		creditName: 'marianab',
		creditLink: 'https://codepen.io/marianab',
	},
	'404ServerSide': {
		creditName: 'eroxburgh',
		creditLink: 'https://codepen.io/eroxburgh',
	},
	500:             {
		creditName: 'quinlo',
		creditLink: 'https://codepen.io/quinlo',
	},
}

export default () => {
	const [tab, setTab]       = useState('404')
	const [credit, setCredit] = useState(creditItems['404'])
	const {
		      creditName,
		      creditLink,
	      }                   = credit

	const changeTab = (tab: string) => {
		setTab(tab)
		setCredit(creditItems[tab])
	}

	return (
		<div dir="ltr">
			{tab !== '500' && <SpaceParticles/>}

			<motion.div className={css`${tw`flex justify-center w-full pt-5 absolute z-[50]`}`}
			            initial={{
				            opacity: 0,
				            y:       -40,
			            }}
			            transition={{
				            duration: 1.2,
			            }}
			            animate={{
				            opacity: 1,
				            y:       0,
			            }}>
				<Tabs dir="ltr">
					<Tab onClick={() => changeTab('404')}>
						404
					</Tab>
					<Tab onClick={() => changeTab('403')}>
						403
					</Tab>
					<Tab onClick={() => changeTab('404ServerSide')}>
						404 Server Side
					</Tab>
					<Tab onClick={() => changeTab('500')}>
						500
					</Tab>
				</Tabs>
			</motion.div>

			<div className="absolute flex w-full h-full bottom-0 justify-center items-end">
				<Typography as="p" className="justify-self-center mb-5 z-[4]">
					Credit to&nbsp;

					<a className="font-bold" href={creditLink}>{`@${creditName}`}</a>
				</Typography>
			</div>


			<div className="absolute w-full h-full top-0">
				{tab === '404' && <ErrorPage404/>}

				{tab === '403' && <ErrorPage403/>}

				{tab === '404ServerSide' && <ErrorPage404ServerSide/>}

				{tab === '500' && <ErrorPage500/>}
			</div>
		</div>
	)
}
