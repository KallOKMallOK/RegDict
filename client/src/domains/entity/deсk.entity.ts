import { ICard } from "./card.entity";

export interface IDeck{
	id: number,
	name: string,
	isPrivate?: boolean,
	countWords: number,
	countRepetitions: number,
	mainLang: string,
	secondLang: string,
	author?: string,
	owner?: string,
	description: string | null
	countLikes: number
	activeLike: boolean
	cards: ICard[],
	subscribed?: boolean
}