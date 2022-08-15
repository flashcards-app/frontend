import { Vars } from "../../../src/modules/vars"


describe("Vars", () => {
	const ENV = {
		VITE_APP_NAME:         "Viterect",
		VITE_ENV:              "test",
		VITE_DEFAULT_THEME:    "light",
		VITE_DEFAULT_LANGUAGE: "he",
		VITE_API_URL:          "https://localhost:3000",
		VITE_API_VERSION:      "v1"
	}

	beforeEach(() => {
		Vars.setupVars(ENV)
	})

	it("should be defined", () => {
		expect(Vars).toBeDefined()
	})

	it("should contain all the variables", () => {
		expect(Vars.appName).toBe(ENV.VITE_APP_NAME)
		expect(Vars.theme.default).toBe(ENV.VITE_DEFAULT_THEME)
		expect(Vars.language.default).toBe(ENV.VITE_DEFAULT_LANGUAGE)
		expect(Vars.api.url).toBe(ENV.VITE_API_URL)
		expect(Vars.api.version).toBe(ENV.VITE_API_VERSION)
	})
})
