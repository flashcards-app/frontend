import type { ComponentProps, FC, ReactElement } from 'react'
import ProgressSpinner from '../UI/Progress/ProgressSpinner'
import { QueryStatus } from "react-query"
import Skeleton from "../UI/Skeleton"
import ConditionalAnimation from "../UI/Animation/ConditionalAnimation"


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
	animateLoading?: boolean
	loadingComponent?: LoadingComponent
	loadingComponentProps?: LoadingComponent extends keyof LoadingComponents ? LoadingComponents[LoadingComponent] : never
}


const defaultProps = {
	loadingComponent:      'spinner',
	loadingComponentProps: {},
	animateLoading:        true,
}

const QueryHandler = <LoadingComponent extends keyof typeof loadingComponents = "spinner">({
	children,
	status,
	animateLoading,
	loadingComponent,
	loadingComponentProps,
}: QueryHandlerProps<LoadingComponent> & typeof defaultProps) => {
	const LoadingComponent = loadingComponents[loadingComponent]

	return (
		<>
			{animateLoading && (
					<ConditionalAnimation condition={status === 'loading'}
					                      instantEntrance
					                      timeout={300}>
						<LoadingComponent {...loadingComponentProps}/>
					</ConditionalAnimation>
				)}
			{!animateLoading && status === 'loading' && <LoadingComponent {...loadingComponentProps}/>}
			{status === 'error' && <div>It&apos;s seems that some error has been occurred</div>}
			{status === 'success' && children}
		</>
	)
}

QueryHandler.defaultProps = defaultProps

export default QueryHandler
