import { Vars } from '../modules/vars'
import Auth from './Auth'
import Questions from './Questions'
import Subjects from './Subjects'
import UserQuestions from "./UserQuestions"

const apiData = {
	apiRootUrl: Vars.api.url,
	apiCurrentVersion: Vars.api.version,
}

export const authEndpoint = new Auth(apiData)
export const questionsEndpoint = new Questions(apiData)
export const subjectsEndpoint = new Subjects(apiData)
export const userQuestionsEndpoint = new UserQuestions(apiData)
