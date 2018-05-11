<template>
    <div class="container">
        <!-- The following section checks whether the admin account is signedin-->
        <button type="button" class="btn" @click="adminCheck">Edit Catalogue</button>
        <!-- if it is an admin account, then they can add new drinks-->

        <div v-if="admin" class="addDrink panel panel-default">
            <div class="panel-heading">Admin: Add drinks</div>
            <section v-cloak>
                <input placeholder="New Drink Name"
                    v-model="newDrinkName"
                >
                <input placeholder="Caffeine Content"
                    v-model="newDrinkCaffeine"
                >
                <input placeholder="Caloric Content"
                    v-model="newDrinkCalories"
                >
                <input placeholder="Sugar Content"
                    v-model="newDrinkSugar"
                >
                <input placeholder="Price"
                    v-model="newDrinkPrice"
                >
                <section v-cloak>
                    <select name="basic-dropdown" v-model="newDrinkLocation">
                        <option v-for="place in places">{{ place.name }}</option>
                    </select>
                </section>
                <button type="button" class="btn" @click="addDrink">Add Drink</button>

            </section>
        </div>
        
        <!-- The following are the cards for each drink-->
        <div class="row">
            <div v-for="drink in currentDrinks" class="col-xs-4 cards">
                <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading">{{drink.name}}</div>
                    <!-- List group -->
                    <ul class="list-group">
                        <li class="list-group-item">Location: {{drink.location}}</li>
                        <li class="list-group-item">Caffeine Content: {{drink.caffeine}}mg</li>
                        <li class="list-group-item">Caloric Content: {{drink.calories}}Cal</li>
                        <li class="list-group-item">Sugar Content: {{drink.sugar}}g</li>
                        <li class="list-group-item">Price: ${{drink.price }}</li>
                        <li class="list-group-item">Review Avg: {{drink.reviewScore }}/5</li>
                        <li class="list-group-item">
                            <button type="button" class="btn" @click="drink.expandInfo=!drink.expandInfo">Expand</button>
                        </li>
                        <li class="list-group-item">
                            <button type="button" class="btn" @click="removeDrinkItem(drink)">Delete</button>
                        </li>
                    </ul>
                    
                </div>
                <!-- This is the modal for each drink, where more information is showed, such as the reviews and ratings-->
                <!-- This section also has the option to favorite drinks-->
                <div v-if="drink.expandInfo">
                    <div id="popupDrinkBackground">
                        <div class="popupDrink panel panel-warning">
                            <div class="panel-heading">{{drink.name}}</div>
                            <!-- List group -->
                            <ul class="list-group">
                                <li class="list-group-item">Location: {{drink.location}}, Caffeine Content: {{drink.caffeine}}mg, Caloric Content: {{drink.calories}}Cal, Sugar Content: {{drink.sugar}}g, Price: ${{drink.price }}, Review Avg: {{drink.reviewScore }}/5</li>
                                <li class="list-group-item">
                                    <input placeholder="Drink Rating"
                                    v-model="newDrinkRating"
                                    >
                                    <button type="button" class="btn" @click="updateRating(drink)">Submit</button>
                                </li>
                                <li class="list-group-item">
                                    <section v-cloak>
                                        <textarea name="message" rows="5" cols="40" placeholder="More thoughts? Write a lengthy review!" v-model="newTextReview">
                                        </textarea>
                                        <button type="button" class="btn" @click="addReview(drink)">Submit</button>
                                    </section>
                                
                                </li>
                                <li class="list-group-item" v-for="reviews in reviewsOfDrink(drink)">"{{reviews.review}}," written by {{reviews.user}} on {{reviews.time}}</li>
                                
                                <li class="list-group-item">
                                    <button type="button" class="btn" @click="drink.expandInfo=!drink.expandInfo">Minimize</button>
                                    <button type="button" class="btn" @click="addFavorite(drink)">Favorite!</button>
                                    <button type="button" class="btn" @click="removeDrinkItem(drink)">Delete</button>
                                </li>
                            </ul> 
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { imagesRef, storageRef, drinksRef, activityRef, favoritesRef, reviewsRef } from '../database'

