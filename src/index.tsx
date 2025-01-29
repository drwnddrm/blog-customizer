import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settings, setSettings] = useState(defaultArticleState);
	const [open, setOpen] = useState(false);

	const toggle = (): void => {
		if (open) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	};

	const applySettings = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm apply={applySettings} open={open} toggle={toggle} />
			<Article setOpen={setOpen} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
