import {ThemeName} from '../components/UI/Theme/types'


export interface EnvFileProps {
	VITE_APP_NAME: string;
	VITE_ENV: string;
	VITE_DEFAULT_THEME: string;
	VITE_API_URL: string;
	VITE_API_VERSION: string;
}

export class Vars {
	static appName: string
	
	static env: string
	
	static theme: {
		defaultTheme: ThemeName;
	}
	
	static api: {
		url: string;
		version: string;
	}
	
	static setupVars(envVars: EnvFileProps) {
		Vars.appName = envVars.VITE_APP_NAME
		Vars.env = envVars.VITE_ENV
		Vars.theme = {defaultTheme: envVars.VITE_DEFAULT_THEME as ThemeName}
		Vars.api = {
			url: envVars.VITE_API_URL,
			version: envVars.VITE_API_VERSION,
		}
	}
}
