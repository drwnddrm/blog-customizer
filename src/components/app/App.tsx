import { CSSProperties, useState } from 'react';

import { defaultArticleState } from '../../constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';
import styles from './App.module.scss';

export const App = () => {
	const [settings, setSettings] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setSettings={setSettings} />
			<Article />
		</main>
	);
};
