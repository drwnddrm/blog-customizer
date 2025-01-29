import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { SyntheticEvent, useState } from 'react';
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
	apply: (newSettings: ArticleStateType) => unknown;
	open: boolean;
	toggle: () => unknown;
};

export const ArticleParamsForm = ({ apply, open, toggle }: TProps) => {
	const [selected, setSelected] = useState(defaultArticleState);

	const handleFontFamily = (selected: OptionType): void => {
		setSelected((prevSelected) => ({
			...prevSelected,
			fontFamilyOption: selected,
		}));
	};

	const handleFontSize = (selected: OptionType): void => {
		setSelected((prevSelected) => ({
			...prevSelected,
			fontSizeOption: selected,
		}));
	};

	const handleFontColor = (selected: OptionType): void => {
		setSelected((prevSelected) => ({
			...prevSelected,
			fontColor: selected,
		}));
	};

	const handleBackgroundColor = (selected: OptionType): void => {
		setSelected((prevSelected) => ({
			...prevSelected,
			backgroundColor: selected,
		}));
	};

	const handleContentWidth = (selected: OptionType): void => {
		setSelected((prevSelected) => ({
			...prevSelected,
			contentWidth: selected,
		}));
	};

	const resetAll = (): void => {
		setSelected(defaultArticleState);
		apply(defaultArticleState);
		toggle();
	};

	const submitChanges = (event?: SyntheticEvent): void => {
		event?.preventDefault();
		apply(selected);
		toggle();
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={toggle} />
			<aside
				className={clsx(styles.container, {
					[styles['container_open']]: open,
				})}>
				<form className={styles.form}>
					<Text as={'h2'} uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={selected.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleFontFamily}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={selected.fontSizeOption}
						onChange={handleFontSize}
					/>
					<Select
						selected={selected.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleFontColor}
					/>
					<Separator />
					<Select
						selected={selected.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleBackgroundColor}
					/>
					<Select
						selected={selected.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetAll}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={submitChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
