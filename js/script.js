/**
* script.js
*/

/**
* constructor for a Tile
*/
function Tile(id,color){
    this.id = id;
    this.color = color;
    this.isClicked = false;
    this.isMatched = false;
}

var titi = new Vue({
    el: '#title',
    data: {
	message: 'memory'}
});
//-------------------------------
var el_li = new Vue({
    el: '#list-cards__div',
    data: {
	colorChoice : ["red", "black", "yellow", "orange", "blue", "green", "grey", "cyan"],
	colorCombination : [],
	items: [],
	numberItem: { val : 0},
	defaultClass : 'defaultClass',
	numberGuess: 0,
	alreadyLookingForPair : false
    }, 
    methods: {
	//update items with object
	updateItems: function(object){
	    this.items.splice(object.id,1,object);
	},
	clickCard : function(card){
	    tile = this.items[card.id];
	    if(!tile.isMatched  && !tile.isClicked){
		tile.isClicked = true;
		if(!this.alreadyLookingForPair){
		    this.alreadyLookingForPair = true;
		    this.itemToMatch = tile;
		}else{
		    this.numberGuess++;
		    this.alreadyLookingForPair = false;
		    if(this.itemToMatch.color == tile.color){
			tile.isMatched = true;
			this.itemToMatch.isMatched = true;
		    }else{
			timeout = setTimeout( () => {
			    tile.isClicked = false;
			    this.itemToMatch.isClicked = false;
			}, 300);
		    }
		}
		this.updateItems(tile);
		this.updateItems(this.itemToMatch);
	    }
	    
	},
	createCards : function(){
	    var res = []; 
	    for(var i=0;i<this.numberItem.val;i++){
		res.push(new Tile(i,this.pickColor()));
	    }
	    this.items = res;
	},
	createColorCombination: function(n){
	    var res = this.colorChoice.slice(0,this.colorChoice.length);
	    res = this.shuffle(res)
	    res = res.slice(0,n/2);
	    res = res.concat(res.slice(0,res.length));
	    res = this.shuffle(res);
	    this.colorCombination = res;
	},
	pickColor : function(){
	    return this.colorCombination.pop();
	},
	shuffle : function(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;
	    // While there remain elements to shuffle...
	    while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	    }
	    return array;
	}
    },
    watch: {
	numberItem: function(){
	    this.createColorCombination(this.numberItem.val);
	    this.createCards();
	    this.alreadyLookingForPair = false;
	    this.numberGuess = 0;
	}
    }
});




