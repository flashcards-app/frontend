import type { ReactElement } from 'react'


export interface MainProviderOptions {
	children: ReactElement;
}

export interface MainDataType {
	sideBarState: boolean
	sideBarOpts: SideBarOptions
	overlayState: boolean
}

export interface MainContextType extends MainDataType {
	setSideBarState: (data: boolean) => void;
	setSideBarOpts: (data: SideBarOptions) => void;
	setOverlayState: (data: boolean) => void;
}

export interface SideBarOptions {
	width?: number;
	shrinkPoint?: number;
}
