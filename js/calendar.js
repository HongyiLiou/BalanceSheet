
/** client_id */
// 778859427056-10vjmc69bmoco4ihp23te7vn08pj7o4f.apps.googleusercontent.com


/** api key */
// AIzaSyDyOOtKCJxiXo6oKV0eZv2_0E8B0wpTaUI

const credentialsJSON = {
    web: {
        "client_id": "778859427056-10vjmc69bmoco4ihp23te7vn08pj7o4f.apps.googleusercontent.com",
        "project_id": "quickstart-1593654771135",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "P5egwr0waQ7IIP5lcScgz4lo",
        "javascript_origins": [
            "http://localhost:8000"
        ]
    },
    web2: {
        "client_id": "642711235750-8rblvofmb9lpe7ldja07mkou1g38bf7u.apps.googleusercontent.com",
        "project_id": "root-rock-277903",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "Yx1JhqnX7zl4V97As4y3CLO_",
        "redirect_uris": [
            "https://hongyiliou.github.io/BalanceSheet/",
            "http://localhost:8848/index.html"
        ],
        "javascript_origins": [
            "http://localhost:8848",
            "https://hongyiliou.github.io"
        ]
    }
};



// Client ID and API key from the Developer Console
// var CLIENT_ID = '642711235750-8rblvofmb9lpe7ldja07mkou1g38bf7u.apps.googleusercontent.com';
const CLIENT_ID = '642711235750-8rblvofmb9lpe7ldja07mkou1g38bf7u.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDwWZgP8EiFW1IdT0_Ejctl9ecUl9shOvo';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');

let auth2;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

const revokeAllScopes = function () {
    auth2.disconnect();
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        auth2 = gapi.auth2.getAuthInstance();
        // Listen for sign-in state changes.
        auth2.isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(auth2.isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    auth2.signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    auth2.disconnect();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('No upcoming events found.');
        }
    });
}


/** 寫入 Google 行事曆 */
function insertEventToGoogleCalendar() {
    const googleCalendarEvent = document.querySelectorAll('.googleCalendarEvent');
    
    const timeObj1 = {
        year: 2020,
        month: 7,
        date: 9,
    }

    const timeObj2 = {
        year: 2020,
        month: 7,
        date: 10,
    }
    
    for (let i = 0; i < googleCalendarEvent.length ; i++) {
        var event = {
            'summary': googleCalendarEvent[i].value,
            'location': "",
            'description': '一些描述',
            'start': {
                'date': convertDateJsonToDateString(timeObj1),
                'timeZone': 'Asia/Taipei'
                },
            'end': {
                'date': convertDateJsonToDateString(timeObj2),
                'timeZone': 'Asia/Taipei'
                },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    // {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute();
    }
    // listUpcomingEvents();
}


function calendarListener() {
    const dateBlocks = document.querySelectorAll('.selectArea .calender .userSelectArea .datePicker_day li');
    const showArea_calendar = document.querySelector('.showArea_calendar');

    dateBlocks.forEach(dayBlock => {
        dayBlock.addEventListener('click', () => {
            const mousePos = getMouseElementPos();
            const windowWidth = document.body.offsetWidth;
            const windowHeight = document.body.offsetHeight;
            const hideCalendarInput = () => {
                showArea_calendar.classList.remove('active');
            }
            // console.log('mousePos', getMouseElementPos());
            // console.log('offsetWidth', document.body.offsetWidth);
            // console.log('offsetHeight', document.body.offsetHeight);
            showArea_calendar.classList.add('active');

            // 畫面左右
            showArea_calendar.style.left = mousePos.x < (windowWidth / 2) ? `${mousePos.x + 30}px` : `${mousePos.x - 330}px`;
            // 畫面上下
            showArea_calendar.style.top = 'initial';
            showArea_calendar.style.top = mousePos.y < (windowHeight / 2) ? `${mousePos.y - 100}px` : `${mousePos.y - 430}px`;
            showScreenHolder(true, hideCalendarInput)
            
        });
    });
}
