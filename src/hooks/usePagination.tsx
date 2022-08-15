import { useState } from "react"


const INITIAL_PAGE = 1
const MAX_PER_PAGE = 30

const defaultProps = {
	initialPage:    INITIAL_PAGE,
	initialPerPage: MAX_PER_PAGE
}

const usePagination = ({ initialPage = INITIAL_PAGE, initialPerPage = MAX_PER_PAGE } = defaultProps) => {
	const [page, setPage]                 = useState(initialPage ?? INITIAL_PAGE)
	const [perPage, setPerPage]           = useState(initialPerPage ?? MAX_PER_PAGE)
	const [hasMorePages, setHasMorePages] = useState(true)

	const paginationController = (dataLength: number, index: number) => {
		if (dataLength < perPage) {
			setHasMorePages(false)
			return
		}

		if (index === -1) {
			setPage(page - 1)
			return 'back'
		}

		if (index >= perPage) {
			setPage(page + 1)
			return 'next'
		}
	}

	return { page, setPage, perPage, setPerPage, hasMorePages, paginationController }
}


export default usePagination