export default {
    name: 'drinkView',
    // form specific data
    data () {
        return {
            newDrinkName: '',
            newDrinkCaffeine: '',
            newDrinkCalories: '',
            newDrinkSugar: '',
            newDrinkPrice: '',
            newDrinkReviewScore: '',
            newDrinkLocation: '',
            newDrinkReviewComment: '',
            //expandInfo: false,
            writeReview: false,
            newDrinkRating: '',
            newTextReview:'',
            admin: false
        }
    },
    firebase: {
        // local representations of firebase data, but separate from vue-images component data
        reviewsDB: reviewsRef,
        favoritesDB: favoritesRef
            
    },
    // method provided to respond to form in parent component
    props: [
        'currentDrinks',
        'places',
        'user'
    ],
    // method to process form data
    methods: {
        //checks whether the admin uid is logged in
        adminCheck () {
            if(this.user != null) {
                if(this.user.uid == "oIyyxGD5u5ePK1aeaTNL6yx2xCF3") {
                    alert("You have administrator access");
                    this.admin = true;
                } else {
                    alert("You do not have access to this haha");
                }
            } else {
                alert("You are not logged in");
            
            } 
        },
        // returns a list of reviews for each specific drink
        reviewsOfDrink (drink) {
            return this.reviewsDB.filter(review => review.drinkItem == drink['.key']);
        },
        // adds drinks
        addDrink () {
            if(this.newDrinkName.length == 0 || this.newDrinkCaffeine.length == 0 || this.newDrinkCalories.length == 0 || this.newDrinkSugar.length == 0 || this.newDrinkPrice.length == 0 || this.newDrinkLocation.length == 0) {
                alert("Please submit information for all fields to submit");
            }
            this.newDrinkName = this.newDrinkName.trim();
            this.newDrinkLocation = this.newDrinkLocation.trim();
            this.newDrinkCaffeine = parseFloat(this.newDrinkCaffeine.trim());
            this.newDrinkCalories = parseFloat(this.newDrinkCalories.trim());
            this.newDrinkSugar = parseFloat(this.newDrinkSugar.trim());
            this.newDrinkPrice = parseFloat(this.newDrinkPrice.trim());
            
            if(isNaN(this.newDrinkCaffeine) || isNaN(this.newDrinkCalories) || isNaN(this.newDrinkSugar) || isNaN(this.newDrinkPrice)) {
                alert("Please submit numbers for caffeine, calories and drink price");
            }
            if (this.newDrinkName) {
                drinksRef.push({
                    name: this.newDrinkName,
                    caffeine: this.newDrinkCaffeine,
                    location: this.newDrinkLocation,
                    calories: this.newDrinkCalories,
                    sugar: this.newDrinkSugar,
                    price: this.newDrinkPrice,
                    expandInfo: false,
                    reviewScore: 0.0,
                })
            }
            activityRef.push({
                activity: "new drink added with name, "+this.newCardTitle,
                time: Date()
                
            }).then((data, err) => { if (err) { console.log(err) }});
            this.newDrinkName = '';
            this.newDrinkCaffeine = '';
            this.newDrinkCalories = '';
            this.newDrinkSugar = '';
            this.newDrinkPrice = '';
            this.newDrinkLocation = '';
        },
        // removes drinks
        removeDrinkItem (drinkItem) {
            activityRef.push({
                activity: "Drink removed with name, "+drinkItem.name,
                time: Date()
                
            }).then((data, err) => { if (err) { console.log(err) }});
            this.adminCheck();
            if(this.admin == true){
                drinksRef.child(drinkItem['.key']).remove();
            }
            
        },
        // udpates the ratings of a drink
        updateRating (drinkItem) {
            var oldRating = drinkItem.reviewScore;
            var newRating = parseFloat(this.newDrinkRating);
            if(isNaN(newRating)) {
                alert("Enter a real number rating!!!");
            } else if(newRating < 0 || newRating > 5) {
                alert("Enter a number rating between 0 and 5!!!");
            } else {
                var actualNew = (oldRating + newRating) * 0.5;
                drinksRef.child(drinkItem['.key']).update({ reviewScore: actualNew});
            }
        },
        
        //adds a review to a drink item
        addReview (drinkItem) {
            var drinkKey = drinkItem['.key'];
            this.newTextReview = this.newTextReview.trim();
            if (this.newTextReview) {
                if(this.user == null) {
                    alert("You must set up an account before writing long reviews");
                } else {
                    reviewsRef.push({
                        drinkName: drinkItem.name,
                        drinkItem: drinkKey,
                        review: this.newTextReview,
                        user: this.user.email,
                        time: Date()
                    })  
                }  
            }

            this.newTextReview = '';
        },
        
        // checks whether an item is already in a specific user's favorite list
        favoriteCheck(drinkItem,user) {
            var answer = false;
            if(user == null) {
                var answer = false;
            } else {
                for (var i = 0; i < this.favoritesDB.length; i++) {
                    //alert(this.favoritesDB[i].drinkItem);
                    //alert(drinkItem['.key']);
                    //alert(this.favoritesDB[i].user);
                    //alert(user.name);
                    if(this.favoritesDB[i].drinkItem == drinkItem['.key'] && this.favoritesDB[i].user == user.email){
                        answer = true;
                    }
                }
            
            }
            
            return answer;
        },
        
        // adds an item to a specific users favorites
        addFavorite (drinkItem) {
            var status = this.favoriteCheck(drinkItem,this.user);
            //alert(status);
            var drinkKey = drinkItem['.key'];
            if (this.user == null) {
                alert("You must set up an account before favoriting drinks");
                
            } else if (status == false){
                alert(drinkItem.name+" has been added to your favorites");
                favoritesRef.push({
                    drinkName: drinkItem.name,
                    drinkItem: drinkKey,
                    user: this.user.email,
                })
                
            } else {
                alert("This item has already been favorited");
            }  
        }
        
    }
}


</script>

<style scoped>

/* these are the vue component modals */
#popupDrinkBackground {
    position: fixed; 
    z-index: 1; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(0,0,0,0.3);
    left: 0;
    top: 0;
}
.pleaseWork {
    display: none;
}
.popupDrink {
    border-radius: 20px;
    margin-bottom: 0;
    position: absolute;
    z-index: 100;
    padding: 30px;
    width: 75%;
    height: 75%;
    overflow:scroll;
    bottom: 5%;
    top: 5%;
    left: 50%;
    transform: translate(-50%,0%);
    background: lightgray;
}
.cards {
    height: 500px;
}
.panel-heading {
    background-color: orange;
}
</style>
