import { combineReducers } from '@reduxjs/toolkit';
import settingReducer from './setting';
import counterReducer from './counter';

import userInputReducer from './user_inputs';
import keywordReducer from './keywords';
import titleReducer from './titles';
import outlineReducer from './outlines';
import articleIntroReducer from './article_intros';
import articleBodyReducer from './article_bodies';
import articleConclusionReducer from './article_conclusions';

const rootReducer = combineReducers({
	_setting: settingReducer,
	counter: counterReducer,

	user_inputs: userInputReducer,
	keywords: keywordReducer,
	titles: titleReducer,
	outlines: outlineReducer,
	article_intros: articleIntroReducer,
	article_bodies: articleBodyReducer,
	article_conclusions: articleConclusionReducer,
});

export default rootReducer;
