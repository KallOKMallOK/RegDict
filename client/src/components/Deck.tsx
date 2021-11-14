import React, { MouseEvent, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { 
	FaPlus,
	FaLock,
	FaLockOpen,
	FaEllipsisV,
	FaHeart,
	FaTimes,
	FaLongArrowAltRight,
	FaArrowsAltH,
	FaCaretUp
} from "react-icons/fa"
import { Link, useHistory } from 'react-router-dom'
import Linkify from 'react-linkify'
import API from '../api'
import { ActionChange } from '../domains/entities/actions.entity'
import { ICard } from '../domains/entities/card.entity'
import { IDeck } from '../domains/entities/deсk.entity'
import useOutsideClick from '../hoc/OutsideClicker'

import { EditText } from './EditText'
import { Notification } from './Notification'


// -----------------------------------------------------------------------------
// -------------------------------- Deck ---------------------------------------
// -----------------------------------------------------------------------------

type actionClick = (e: React.FormEvent<HTMLElement>, ...more: any[]) => void

interface enableMethodsOptions{
	enableDelete?: boolean
	enableEdit?: boolean
	enableLike?: boolean
	enableChangePrivate?: boolean
	enableSubscribe?: boolean
	enableSave?: boolean
	enableCreate?: boolean
	enableClone?: boolean
}

export interface IDeckDefault extends IDeck{
	index: number
	enableMethods?: enableMethodsOptions
	// Actions
	edit?: actionClick
	delete?: actionClick
	like?: actionClick
	changePrivate?: actionClick
	subscribe?: actionClick
	clone?: actionClick
	watch?: actionClick
}

// interface ResultPlayDecks{
// 	main_word: string
// 	answer: string
// 	time: number
// 	successed: boolean
// }

interface WatchContainerProps {
	nameCard: string
	id: number
	author: string
	cards: ICard[]
	visible: boolean
	close: () => void
}

const WatchContainer: React.FC<WatchContainerProps> = props => {
	const history = useHistory()
	const thisRef = useRef<HTMLDivElement>(null)
	useOutsideClick(thisRef, () => {
		props.close()
	})

	if(props.visible) return(
		<div className={`watch_container`}>
			<div className="watcher" ref={thisRef}>
				<div className="name_card">{props.nameCard}</div>
				<div className="author">by <Link to={`/user/${props.author}`}>{props.author}</Link></div>
				<div className="close" onClick={() => props.close()}>
					<FaTimes />
				</div>
				<div className="card_item_panel_item_words">
					<ul className="card_item_panel_item_words_ul">
						{
							props.cards.map((card: ICard, index: number) => {
								return <li className="item" key={index}>
									<span className="index">#{index + 1}. </span>
									<span className="main_word">{card.main_word}</span>
									-
									<span className="second_word">{card.answer}</span>
								</li>
							})
						}
					</ul>
				</div>
				<div className="btn_wrapper">
					<button className="__btn btn_play" onClick={() => history.push(`/play/${props.id}`)}>play</button>
				</div>
			</div>

		</div>
	)
	else return null
}


export const Deck: React.FC<IDeckDefault> = props => {

	const history = useHistory()
	// Component states
	const [dropdownVisible, openDropdown] = useState(false)
	const [activedLike, activeLike] = useState(props.activeLike || false)
	const [subscribed, changeSubscribed] = useState(props.subscribed || false)
	const [watched, changeWatched] = useState(false)

	// Data states
	const [countLikes, changeCountLikes] = useState(props.countLikes || 0)
	const [isPrivate, changePrivate] = useState(props.isPrivate || false)

	const dropdownRef = useRef<HTMLUListElement>(null)

	useOutsideClick(dropdownRef, () => {
		if(dropdownVisible) openDropdown(false)
	})

	const likeUser = (e: MouseEvent<HTMLSpanElement>) => {
		console.log(props.enableMethods)
		if(props.enableMethods?.enableLike){
			activeLike(!activedLike)
			activedLike?
				changeCountLikes(countLikes - 1):
				changeCountLikes(countLikes + 1)
			props.like?.(e, props.id)
		}
		else{
			Notification.warning("Warning", "Please, sign in", 3000)
		}
	}

	const handleChangePrivate = (e: MouseEvent<HTMLSpanElement>) => {
		if(props.author === props.owner){
			props.changePrivate?.(e, props.id, !isPrivate)
			changePrivate(!isPrivate)
		}
	}
	const handleEdit = (e: MouseEvent<HTMLLIElement>) => {
		openDropdown(false)
		props.edit?.(e, props.index)
	}
	const handleChangeSubscribed = (e: MouseEvent<HTMLButtonElement>) => {
		props.subscribe !== undefined && props.subscribe(e, props.id)
		API.subscribe(props.id)
			.then(resp => {
				console.log(resp);
				Notification.success("Ok", "All okey")
			})
			.catch(err => console.log(err))
		changeSubscribed(!subscribed)
	}

	return (
	<div className="card_item card_item_noactive">
		{
			watched && ReactDOM.createPortal(
				<WatchContainer
					id={props.id}
					author={props.author || ""}
					nameCard={props.name}
					close={() => changeWatched(false)} 
					visible={watched} 
					cards={props.cards}
				/>,
				document.getElementById("root-modals") || document.body
			)
		}
		{/* control items */}
			<div className="control">
				<span className="icon" onClick={() => openDropdown(!dropdownVisible)}><FaEllipsisV/></span>
				<ul className={`dropdown ${dropdownVisible ? "active": "noactive"}`} ref={dropdownRef}>
					<li className="dropdown_item" onClick={() => changeWatched(true)}>Watch</li>
					<li className="dropdown_item" onClick={() => history.push(`/play/${props.id}`)}>Play</li>
					{
						props.enableMethods?.enableEdit && 
							<li className="dropdown_item" onClick={e => handleEdit(e)}>Edit</li>
					}
					{
						props.enableMethods?.enableDelete && 
						<li className="dropdown_item" onClick={e => props.delete?.(e, props.id)}>Delete</li>
					}
					{
						props.enableMethods?.enableClone && 
							<li className="dropdown_item" onClick={e => props.clone?.(e, props.id)}>Clone</li>
					}
					
					
				</ul>
			</div>

		{/* HEAD OF DECK */}
		<p className="card_item_head">
			{
				(props.enableMethods !== undefined && props.enableMethods.enableChangePrivate) &&
					<span 
						style={{cursor: props.author === props.owner ? "pointer": "default"}}
						className="private_lock" 
						onClick={e => handleChangePrivate(e)}
					>
						{isPrivate? <FaLock/>: <FaLockOpen/>}
					</span>
			}
			
			<span className="card_item_head_name">{props.name}</span>
			{
				// props.author !== props.owner && 
				<Link to={`/user/${props.author}`} className="author">(by {props.author})</Link> 
			}
		</p>

		
		<div className="middle_layer">
			<div className="card_item_head_langs">
				<div className="lang main_lang">{props.mainLang}</div>/
				<div className="lang sec_lang">{props.secondLang}</div>
			</div>
			<div className="info">
				<p className="info_count_words">{props.countWords} words</p>
				<p className="info_count_repetitions">{props.countRepetitions} repetitions</p>
			</div>
		</div>

		<p className="card_item_description"><Linkify>{props.description}</Linkify></p>

		<div className="footer">
			{
				props.enableMethods?.enableSubscribe ?
					<button 
						className={`btn btn-${!subscribed? "primary": "danger"}`} 
						onClick={e => handleChangeSubscribed(e)}>
							{subscribed? "Unsubscribe": "Subscribe"}
					</button>:
					<div></div>
			}
			<span className="likes" onClick={e => likeUser(e)}>
				<span className={`heart ${activedLike? "active": "noactive"}`}><FaHeart/></span>
				{countLikes}
			</span>
		</div>
	</div>
  );
}


// -----------------------------------------------------------------------------
// ----------------------------- Active Deck -----------------------------------
// -----------------------------------------------------------------------------

interface EditedCardProps extends ICard{
	visible: boolean
	positionElement: {x: number, y: number}

	eventOnChangeMainWord?: (value: string) => void
	eventOnChangeSecondWord?: (e: React.FormEvent<HTMLInputElement>) => void
	eventOnChangeDescriptionCard?: (e: React.FormEvent<HTMLTextAreaElement>) => void

	close: (e: React.FormEvent<HTMLElement> | null) => void
	save: (changes: ActionChange[], idCard: number) => void
}


const EditedCard: React.FC<EditedCardProps> = props => {
	const [mainWordChanged, setMainWordChanged] = useState(false)
	const [answerChanged, setAnswerChanged] = useState(false)
	const [descriptionChanged, setDescriptionChanged] = useState(false)
	const [mainWord, changeMainWord] = useState(props.main_word)
	const [answer, changeAnswer] = useState(props.answer)
	const [description, changeDescription] = useState(props.description)

	const thisRef = useRef<HTMLDivElement>(null)

	const handleChangeMainWord = (e: React.FormEvent<HTMLInputElement>) => {
		props.eventOnChangeMainWord?.(e.currentTarget.value)
		changeMainWord(e.currentTarget.value)
		setMainWordChanged(true)
	}

	const handleChangeAnswer = (e: React.FormEvent<HTMLInputElement>) => {
		props.eventOnChangeSecondWord?.(e)
		changeAnswer(e.currentTarget.value)
		setAnswerChanged(true)
	}

	const handleChangeDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
		props.eventOnChangeDescriptionCard?.(e)
		changeDescription(e.currentTarget.value)
		setDescriptionChanged(true)
	}

	const handleSaveChanges = () => {
		let __changes: ActionChange[] = []
		if(mainWordChanged)
			__changes  = [...__changes, {
				type: "CHANGE_CARD",
				payload: {
					name: "main_word",
					id: props.id,
					value: mainWord
				}
			}]
		if(answerChanged)
			__changes  = [...__changes, {
				type: "CHANGE_CARD",
				payload: {
					name: "answer",
					id: props.id,
					value: answer
				}
			}]
		if(descriptionChanged)
			__changes  = [...__changes, {
				type: "CHANGE_CARD",
				payload: {
					name: "description",
					id: props.id,
					value: description
				}
			}]
		console.log(__changes);
		props.save(__changes, props.id)
		props.close(null)
	}

	useOutsideClick(thisRef, () => {
		if(props.visible) props.close(null)
	})

	return (
		ReactDOM.createPortal(
			<div ref={thisRef} className="editedCardWatch" style={{display: props.visible? "block": "none", top: props.positionElement.y + 240, left: props.positionElement.x - 20}}>
				<div className="wrapper">
					<div className="beforeTringle">
						<FaCaretUp />
					</div>
					<div className="closeEditedCard" onClick={e => props.close(e)}>
						<FaTimes />
					</div>

					<div className="control-top">
						<input type="text" className="__input __input_default" value={mainWord} onChange={e => handleChangeMainWord(e)}/>
						<FaLongArrowAltRight />
						<input type="text" className="__input __input_default" value={answer} onChange={e => handleChangeAnswer(e)}/>
					</div>

					<textarea name="description" className="__input __input_default" id="" cols={10} rows={2} value={description} onChange={e => handleChangeDescription(e)}></textarea>
					<button className="__btn" onClick={handleSaveChanges}>save</button>
				</div>
			</div>,
			document.getElementById("root") || document.body
		)
	)
}



