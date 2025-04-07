# MSA Website
The following details the structure of the website and how to use it. 

### Architecture 
The frontend is broken up into 4 major directories: <br>
- assets <br>
    this includes (media, css, svg, js) 
- components <br>
    this includes all utilities, support code, and the content of each page
- constants <br>
    this includes styles, colors, themes, anything which is hardcoded constants
- pages <br>
    this includes all the pages of the website, a page is a js file with a seperate url, otherwise it is a component

### Assets
The assets directory has 4 subdirectories:
- css 
    - util.css (general styles that are often used)
    - responsive.css (styles for responsive elements)
- js
    - prayerTimes.js (a js script that uses the latitude and longitude coordinates to - compute prayer times)
- media
    - ec (directory containing ec pictures by year)
    - prayer (directory containing pictures of prayer spaces)
    there are also several general purpose pictures in
    
### Constants
The constants directory currently has 1 index file which contains hardcoded information. The most important is the API constant. It specifies the endpoint for the mailing api (DO NOT CHANGE THIS OR THE MAILING API WILL NOT WORK!)

### Components
The components directory includes a lot of files. I highlight a few here which are used a lot

##### Files #####
###### Section
this component creates a section with a pre-stylized title, description and also accepts children. I reccomend using this component as a starting point when making new sections

###### Gallery
this file contains several components, notable amongst them is the `SlideShow` which allows you to create a slide show of images or elements

###### Animated 
this file contains several animation components for scroll based animations. More details about using Animated components further down.

###### Support 
this file contains support components, like the `Notification` and `useCustomState` components. These two are especially useful
- The Notification component requires you to create a state called notification and a state handler called setNotification 
````
const [notification, setNotification] = useCustomState({value: "", notify: false});
```` 
When notify is set to `true` the notification will appear for 6s (you can change the duration of the notification using the duration prop). 
<br>
- The `useCustomState` component allows you to store objects and update them reactively. This is very powerful as React does not do this by default. Instead of creating multiple variables, you can just create one object with several related fields.

###### Utils
- this file is reserved for js functions that help with other components like the `getNextPrayer` function and the `post` and `get` functions. 
###### Nav1
- this file contains the navbar component. This component is one of the more complex ones as it supports responsiveness and different orientations. It accepts several props (we highlight few): 
    1. `vertical` (if true, indicates the navbar is vertical along left side)
    2. `collapsed` (if true, indicates the navbar collapsed when the width is below 750px, this value can be changed in responsive.css)
    3. leftNav (a list of objects to populate the left, or top, half of the navbar with)
    4. rightNav (a list of objects to populate the right, or bottom, half of the navbar with)
###### Card
- this file contains Card components, like PersonCard and PrayerCard. These cards simply describe a template for showing team members or prayer spaces. This makes coding pages easier and cleaner

##### Directories ##### 
###### forms
- this is a directory of form components. The fields.js file contains pre-made fields like `FormField`, `PassFormField` and `DateFormField`. The contact1 is a pre-made contact form for messages, the mailingList component is the mailingList join form used in the landing page. 
###### content 
- this is a directory of files, each of which contains all necessary information to populate the page or component with the same name. All files in here are to be imported ONLY FROM PAGES and not components. The reason for this choice is to isolate the content of the page from its skeletal structure. Therefore, we can easily modify the skeleton without damaging the content and vise versa. 
###### api
- this directory includes all api calls (DO NOT INCLUDE APE CALLS OTUSIDE THIS DIRECTORY). Currently only contact api is included as part of the website. Each api function should take the setNotification as the last prop. This is to allow for user-feedback when an api request is made. 

### Pages
The pages directory includes each page in the website. A page is defined as a component with its own endpoint. In otherwords, a page can not be contained by another page. <br>
Currently there are 2 pages: 
- landing (has 3 sections: Mission, Team, and MailingList) 
- life (has 2 sections: Prayer Spaces and Resources)

### Modifying TEAM  
The TEAM object is located inside of /content/landing.js <br>
The object has 2 attributes: 
- title (a string header of the section)
- cards (a list of objects, each of which represents a person)
Each card has the following attributes:
- title (the person's position title)
- name 
- (optional) pic
- (optional) media (a list of objects, each of which represents a social media link with a href and icon)
Sister Nada has her own object with one card

### Build and Deploy
npm run build && ./deploy.sh