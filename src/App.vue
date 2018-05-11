<template>
<div id="app">
    <header>
        <nav class="navbar navbar-inverse" id="mainNav">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand">Duke(aF) ~ Caffeinator for Dukies</a>
                </div>
                <authentication class="nav navbar-nav navbar-right"
                    :getUser="getUser"
                    :setUser="setUser">
                </authentication>
            </div>
        </nav>
        <!-- The following navbar serves as a filter bar for all the drinks on the right-->
        <nav class="navbar navbar-default" id="filterNav">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Filter by...</a>
                </div>
                <ul class="nav navbar-nav">
                    <li id="timeFilter" @click="setTimeClicked=!setTimeClicked"><a id="timeFilter">Time</a></li>
                    <li id="caffeineFilter" @click="setCaffeineClicked=!setCaffeineClicked"><a href="#">Caffeine</a></li>
                    <li id="calorieFilter" @click="setCaloriesClicked=!setCaloriesClicked"><a href="#">Calories</a></li>
                    <li id="sugarFilter" @click="setSugarClicked=!setSugarClicked"><a href="#">Sugar</a></li>
                    <li id="priceFilter" @click="setPriceClicked=!setPriceClicked"><a href="#">Price</a></li>
                    <li id="reviewFilter" @click="setReviewClicked=!setReviewClicked"><a href="#">Review</a></li>
                    <li id="locationFilter" @click="setLocationClicked=!setLocationClicked"><a href="#">Location</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a id="mapFilter" @click="resetBuilding()" href="#">Selected Map Location: {{ chosenBuilding }} </a></li>

                </ul>
            </div>
        </nav>
    </header>
    <main>
        <!-- The following div objects are the respective modal popouts for each category-->
        <!-- Each modal allows you to customize the search in that given category-->
        <div v-if="setTimeClicked">
            <div id="popupBackground">
                <div class="popup panel panel-warning">
                    <div class="panel-heading">How many hours?</div>
                    <div class="panel-body">
                        <section v-cloak>
                            <input placeholder="Min. Hours Needed"
                                v-model="minTime"
                            >
                            <input placeholder="Max. Hours Needed"
                                v-model="maxTime"
                            >
                        </section>
                        <hr>
                        <button type="button" @click="setTime()" class="btn btn-success">Apply</button>
                        <button type="button" @click="resetTime()" class="btn btn-info">Reset This Filter</button>
                        <button type="button" @click="setTimeClicked=!setTimeClicked" class="btn btn-danger">Exit</button>
                        <hr>
                    </div>
                </div>    
            </div>
        </div>
        <div v-if="setCaffeineClicked">
            <div id="popupBackground">
                <div class="popup panel panel-warning">
                    <div class="panel-heading">How much Caffeine?</div>
                    <div class="panel-body">
                        <section v-cloak>
                            <input placeholder="Min. Caffeine Mg. Needed"
                                v-model="minCaf"
                            >
                            <input placeholder="Max. Caffeine Mg. Needed"
                                v-model="maxCaf"
                            >
                        </section>
                        <hr>
                        <button type="button" @click="setCaffeine()" class="btn btn-success">Apply</button>
                        <button type="button" @click="resetCaffeine()"class="btn btn-info">Reset This Filter</button>
                        <button type="button" @click="setCaffeineClicked=!setCaffeineClicked" class="btn btn-danger">Exit</button>
                        <hr>
                    </div>
                </div>    
            </div>
        </div>
        <div v-if="setCaloriesClicked">
            <div id="popupBackground">
                <div class="popup panel panel-warning">
                    <div class="panel-heading">How many Calories?</div>
                    <div class="panel-body">
                        <section v-cloak>
                            <input placeholder="Min. Calories Needed"
                                v-model="minCal"
                            >
                            <input placeholder="Max. Calories Needed"
                                v-model="maxCal"
                            >
                        </section>
                        <hr>
                        <button type="button" @click="setCalories()" class="btn btn-success">Apply</button>
                        <button type="button" @click="resetCalories()"class="btn btn-info">Reset This Filter</button>
                        <button type="button" @click="setCaloriesClicked=!setCaloriesClicked" class="btn btn-danger">Exit</button>
                        <hr>
                    </div>
                </div>    
            </div>
        </div>
        <div v-if="setSugarClicked">
            <div id="popupBackground">
                <div class="popup panel panel-warning">
                    <div class="panel-heading">How much Sugar?</div>
                    <div class="panel-body">
                        <section v-cloak>
                            <input placeholder="Min. Sugar (g) Needed"
                                v-model="minSug"
                            >
                            <input placeholder="Max. Sugar (g) Needed"
                                v-model="maxSug"
                            >
                        </section>
                        <hr>
                        <button type="button" @click="setSugar()" class="btn btn-success">Apply</button>
                        <button type="button" @click="resetSugar()"class="btn btn-info">Reset This Filter</button>
                        <button type="button" @click="setSugarClicked=!setSugarClicked" class="btn btn-danger">Exit</button>
                        <hr>
                    </div>
                </div>    
            </div>
        </div>
        <div v-if="setPriceClicked">
            <div id="popupBackground">
                <div class="popup panel panel-warning">
                    <div class="panel-heading">What Price</div>
                    <div class="panel-body">
                        <section v-cloak>
                            <input placeholder="Min. Price ($) Needed"
                                v-model="minPrice"
                            >
                            <input placeholder="Max. Price ($) Needed"
                                v-model="maxPrice"
                            >
                        </section>
                        <hr>
                        <button type="button" @click="setPrice()" class="btn btn-success">Apply</button>
                        <button type="button" @click="resetPrice()"class="btn btn-info">Reset This Filter</button>
                        <button type="button" @click="setPriceClicked=!setPriceClicked" class="btn btn-danger">Exit</button>
                        <hr>
                    </div>
                </div>    
            </div>
        </div>
        <div v-if="setReviewClicked">
            <div id="popupBackground">
                <div class="popup panel panel-warning">
                    <div class="panel-heading">What review?</div>
                    <div class="panel-body">
                        <section v-cloak>
                            <input placeholder="Min. x/5 Rating Needed"
                                v-model="minRate"
                            >
                            <input placeholder="Max. x/5 Rating Needed"
                                v-model="maxRate"
                            >
                        </section>
                        <hr>
                        <button type="button" @click="setReview()" class="btn btn-success">Apply</button>
                        <button type="button" @click="resetReview()"class="btn btn-info">Reset This Filter</button>
                        <button type="button" @click="setReviewClicked=!setReviewClicked" class="btn btn-danger">Exit</button>
                        <hr>
                    </div>
                </div>    
            </div>
        </div>
        <div v-if="setLocationClicked">
            <div id="popupBackground">
                <div class="popup panel panel-warning">
                    <div class="panel-heading">What location?</div>
                    <div class="panel-body">
                        <section v-cloak>
                            <select name="basic-dropdown" v-model="selectedLocation">
                                <option v-for="place in placesAfter">{{ place.name }}</option>
                            </select>
                        </section>
                        <hr>
                        <button type="button" @click="setLocation()" class="btn btn-success">Apply</button>
                        <button type="button" @click="resetLocation()" class="btn btn-info">Reset This Filter</button>
                        <button type="button" @click="setLocationClicked=!setLocationClicked" class="btn btn-danger">Exit</button>
                        <hr>
                    </div>
                </div>    
            </div>
        </div>

        <!-- This is the google maps api-->
        <gmap-map 
        id="leftHalf"
        :center="center"
        :zoom="15"
        style="height: 480px;"
        >
            <gmap-marker
                v-for="(m, index) in markers"
                :key="index"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                @click="setBuilding(m.name)"
            ></gmap-marker>
            
        </gmap-map>
        <!-- This is the drink view component I coded-->
        <drink_view id="rightHalf"
        :currentDrinks="drinkFilter"
        :places="places"
        :user="user">
        </drink_view>
        
    </main>
