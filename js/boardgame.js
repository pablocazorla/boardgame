Table = (function(){
	"use strict";

	var idCardCounter = 0,
		idDeckCounter = 0,
	
	card = function(options,ctx){
		return this.init(options,ctx);
	},
	deck = function(options,ctx){
		return this.init(options,ctx);
	},
	
	table = function(idNode){
		return this.init(idNode);
	};

	/***********************************************/
	card.prototype = {
		init:function(options,ctx){
			this.id = idCardCounter++;
			this.ctx = ctx;
			this.sett = $.extend({},options);
			return this;
		},
		render:function(){

		}
	};

	deck.prototype = {
		init:function(options,ctx){
			this.id = idDeckCounter++;
			this.ctx = ctx;
			this.cards = [];
			this.cards_len = 0;
			return this;
		},
		createCard : function(options){
			var newCard = new card(options,this.ctx);
			return this.addCard(newCard);
		},
		addCard:function(card){
			this.cards.push(card);
			this.cards_len++;
			return card;
		},
		render:function(){
			for(var i = 0; i < this.cards_len;i++ ){
				this.cards[i].render();
			}
			return this;
		}
	};

	

	table.prototype = {
		init:function(idNode){
			this.canvas = document.getElementById(idNode);
			this.ctx = this.canvas.getContext('2d');
			this.decks = [];
			this.decks_len = 0;
			this.cards = [];
			this.cards_len = 0;
			return this;
		},
		createCard : function(options){
			var newCard = new card(options,this.ctx);
			return this.addCard(newCard);
		},
		addCard:function(card){
			this.cards.push(card);
			this.cards_len++;
			return card;
		},
		createDeck : function(options){
			var newDeck= new deck(options,this.ctx);
			return this.addDeck(newDeck);
		},
		addDeck:function(deck){
			this.decks.push(deck);
			this.decks_len++;
			return deck;
		},
		render:function(){
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.width);
			for(var i = 0; i < this.decks_len;i++ ){
				this.decks[i].render();
			}
			for(var i = 0; i < this.cards_len;i++ ){
				this.cards[i].render();
			}
			return this;
		}
	};

	return function(idNode){
		return new table(idNode);
	}
})();