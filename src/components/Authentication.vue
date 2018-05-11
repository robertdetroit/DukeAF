<template>
<ul>
    <li v-if="user" @click="personalityBox=!personalityBox"><a>{{user.name}}</a></li>
    <li v-if="user" @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
    <li v-else @click="signInPopup"><a><span class="glyphicon glyphicon-user"></span>Sign In</a></li>
    <!-- sign in "popup" container does not popup for email authentication, so provide so styling help -->
    <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
    <!-- below is the modal that pops up that shows more info on the users-->
    <!-- the information includes user info and all the reviews a specific user penned and all their favorites -->
    <div v-if="personalityBox">
        <div id="popupBackground">
            <div class="popupRob panel panel-warning">
                <div class="panel-heading">Name: {{user.name}}    Email: {{user.email}} </div>
                    <div class="panel-body">
                        <button type="button" @click="personalityBox=!personalityBox" class="btn btn-info">Minimize</button>
                        <hr>
                        <div>
                            <p>Reviews written by you, {{user.name}} </p>
                            <ul class="list-group">
                                <li class="list-group-item" v-for="reviews in reviewsOfDrink(user)">"{{reviews.review}}," written by you on {{reviews.time}}<button type="button" @click="removeReviewItem(reviews)" class="btn-danger">Remove</button></li>
                            </ul>
                            <p>Your favorites, {{user.name}} </p>
                            <ul class="list-group">
                                <li class="list-group-item" v-for="favorites in yourFavorites(user)">{{favorites.drinkName}}<button type="button" @click="removeFavoriteItem(favorites)" class="btn-danger">Remove</button></li></li>
                            </ul>
                        </div>
                        <div v-if="admin">
                            <p>Recent Activity</p>
                            <ul id="activityViewer">
                                <li class="activityViewer" v-for="activity in activities">{{ activity.activity }} on {{ activity.time }}</li>
                            </ul>
                        </div>
                </div>
            </div>    
        </div>
    </div>
        
</ul>
</template>

<script>
import { imagesRef, storageRef, drinksRef, activityRef, favoritesRef, reviewsRef } from '../database'
import Firebase from 'firebase'
import FirebaseUI from 'firebaseui'
// single instance of popup credentials UI
var authUI = new FirebaseUI.auth.AuthUI(Firebase.auth())

export default {
    name: 'Authentication',
    data () {
        return {
            isShown: false,
            personalityBox: false,
            admin: false
        }
    },
    firebase: {
        // local representations of firebase data, but separate from vue-images component data
        reviewsDB: reviewsRef,
        favoritesDB: favoritesRef,
        activities: activityRef
    },
    // methods provided to change value of user in parent component
    props: [
        'getUser',
        'setUser'
    ],
    // let HTML template access user as if it were a variable in this component
    computed: {
        user () {
            return this.getUser()
        }
    },
    // methods for signing in and out
    methods: {
        // this checks whether the logged in user is the admin account
        adminCheck () {
            if(this.user != null) {
                if(this.user.uid == "oIyyxGD5u5ePK1aeaTNL6yx2xCF3") {
                    alert("You have administrator access");
                    this.admin = true;
                } else {
                    alert("You are already logged in");
                }
            } else {
                alert("You are not logged in");
            
            } 
        },
        
        // this removes an item from a specificied users' lsit
        removeFavoriteItem (FavoriteItem) {
            favoritesRef.child(FavoriteItem['.key']).remove();
        },
        
        // this removes a review 
        removeReviewItem (reviewItem) {
            reviewsRef.child(reviewItem['.key']).remove();
        },
        
        // this filters all the reviews based on the user that wrote it
        reviewsOfDrink (user) {
            return this.reviewsDB.filter(review => review.user == user.email);
        },
        
        // this returns the filtered list of all the favorites belonging to a specific user
        yourFavorites (user) {
            return this.favoritesDB.filter(favorite => favorite.user == user.email);
        },
        
        //below is the code provided from the example_user activity we did in class
        signInPopup () {
            authUI.start('#firebaseui-auth-container', {
                // open the authentication flow as a popup
                signInFlow: 'popup',
                // require password each time
                credentialHelper: FirebaseUI.auth.CredentialHelper.NONE,
                // new users automatically created for new emails
                signInOptions: [{
                    provider: Firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true
                }],
                // respond to authenticaion attempts
                callbacks: {
                    signInSuccessWithAuthResult: authResult => {
                        // save interesting parts of user data
                        this.signIn(authResult.user)
                        // hide styling again
                        this.isShown = false
                        // do not redirect
                        return false
                    },
                    uiShown: () => {
                        // style UI container as a popup
                        this.isShown = true
                    }
                }
            })
        },
        signIn (user) {
            this.setUser({
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                isAnonymous: user.isAnonymous
            })
        },
        signOut () {
            Firebase.auth().signOut()
            this.setUser(null)
        }
    },
    mounted () {
        // allow user to automatically log in if returning to site after refresh
        Firebase.auth().onAuthStateChanged(authState => {
            if (authState) {
                this.signIn(authState);
                // this is to check whether the admin account is logged into from the start
                this.adminCheck();
            }
        })
    }
}
</script>

<style scoped>

/* these are the vue component modals */
.popup {
    position: absolute;
    z-index: 100;
    padding: 15px;
    width: 350px;
    height: 250px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,0%);
}

#popupBackground {
    position: fixed; 
    z-index: 1; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(0,0,0,0.7);
    left: 0;
    top: 0;
}
.popupRob {
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
</style>
