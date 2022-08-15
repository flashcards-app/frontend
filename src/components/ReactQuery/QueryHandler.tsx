import type { ComponentProps, FC, ReactElement } from 'react'

import { QueryStatus } from "react-query"

import ProgressSpinner from '../UI/Progress/ProgressSpinner'
import Skeleton from "../UI/Skeleton"


const loadingComponents: Record<string, FC> = {
	spinner:  (props: LoadingComponents["spinner"]) => <ProgressSpinner {...props}/>,
	skeleton: (props: LoadingComponents["skeleton"]) => <Skeleton {...props}/>,
}


interface LoadingComponents {
	spinner: ComponentProps<typeof ProgressSpinner>
	skeleton: ComponentProps<typeof Skeleton>
}

interface QueryHandlerProps<LoadingComponent extends keyof typeof loadingComponents> {
	children: ReactElement | undefined
	status: QueryStatus
	loadingComponent?: LoadingComponent
	loadingComponentProps?: LoadingComponent extends keyof LoadingComponents ? LoadingComponents[LoadingComponent] : never
}


const defaultProps = {
	loadingComponent:      'spinner',
	loadingComponentProps: {},
}

const QueryHandler = <LoadingComponent extends keyof typeof loadingComponents = "spinner">({
	children,
	status,
	loadingComponent,
	loadingComponentProps,
}: QueryHandlerProps<LoadingComponent> & typeof defaultProps) => {
	const LoadingComponent = loadingComponents[loadingComponent]

	return (
		<>
			{status === 'loading' && <LoadingComponent {...loadingComponentProps}/>}
			{status === 'error' && <div>It&apos;s seems that some error has been occurred</div>}
			{status === 'success' && children}
		</>
	)
}

QueryHandler.defaultProps = defaultProps

export default QueryHandler