export interface IDeckActive extends IDeckDefault{
	close: actionClick
	save?: actionClick
	create?: actionClick
}


export const DeckActive: React.FC<IDeckActive> = props => {
	const [cards, changeCards] = useState(props.cards)
	const [countCards, incCountCards] = useState(props.countWords)
	const [changes, addChange] = useState([] as ActionChange[])
	const [name, changeName] = useState(props.name)
	const [mainWordValue, changeMainWordValue] = useState("")
	const [secondWordValue, changeSecondWordValue] = useState("")
	const [descriptionCard, changeDescriptionCard] = useState("")
	const [indexCard, changeIndexCard] = useState(1)

	console.log(changes);
	// Edited card menu
	const [currentCardOpened, changeCurrentCardOpened] = useState(cards[0])
	const [visibleCardWatch, changeVisibleCardWatch] = useState(false)
	const [positionCard, changePositionCard] = useState({x: 0, y: 0})

	const [mainLang, changeMainLang] = useState("ENG")
	const [secondLang, changeSecondLang] = useState("RU")
	// const [isPrivate, changeName] = useState(props.name || "Deck name")

	const mainWordRef = useRef<HTMLInputElement>(null)
	const secondWordRef = useRef<HTMLInputElement>(null)
	const descriptionDeckRef = useRef<HTMLTextAreaElement>(null)
	const descriptionCardRef = useRef<HTMLTextAreaElement>(null)

	const LANGS = [
		"RUS",
		"ENG",
		"JPN",
		"CHI",
		"ITA",
		"SPA",
		"FRA",
		"GER"
	]


	const handleChangeName = (newValue: string) => {
		changeName(newValue)
		const payloadChangeName = {
			name: "name",
			value: newValue
		}
		addChange(oldChanges => {
			return [...oldChanges, {
				type: "CHANGE_DECK",
				payload: payloadChangeName
			}]
		})
	}

	const handleAddCard = () => {
		const newCard: ICard = {
			id: (cards[cards.length - 1] || {id: -1}).id + 1,
			main_word: mainWordValue,
			answer: secondWordValue,
			type: "default",
			description: descriptionCard
		}
		changeCards(oldCards => [...oldCards, newCard])
		incCountCards(countCardsOld => countCardsOld + 1)
		addChange(oldChanges => {
			return [...oldChanges, {
				type: "NEW_CARD",
				payload: newCard
			}]
		})

		changeMainWordValue("")
		changeSecondWordValue("")
		changeDescriptionCard("")
		changeIndexCard(indexCard + 1)
		// mainWordRef.current?.value = ""
	}

	const handleChangeMainWord__press = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter")
			handleAddCard()
	}
	
	const handleChangeSecondWord__press = (e: React.KeyboardEvent<HTMLInputElement>) => { if(e.key === "Enter")handleAddCard() }

	const handleChangeDescriptionCard__press = (e: React.KeyboardEvent<HTMLTextAreaElement>) => { if(e.key === "Enter") handleAddCard() }

	const handleChangeMainWord = (e: React.FormEvent<HTMLInputElement>) => { changeMainWordValue(e.currentTarget.value) }
	
	const handleChangeSecondWord = (e: React.FormEvent<HTMLInputElement>) => { changeSecondWordValue(e.currentTarget.value) }

	const handleChangeDescriptionCard = (e: React.FormEvent<HTMLTextAreaElement>) => { changeDescriptionCard(e.currentTarget.value) }

	const handleChangeMainLang = (e: React.FormEvent<HTMLSelectElement>) => { changeMainLang(e.currentTarget.value) }

	const handleChangeSecondLang = (e: React.FormEvent<HTMLSelectElement>) => { changeSecondLang(e.currentTarget.value) }

	const handleChangeMainWordInConsistCard = (value: string, id: number) => {
		changeCards((oldCards) => {
			const __cards = oldCards.map(item => {
				if(item.id === id)
					item.main_word = value
				return item
			})
			console.log(oldCards, value, id);
			return __cards
		})
	}

	const handleSwapLangs = () => {
		const __mainLang = mainLang
		changeMainLang(secondLang)
		changeSecondLang(__mainLang)
	}

	// For creating
	const handleCreateDeck = (e: MouseEvent<HTMLButtonElement>) => {
		const dataNewDeck: Partial<IDeck & {description: string, price: number}> = {
			name,
			isPrivate: false,
			description: descriptionDeckRef.current?.value,
			mainLang: mainLang,
			secondLang: secondLang,
			price: 0,
			cards: cards
		}
		cards.length !== 0 ? 
			props.create?.(e, dataNewDeck):
			Notification.warning("Предупреждение!", "Вы не добавили ни одной карточки!", 2500)
	}

	const handleDeleteCard = (e: MouseEvent<HTMLDivElement>, index: number) => {
		e.stopPropagation()
		changeVisibleCardWatch(false)
		changeCards(oldCards => oldCards.filter((_, _index: number) => _index !== index))
		addChange(changes => [...changes, {
			type: "DELETE_CARD",
			payload: {
				id: cards[index].id
			}
		}])
	}
	
	const handleOpenCardForWatch = (e: MouseEvent<HTMLLIElement>, index: number) => {
		changePositionCard({x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop})
		changeCurrentCardOpened(cards[index])
		changeVisibleCardWatch(true)
	}

	const handleChangeCard = (changesCard: ActionChange[]) => {
		console.log(changesCard);
		addChange((old) => [...old, ...changesCard])
	} 
	// -----------------------------------------------------------------------------
	// ---------------------------- Export JSON -----------------------------------
	// -----------------------------------------------------------------------------

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleExportFileAsJSON = (e: React.FormEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files || []
		const file = files[0]
		const reader = new FileReader()

		reader.onload = function() {
			const data = JSON.parse(reader.result as string)
			uploadJSONToCards(data.decks)
		}

		reader.readAsText(file);
	}

	const uploadJSONToCards = (cards: ICard[]) => {
		cards.map((card, index) => {
			if(index >= 20 && index < 40){
				const newCard: ICard = {
					id: card.id,
					main_word: card.main_word,
					answer: card.answer,
					type: "default",
					description: ""
				}
				changeCards(oldCards => [...oldCards, newCard])
				incCountCards(countCardsOld => countCardsOld + 1)
				addChange(oldChanges => {
					return [...oldChanges, {
						type: "NEW_CARD",
						payload: newCard
					}]
				})
			}
		})
		
	}
	

	return (
		<div className="card_item card_item_active">
			<div className="close" onClick={props.close}>
				<FaTimes />
			</div>


			<p className="card_item_name">
				<EditText text={name} typeInput="text" focus onChanged={(old, _new) => handleChangeName(_new as string)}/>
			</p>
			<div className="top-panel">
				<div className="select_languages">
					<select onChange={handleChangeMainLang} className="form-select" aria-label="Default select example">
						{
							LANGS.map((lang, index) => {
								return <option key={index} selected={lang === mainLang}>{lang}</option>
							})
						}
					</select>


					<span className="card_item_panel_toggler" onClick={handleSwapLangs}><FaArrowsAltH /></span>

					<select onChange={handleChangeSecondLang} className="form-select" aria-label="Default select example">
						{
							LANGS.map((lang, index) => {
								return <option key={index} selected={lang === secondLang}>{lang}</option>
							})
						}
					</select>

					{/* <input type="file" onChange={handleExportFileAsJSON}/> */}
				</div>
				{/* PLUG for jcsb */}
				<div></div>
			</div>


			<div className="info">
				<span className="card_item_count_words">{countCards} words</span>
				<p className="card_item_count_repetitions">{props.countRepetitions} repetitions</p>
			</div>

			<div className="description_deck__wrapper">
				<textarea 
					defaultValue={props.description || ""} 
					ref={descriptionDeckRef} 
					placeholder="Type description deck" 
					name="" 
					id="" 
					cols={60} 
					rows={10}>
				</textarea>
			</div>


			<div className="card_item_panel_adding__wrapper">
				<div className="card_item_panel_adding">
					<span className="index_card">
						#{indexCard}
					</span>
					<div className="main-answer-words">
						<div className="input-wrapper form-floating">
							<input 
								onKeyPress={handleChangeMainWord__press} 
								onChange={handleChangeMainWord}
								value={mainWordValue} 
								type="text" 
								className="form-control" 
								id="floatingInput" 
								placeholder="type word..." 
								ref={mainWordRef}
							/>
							<label htmlFor="floatingInput">Main word on {mainLang}</label>
						</div>

						<span className="card_item_panel_toggler" onClick={handleSwapLangs}><FaLongArrowAltRight /></span>

						<div className="input-wrapper form-floating">
							<input 
								onKeyPress={handleChangeSecondWord__press} 
								onChange={handleChangeSecondWord} 
								value={secondWordValue} 
								type="text" 
								className="form-control" 
								id="floatingInput" 
								placeholder="type word..." 
								ref={secondWordRef}
							/>
							<label htmlFor="floatingInput">Second word {secondLang}</label>
						</div>
					</div>

					<div className="control_bottom__wrapper">
						<textarea 
							ref={descriptionCardRef} 
							value={descriptionCard} 
							onKeyPress={handleChangeDescriptionCard__press} 
							onChange={handleChangeDescriptionCard} 
							placeholder="Type description" 
							name="" 
							id="" 
							cols={60} 
							rows={10}>
						</textarea>
						<button  className="card_item_panel_button_add" onClick={handleAddCard}>add</button>
					</div>



				</div>

			</div>
			
			{
				visibleCardWatch && <EditedCard 
					visible={visibleCardWatch}
					id={currentCardOpened?.id}
					main_word={currentCardOpened?.main_word}
					answer={currentCardOpened?.answer}
					description={currentCardOpened?.description}
					type="default"
					positionElement={positionCard}

					eventOnChangeMainWord={e => handleChangeMainWordInConsistCard(e, currentCardOpened?.id)}

					close={() => changeVisibleCardWatch(false)}
					save={handleChangeCard}
				/>
			}

			<div className="card_item_panel_item_words">
				<ul className="card_item_panel_item_words_ul">
					{
						cards.map((card: ICard, index: number) => {
							return <li key={index} className="item" onClick={e => handleOpenCardForWatch(e, index)}>
								<span className="index">#{index + 1}. </span>
								<span className="main_word">{card.main_word}</span>
								-
								<span className="second_word">{card.answer}</span>
								<div className="close_deck" onClick={e => handleDeleteCard(e, index)}><FaTimes/></div>
							</li>
						})
					}
				</ul>
			</div>
			


			<div className="buttons_group">
				{
					props.enableMethods?.enableCreate && 
					<button className="__btn __button-default button-create" onClick={handleCreateDeck}>create</button>
				}
				{
					props.enableMethods?.enableSave && 
						<button className="__btn __button-default button-save mr-5" onClick={e => props.save?.(e, props.id, changes)}>save</button>
				}
				{
					props.enableMethods?.enableDelete &&
						<button className="__btn __button-default button-delete" onClick={e => props.delete?.(e, props.id)}>delete</button>
				}
			</div>
		</div>
	)
}

// -----------------------------------------------------------------------------
// ------------------------------ Deck Add -------------------------------------
// -----------------------------------------------------------------------------

interface IDeckAdd{
	add: actionClick
}

export const DeckAdd: React.FC<IDeckAdd> = props => {
	return(
		<div className="card_item card_item_noactive new_card">
			<div className="svg_wrapper" onClick={e => props.add(e)}>
				<FaPlus />
			</div>
		</div>
	)
}