</div>
</template>

<script>
import { imagesRef, storageRef, drinksRef, activityRef, placesRef } from './database'
import Authentication from './components/Authentication'
import drinkView from './components/DrinkView'
import VueImages from 'vue-images'
import fetch from 'node-fetch'

var DUKE_API_URL = 'https://streamer.oit.duke.edu/places/items?tag=dining&access_token=40220bb3573c3e93389b8964d181d363'

export default {
    name: 'App',
    data () {
        return {
            // state for vue-images component, must be established BEFORE component is rendered
            center: {
                lat: 36.0014,
                lng: -78.9382
            },
            markers: [
                {
                    position: { lat: 35.99, lng: -78.89}, // Durham, NC
                }
            ],
            
            images: [],
            places: [],
            placesAfter: [],
            // useful data about the current user
            user: null,
            time: null,
            setTimeClicked: false,
            minTime: '',
            maxTime: '',
            setCaffeineClicked: false,
            minCaf: '',
            maxCaf: '',
            setCaloriesClicked: false,
            minCal: '',
            maxCal: '',
            setSugarClicked: false,
            minSug: '',
            maxSug: '',
            setPriceClicked: false,
            minPrice: '',
            maxPrice: '',
            setReviewClicked: false,
            minRate: '',
            maxRate: '',
            setLocationClicked: false,
            selectedLocation: '',
            setTimeFilter: false,
            setPriceFilter: false,
            setCaffeineFilter: false,
            setCaloriesFilter: false,
            setSugarFilter: false,
            setReviewFilter: false,
            setLocationFilter: false,
            chosenBuilding: '',
            setBuildingFilter: false
        }
    },
    firebase: {
        // local representations of firebase data, but separate from vue-images component data
        drinksDB: drinksRef
    },
    computed: {
        //this returns a list of all the places gathered from the Duke places api
        placeList () {
            return this.places;
        },
        // this essentially delivers all the drinks as they are, though pointless here it was used for testing for develppment
        drinkFilterOne () {
            var allDrinks = this.drinksDB;
            return allDrinks;
        },
        // this filters drinks by all the categories in a specificied order
        drinkFilter () {
            var allDrinks = this.drinksDB;
            if(this.setBuildingFilter) {
                var array1 = [''];
                for (var i = 0; i < this.placesAfter.length; i++) {
                    //alert(this.placesAfter[i].location);
                    if(this.placesAfter[i].location == this.chosenBuilding){
                        //alert("yes");
                        //alert(this.placesAfter[i].name);
                        var array2 = allDrinks.filter(drink => drink.location == this.placesAfter[i].name);
                        array1 = array1.concat(array2);
                    }
                }
        
                allDrinks = array1;
                allDrinks.splice(0,1);
                
                
                
            }
            if(this.setLocationFilter) {
                allDrinks = allDrinks.filter(drink => drink.location == this.selectedLocation)
            }
            if(this.setTimeFilter) {
                var caffeineMGMin;
                var caffeineMGMax;
                if(this.maxTime <= 3 ) { caffeineMGMax = 50; }
                else if(this.maxTime <= 5 ) { caffeineMGMax = 100; }
                else if(this.maxTime <= 7 ) { caffeineMGMax = 150; }
                else if(this.maxTime > 7 ) { caffeineMGMax = 300; }
                if(this.minTime <= 3 ) { caffeineMGMin = 0; }
                else if(this.minTime <= 5 ) { caffeineMGMin = 50; }
                else if(this.minTime <= 7 ) { caffeineMGMin = 100; }
                else if(this.minTime > 7 ) { caffeineMGMin = 150; }
                allDrinks = allDrinks.filter(drink => drink.caffeine >= caffeineMGMin);
                allDrinks = allDrinks.filter(drink => drink.caffeine <= caffeineMGMax);
            }
            if(this.setPriceFilter){
                allDrinks = allDrinks.filter(drink => drink.price >= this.minPrice);
                allDrinks = allDrinks.filter(drink => drink.price <= this.maxPrice);
            
            }
            if(this.setCaffeineFilter){
                allDrinks = allDrinks.filter(drink => drink.caffeine >= this.minCaf);
                allDrinks = allDrinks.filter(drink => drink.caffeine <= this.maxCaf);
            
            }
            if(this.setCaloriesFilter){
                allDrinks = allDrinks.filter(drink => drink.calories >= this.minCal);
                allDrinks = allDrinks.filter(drink => drink.calories <= this.maxCal);
            
            }
            if(this.setSugarFilter){
                allDrinks = allDrinks.filter(drink => drink.sugar >= this.minSug);
                allDrinks = allDrinks.filter(drink => drink.sugar <= this.maxSug);
            
            }
            if(this.setReviewFilter){
                allDrinks = allDrinks.filter(drink => drink.reviewScore >= this.minRate);
                allDrinks = allDrinks.filter(drink => drink.reviewScore <= this.maxRate);
            
            }
            
            return allDrinks;
        }
        
    
    },
    components: {
        Authentication,
        drink_view: drinkView,
        drink_view: drinkView,
        VueImages
    },
    methods: {
        // this sets the building to filter the drinks
        setBuilding (name) {
            this.resetLocation();
            //alert(name);
            this.chosenBuilding = name.trim();
            this.setBuildingFilter = true;
            document.getElementById("mapFilter").style.backgroundColor = "orange";
        },
        // this resets the building
        resetBuilding () {
            this.setBuildingFilter = false;
            this.chosenBuilding = '';
            document.getElementById("mapFilter").style.backgroundColor = "#F8F8F8";
        },
        
        // this resets the location, or the restaurant
        resetLocation () {
            this.setLocationFilter = false;
            this.selectedLocation = '';
            document.getElementById("locationFilter").style.backgroundColor = "#F8F8F8";
        },
        // allow child component to change user value
        getUser () {
            return this.user
        },
        setUser (user) {
            this.user = user
        },
        // this sets the time interval you want to stay caffeinated
        setTime () {
            if(isNaN(this.minTime) || isNaN(this.maxTime)) {
                alert("Please reenter with actual numbers");
            
            } else if (this.maxTime < this.minTime) {
                alert("Your max is greater than your min. Try again");
            } else {
                
                
                this.setTimeFilter = true;
                this.setTimeClicked = false;
                document.getElementById("timeFilter").style.backgroundColor = "orange";
            }
                
        },
        
        // this resets the time interval you want to stay caffeinated
        resetTime () {
            this.setTimeFilter = false;
            this.minTime = '';
            this.maxTime = '';
            document.getElementById("timeFilter").style.backgroundColor = "#F8F8F8";
        },
        // this sets the caffeine interval you want
        setCaffeine () {
            if(isNaN(this.minCaf) || isNaN(this.maxCaf)) {
                alert("Please reenter with actual numbers");
            
            } else if (this.maxCaf < this.minCaf) {
                alert("Your min is greater than your max. Try again");
            } else {
                
                this.setCaffeineFilter = true;
                this.setCaffeineClicked = false;
                document.getElementById("caffeineFilter").style.backgroundColor = "orange";
            }
            
        },
        // this resets the caffeine interval you want for you drinks
        resetCaffeine () {
            this.setCaffeineFilter = false;
            this.minCaf = '';
            this.maxCaf = '';
            document.getElementById("caffeineFilter").style.backgroundColor = "#F8F8F8";
        },
        // this sets the price interval you want for your drinks
        setPrice () {
            if(isNaN(this.minPrice) || isNaN(this.maxPrice)) {
                alert("Please reenter with actual numbers");
            
            } else if (this.maxPrice < this.minPrice) {
                alert("Your max is greater than your min. Try again");
            } else {
                
                this.setPriceFilter = true;
                this.setPriceClicked = false;
                document.getElementById("priceFilter").style.backgroundColor = "orange";
            }
            
        },
        // this resets the price interval you want for your drinks
        resetPrice () {
            this.setPriceFilter = false;
            this.minPrice = '';
            this.maxPrice = '';
            document.getElementById("priceFilter").style.backgroundColor = "#F8F8F8";
        },
        // this sets the calorie interval you want for your drinks
        setCalories () {
            if(isNaN(this.minCal) || isNaN(this.maxCal)) {
                alert("Please reenter with actual numbers");
            
            } else if (this.maxCal < this.minCal) {
                alert("Your max is greater than your min. Try again");
            } else {
                
                this.setCaloriesFilter = true;
                this.setCaloriesClicked = false;
                document.getElementById("calorieFilter").style.backgroundColor = "orange";
            }
            
        },
        // this resets the calorie interval you want for your drinks
        resetCalories () {
            this.setCaloriesFilter = false;
            this.minCal = '';
            this.maxCal = '';
            document.getElementById("calorieFilter").style.backgroundColor = "#F8F8F8";
        },
        // this sets the sugar interval you want for your drinks
        setSugar () {
            if(isNaN(this.minSug) || isNaN(this.maxSug)) {
                alert("Please reenter with actual numbers");
            
            } else if (this.maxSug < this.minSug) {
                alert("Your max is greater than your min. Try again");
            } else {
                
                this.setSugarFilter = true;
                this.setSugarClicked = false;
                document.getElementById("sugarFilter").style.backgroundColor = "orange";
            }
            
        },
        // this resets the sugar interval you want for your drinks
        resetSugar () {
            this.setSugarFilter = false;
            this.minSug = '';
            this.maxSug = '';
            document.getElementById("sugarFilter").style.backgroundColor = "#F8F8F8";
        },
        // this sets the rating interval you want for your drinks
        setReview () {
            if(isNaN(this.minRate) || isNaN(this.maxRate)) {
                alert("Please reenter with actual numbers");
            
            } else if (this.maxRate < this.minRate) {
                alert("Your max is greater than your min. Try again");
            } else {
                
                this.setReviewFilter = true;
                this.setReviewClicked = false;
                document.getElementById("reviewFilter").style.backgroundColor = "orange";
            }
            
        },
        // this resets the rating interval you want for your drinks
        resetReview () {
            this.setReviewFilter = false;
            this.minRate = '';
            this.maxRate = '';
            document.getElementById("reviewFilter").style.backgroundColor = "#F8F8F8";
        },
        // this sets the location, or restaurant you want for your drinks
        setLocation () {
            this.selectedLocation = this.selectedLocation.trim();
            if(this.selectedLocation.length == 0) {
                alert("You did not select anything, try again");
            } else {
                //alert(this.selectedLocation);
                this.setLocationFilter = true;
                this.setLocationClicked = false;
                document.getElementById("locationFilter").style.backgroundColor = "orange";
            }
            
        },
        // this resets the location, or restaurant you want for your drinks
        resetLocation () {
            this.setLocationFilter = false;
            this.selectedLocation = '';
            document.getElementById("locationFilter").style.backgroundColor = "#F8F8F8";
        },
        //this fetches Duke restaurant data from the duke places api
        getCORSData (url) {
            const proxyURL = "https://cors-anywhere.herokuapp.com/";
            fetch(proxyURL + url)
                .then(response => response.json())
                .then(data => {
                    for (var i = 0; i < data.length; i++) {
                                    this.markers.push({
                                        name: data[i].location,
                                        position: {
                                            lat: parseFloat(data[i].position.latitude),
                                            lng: parseFloat(data[i].position.longitude)
                                        }
                                    });
                                    this.places.push({
                                        name: data[i].name,
                                        location: data[i].location,
                                        open: data[i].open,
                                        phone: data[i].phone,
                                        position: {
                                            lat: parseFloat(data[i].position.latitude),
                                            lng: parseFloat(data[i].position.longitude)
                                        }
                                    });
                                    

                    }
                
                
                })
                .catch(() => console.log("Access to " + url + " is still blocked."))
        }
        
    },
    mounted () {
        this.getCORSData(DUKE_API_URL);
        this.places = this.placesAfter;
    }
}
</script>

<style scoped>
#app {
  text-align: center;
  margin: 0px;
}

h2 {
    text-align: center;
}

section {
    margin-top: 40px;
}

#leftHalf {
    width: 50%;
    float: left;
    
}
#rightHalf {
    width: 50%;
    height: 480px;
    overflow:scroll;
    float: right;
    
}
#mainNav {
    border-radius: 0px;
    margin-bottom: 0;
}
#filterNav {
    border-radius: 0px;
    margin-bottom: 0;
    background-color: '#F5F5F5';
}

/* these are the vue component modals */
#popupBackground {
    position: fixed; 
    z-index: 1; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(0,0,0,0.7);
    left: 0;
    top: 0;
}
.popup {
    border-radius: 20px;
    margin-bottom: 0;
    position: absolute;
    z-index: 100;
    padding: 30px;
    width: 350px;
    height: 300px;
    top: 30%;
    left: 50%;
    transform: translate(-50%,0%);
    background: lightgray;
}
.filtered {
    color: red;
}
.navbar a {
    color: orange;
}
</style>
