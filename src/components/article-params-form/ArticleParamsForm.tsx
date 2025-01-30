import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { FormEvent, useEffect, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from '../../constants/articleProps';

type TProps = {
	setSettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setSettings }: TProps) => {
	const [select, setSelect] = useState(defaultArticleState);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const close = (event: Event) => {
			const target = event.target as HTMLElement;
			if (
				target.parentElement?.className.startsWith('Article-module') ||
				target.nodeName === 'ARTICLE' ||
				target.nodeName === 'MAIN'
			) {
				setOpen(false);
			}
		};

		if (open) {
			document.addEventListener('click', close);
		}

		return () => {
			document.removeEventListener('click', close);
		};
	});

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (selected: OptionType) => {
			setSelect({
				...select,
				[field]: selected,
			});
		};
	};

	const resetAll = (): void => {
		setSelect(defaultArticleState);
		setSettings(defaultArticleState);
		setOpen(false);
	};

	const submitChanges = (event?: FormEvent): void => {
		event?.preventDefault();
		setSettings(select);
		setOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={open}
				onClick={() => (open ? setOpen(false) : setOpen(true))}
			/>
			<aside
				className={clsx(styles.container, {
					[styles['container_open']]: open,
				})}>
				<form className={styles.form} onSubmit={submitChanges}>
					<Text as={'h2'} uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={select.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={select.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Select
						selected={select.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={select.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						selected={select.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleOnChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetAll}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
