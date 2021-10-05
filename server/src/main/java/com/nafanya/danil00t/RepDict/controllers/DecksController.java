package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.jboss.jandex.Main;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.Name;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Getter
@Setter
@CrossOrigin
@RestController
public class DecksController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DeckRepository deckRepository;

    @Autowired
    CardRepository cardRepository;

    @PostMapping("/new_deck")
    public JSONObject newDeck(
        @RequestBody DeckRequest cards
    ) throws IOException {
        if (!LogRegController.MiddleWare(cards.getToken(), userRepository))
            return MainController.getERROR();
        Deck deck = new Deck(cards.getName(),
                cards.getIsPrivate(),
                cards.getIdUser(),
                cards.getDescription(),
                cards.getMainLang(),
                cards.getSecondLang(),
                cards.getPrice(),
                userRepository);
        System.out.println(cards.getMainLang());
        Deck _deck = deckRepository.save(deck);
        System.out.println(_deck.getId() + "\nUser: " + _deck.getAuthor().getId());
        cards.getCards().forEach(c -> {
            Card card = new Card(c.getMainWord(), c.getAnswer(), c.getType(), c.getDescription());
            card = cardRepository.save(card);
            System.out.println(card.getId());
            _deck.getCards().add(card);
            _deck.setCountWords(_deck.getCountRepetitions() + 1);
        });
        deckRepository.save(_deck);
        return MainController.getSUCCESS();
    }

    @GetMapping("/get_decks")
    public JSONObject getDecks(
            //@RequestBody GetDeckRequest request
        @RequestParam String token
    ) throws IOException{
        if(!LogRegController.MiddleWare(token, userRepository))
            return MainController.getERROR();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token));
        JSONArray array = new JSONArray();
        user.getOwned().forEach(deck -> array.add(JsonUtils.getDeckJson(deck, user)));
        JSONObject object = new JSONObject();
        object.put("error", false);
        object.put("decks", array);
        return object;
    }

    @PostMapping("/like")
    public JSONObject addLike(
            @RequestBody LikeRequest request
    ) throws IOException{
        if(!LogRegController.MiddleWare(request.getToken(), userRepository))
            return MainController.getERROR();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken()));
        for(Deck deck : user.getLikesList()){
            if(deck.getId().equals(request.getDeckId())){
                user.getLikesList().remove(deck);
                deck.getLikesList().remove(user);
                deck.setLikes(deck.getLikesList().size());
                userRepository.save(user);
                deckRepository.save(deck);
                return MainController.getSUCCESS();
            }
        }
        Deck deck = deckRepository.getById(request.getDeckId());
        deck.getLikesList().add(user);
        deck.setLikes(deck.getLikesList().size());
        deckRepository.save(deck);
        return MainController.getSUCCESS();
    }

    @PostMapping("/change_deck")
    public JSONObject changeDeck(
            @RequestBody TestRequest body
            ) throws IOException{
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(body.getToken()));
        Deck deck = deckRepository.getById(body.getIdDeck());
        if(!deck.getAuthor().getLogin().equals(user.getLogin()))
            return MainController.getERROR();
        body.getChanges().forEach(change -> {
            Card card;
            switch (change.getType()){
                case "CHANGE_DECK":
                    changeDeckSwitch(change.getPayload(), deck);
                    break;
                case "CHANGE_CARD":
                    changeCardSwitch(change.getPayload(), deck);
                    break;
                case "NEW_CARD":
                    card = new Card(
                            (String) change.getPayload().get("main_word"),
                            (String) change.getPayload().get("answer"),
                            (String) change.getPayload().get("type"),
                            (String) change.getPayload().get("description"));
                    card = cardRepository.save(card);
                    deck.getCards().add(card);
                    deckRepository.save(deck);
                    break;
                case "DELETE_CARD":
                    card = null;
                    Integer cardId = (Integer) change.getPayload().get("id");
                    for(Card c : deck.getCards()) {
                        if (c.getId().equals(cardId)) {
                            card = c;
                            deck.getCards().remove(c);
                            card.getDecks().remove(deck);
                            deckRepository.save(deck);
                            cardRepository.delete(card);
                            break;
                        }
                    }
                    break;
            }
        });
        deck.setCountWords(deck.getCards().size());
        deckRepository.save(deck);
        return MainController.getSUCCESS();
    }

    private void changeCardSwitch(JSONObject payload, Deck deck){
        Card card = null;
        Integer cardId = (Integer) payload.get("id");
        for(Card c : deck.getCards()) {
            if (c.getId().equals(cardId)) {
                card = c;
                break;
            }
        }
        if(card == null)
            return;
        switch((String) payload.get("name")){
            case "main_word":
                card.setMainWord((String) payload.get("value"));
                break;
            case "answer":
                card.setAnswer((String) payload.get("value"));
                break;
            case "type":
                card.setType((String) payload.get("value"));
                break;
            case "description":
                card.setDescription((String) payload.get("description"));
                break;
        }
        card = cardRepository.save(card);
    }

    private void changeDeckSwitch(JSONObject payload, Deck deck){
        switch((String) payload.get("name")){
            case "name":
                deck.setName((String) payload.get("value"));
                break;
            case "isPrivate":
                deck.setIsPrivate((Integer) payload.get("value"));
                break;
            case "description":
                deck.setDescription((String) payload.get("value"));
                break;
            case "mainLang":
                deck.setMainLanguage((String) payload.get("value"));
                break;
            case "secondLang":
                deck.setSecondLanguage((String) payload.get("value"));
                break;
            case "price":
                deck.setPrice((Integer) payload.get("value"));
                break;
            default:
                break;
        }
    }
}

@Getter
@Setter
class BanalRequest{
    private String token;
}

@Getter
@Setter
class GetDeckRequest extends BanalRequest{
    private Integer userId;
}

@Getter
@Setter
class LikeRequest extends BanalRequest{
    private Integer deckId;
}

@Getter
@Setter
class DeckRequest extends BanalRequest{
    private String name;
    private Boolean isPrivate;
    private Integer idUser;
    private String description;
    private String mainLang;
    private String secondLang;
    private Integer price;
    private List<ListBody> cards;
}

@Getter
@Setter
class ListBody{
    private String mainWord;
    private String answer;
    private String description;
    private String type;
}

@Getter
@Setter
class TestRequest extends BanalRequest{
    int idDeck;
    private List<TestBody> changes;
}

@Getter
@Setter
class TestBody{
    private String type;
    private JSONObject payload;
}