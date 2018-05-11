Robbie Ha rth19
=======
Started 4/25/2018, finished 4/29/2018, took (an estimate) 50 hours


## list of the students with whom you discussed the assignment:  
none

## any books, papers, or online resources that you consulted in developing your web site:  
the resource that I relied on the most was the example_users repo posted by Professor Duvall. I used that as  
the initial framework to begin this project. I also utilized the lab_mashup for information of how to utilize the 
Google Map API efficiently. I alo ulilized Piazza posts, pretty extensively. The post that assisted me the most  
was the following: https://piazza.com/class/jc9droflt495u?cid=425, as accessing the duke api data  
was one of the largest obstacles I had to cross because of initial mistakes. Aside from that, I referenced  
my own code from Trello for a refresher on Firebase.


## any assets (code, images, or sounds) used within your web site:  
there are no assets aside from what someone will upload

## any bugs or concerns still remaining within your web site:  
Not that I am aware of!
## extra credit features implemented: 
    1. "View project "activities" that shows changes made to any drink and when the change was made"

## what makes your application useful:  
My website allows people to plan their long nights of studying for their projects  
or coding projects, by allowing them to filter their caffeinated beverages by how long it will last  
in their system, by caffeine, by location, by building, as well as by calorie, price and sugar intake.  
It also allows users to rate an write reviews for these drinks, as well as save them individual as  
"favorites" that are associated with their account.

## special instructions needed to set up, run, access, or use your application (like user passwords you have set up, command line utilities, or external programs that need to be run):

To access the administrator account (which is neccessary to add more drinks, or to delete them, as well as to view  
the activity log of all actions having to do with drink manipulation), you use the following login information.  
email: admin@admin.com
password: password

The rest of the website should be rather straightforward to navigate through! You can click on each google marker to  
filter it by the building, in addition with the filters in the bottom navigation bar. Each drink card also has a modal which has extram information (such as adding it to your favorites and reviews and rates for the drinks)

## references for your data that establishes its authenticity:

I utilized the Google API (using my own key which is in the secrets.js file). Furthermore, I generated an API key to access
the Duke Places API (40220bb3573c3e93389b8964d181d363). The drink data, I entered myself!

## discuss both the pros and the cons of different framework possibilities you considered and why you made the decision you did (including choosing not to use any framework):

I utlized Node.js, because my website had very different distinct parts that would work very efficiently with components. In addition, I used vue components because of the ability to use the following (v-if, v-for), which I found extremely useful in webdev, as well as the built in google map components. The con I guess was having to use the command terminal almost religiously to see any immediate tangible affects of my code.

I also utilized the firebase framework, which was extremely helpful because of its built in authentication abilities, which worked rather seamlesly with my web app. The con is that it's a nuisance to have to deal with so many different firebase references throughout the vode.

I was also planning on utilizing ember.js, which I expiremented on for my explore library project, because of its ability to have centralized data and the use of routers along with components. However, the con of deployment difficulties proved too big to overcome. 

I hope y'all enjoy this web app!

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
