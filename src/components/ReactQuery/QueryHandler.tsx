import type { QueryStatus } from 'react-query'
import type { ReactElement } from 'react'
import ProgressSpinner from '../UI/Progress/ProgressSpinner'


interface QueryHandlerProps {
	children: ReactElement;
	status: QueryStatus;
}

const QueryHandler = ({ children, status }: QueryHandlerProps) => {
	return (
		<>
			{status === 'loading' && (
				<ProgressSpinner/>
			)}

			{status === 'error' && 'Error occurred while getting the data!'}

			{status === 'success' && (
				children
			)}
		</>
	)
}

export default QueryHandler
