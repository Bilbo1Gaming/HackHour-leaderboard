import { Database } from "bun:sqlite";
import e from "express";
const db = new Database("db.sqlite",{create: true});
db.exec('PRAGMA foreign_keys = ON')
db.run('pragma busy_timeout = 1000;');

let powerUnix = getWinner()

let site = `<!DOCTYPE html>
<html lang="en" class="dark" >
<head>
    <script> // Set a cookie or local storage indicating dark mode preference
        localStorage.setItem('preferred-color-scheme', 'dark');
        </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="/public/index.css">
    <style>
        /* Enable dark mode */
        /* @media (prefers-color-scheme: dark) {
            .dark\:bg-gray-900 { background-color: #1a202c; }
            .dark\:bg-gray-800 { background-color: #2d3748; }
            .dark\:bg-gray-700 { background-color: #4a5568; }
            .dark\:text-gray-300 { color: #d1d5db; }
            .dark\:text-gray-400 { color: #cbd5e0; }
            .dark\:text-gray-500 { color: #a0aec0; }
        }
        @media (prefers-color-scheme: light) {
            .dark\:bg-gray-900 { background-color: #1a202c; }
            .dark\:bg-gray-800 { background-color: #2d3748; }
            .dark\:bg-gray-700 { background-color: #4a5568; }
            .dark\:text-gray-300 { color: #d1d5db; }
            .dark\:text-gray-400 { color: #cbd5e0; } */
            /* .dark\:text-gray-500 { color: #a0aec0; }
        } */
        .idn {display: none;}

        @layer utilities {
  .tie-dye-background {
    background: 
      radial-gradient(circle at 10% 20%, #ff7e5f, transparent 30%),
      radial-gradient(circle at 30% 40%, #feb47b, transparent 30%),
      radial-gradient(circle at 50% 60%, #86a8e7, transparent 30%),
      radial-gradient(circle at 70% 80%, #8e44ad, transparent 30%),
      radial-gradient(circle at 90% 20%, #3498db, transparent 30%),
      radial-gradient(circle at 30% 70%, #2ecc71, transparent 30%),
      radial-gradient(circle at 50% 20%, #f39c12, transparent 30%),
      radial-gradient(circle at 70% 30%, #e74c3c, transparent 30%),
      radial-gradient(circle at 20% 80%, #9b59b6, transparent 30%);
    background-size: 200% 200%;
    animation: tie-dye-animation 60s linear infinite;
  }
  .sticky-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    overflow: visible;
    z-index: 10;
    padding-top: 0.5%;
    /* Add relative positioning to contain ::before pseudo-element */
    position: relative;
}

.sticky-top::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(0.5% + 10px); /* Adjust height as needed */
    background-color: rgb(17, 24, 39); /* Replace with your desired background color */
    z-index: -1;
}

        }
    </style>
</head>
<body class="bg-gray-100 dark:bg-gray-900 .dark .dark">
    <div id="rate-banner" class="hidden fixed bg-gradient-to-r from-red-900 to-red-800 rounded-2xl text-3xl font-bold text-center dark:text-gray-300 p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-50">
        You are being rate limited, please slow down!<br>
        <span id="rate-time">0</span> seconds remaining
    </div>
    
    

    <div class="max-w-4xl mx-auto p-6">
        

        <div class="text-3xl font-bold text-center mb-8 dark:text-gray-300">
            Arcade Leaderboard
            <div class="font-semibold" style="font-size: 20px;">Unfortunatly due to API changes and misuse this leaderboard no longer updates. <br>Last update was on Sun Jun 30 2024 21:00:00 GMT+0</div>
        </div>

        <div class="bg-gray-800 p-2 rounded shadow-sm flex flex-wrap items-center justify-between space-x-2 mt-4 relative">
            <div>
                <span class="text-gray-400">Active Sessions:</span>
                <span id="sessions" class="text-lg font-semibold text-red-500">Site is static due to API changes</span>
            </div>
        
            <div class="flex-auto text-right">
                <span class="text-gray-400">Your rank:</span>
                <span id="rank" class="text-lg font-semibold text-red-500">Site is static due to API changes</span>
            </div>
        
            <div class="absolute inset-x-0 bottom-0 border-b-2 border-gray-600"></div>
        </div>
        
        <hr style="height:10px; visibility:hidden;" />
        <div id="leaderboard" class="space-y-4">
        `

let footer = `</div>
        <br>
        <div id="end" class="text-3xl font-bold text-center mb-8 dark:text-gray-300">You have reached the end!</div>
    </div>
<!-- Footer -->
<footer class="bg-gray-800 text-white py-2 fixed bottom-0 left-0 right-0 w-full mt-4">
    <div class="container mx-auto px-4 sm:px-20">
        <div class="flex flex-col sm:flex-row items-center sm:justify-between sm:space-x-4 px-2">
            <!-- Credits Section -->
            <div class="flex items-center space-x-2">
                <a href="https://github.com/Bilbo1Gaming" class="flex items-center space-x-1 hover:text-gray-400">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" class="w-4 h-4 rounded-full">
                    <span class="text-xs">Bilbo1Gaming (ImLouis)</span>
                </a>
                <a href="https://github.com/ImNoahDev" class="flex items-center space-x-1 hover:text-gray-400">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" class="w-4 h-4 rounded-full">
                    <span class="text-xs">ImNoahDev</span>
                    <a href="https://www.imnoah.com" class="flex items-center space-x-1 hover:text-gray-400">
                        <img src="/public/ImNoah.png" alt="ImNoah Logo" class="w-4 h-4 rounded-full">
                        <span class="text-xs">ImNoah.com</span>
                </a>
            </div>
            <!-- Rights Reserved -->
            <div class="text-xs mt-2 sm:mt-0">
                <p>&copy; 2024 ImLouis and ImNoahDev. All rights reserved.</p>
            </div>
            <!-- Website Links -->
        </div>
    </div>
</footer>


    <!-- JavaScript for fetching leaderboard data and keyset pagination -->
    <script>

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const userID = urlParams.get('user_id')

        let nextCursor = null;
        let pageEnded = false;
        let isLoading = false;
        
        let fullWidthState = null;

        let powerUnix = ${powerUnix}

        let bannerTimer = 0

        

        // Load initial leaderboard when the page loads
        document.addEventListener('DOMContentLoaded', async () => {
            loadSequence();
                    
        });
        
        window.addEventListener("resize", changeSizeOfTZ)

        async function changeSizeOfTZ(){
            if (window.innerWidth < 700){
                if (fullWidthState) {
                    var elements = document.getElementsByClassName('tz');
        
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].style.display = 'none';
                    }
                }
                fullWidthState = false
            } else {
                if (!fullWidthState) {
                    var elements = document.getElementsByClassName('tz');
        
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].style.display = 'block';
                    }
                }
                fullWidthState = true
            }
        }

        async function TZAdjust(){
            if (window.innerWidth < 700){
                var elements = document.getElementsByClassName('tz');
    
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'none';
                }
                fullWidthState = false
            } else {
                var elements = document.getElementsByClassName('tz');
    
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'block';
                }
                fullWidthState = true
            }
        }

        async function loadSequence(){
            console.log("Loading")
            TZAdjust()
            setInterval(updateTimer, 20000)
            updateTimer()
        }
        

        // Keep track of pressed keys
        var pressedKeys = {};
        var idMode = false

        document.addEventListener('keydown', function(event) {
        // Set the corresponding key in the pressedKeys object to true
        pressedKeys[event.key] = true;

        // Check if both '.' and '/' keys are pressed
        if (pressedKeys['/'] && pressedKeys['i'] && pressedKeys['d']) {
            idMode = !idMode
            if (idMode){
                var elements = document.getElementsByClassName('dpn');
    
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'none';
                }
                var elements = document.getElementsByClassName('idn');
    
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'block';
                }
            } else {
                var elements = document.getElementsByClassName('dpn');
    
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'block';
                }
                var elements = document.getElementsByClassName('idn');
    
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'none';
                }
            }
        }
        });

        document.addEventListener('keyup', function(event) {
        // Set the corresponding key in the pressedKeys object to false when released
        pressedKeys[event.key] = false;
        });

    
        async function updateTimer() {
            unixDate = powerUnix
            // Get current Unix timestamp in seconds
            const currentUnixTime = Math.floor(Date.now() / 1000);
            
            // Calculate the difference in seconds
            const differenceInSeconds = currentUnixTime - unixDate;
            
            // Calculate days, hours, and minutes
            const days = Math.floor(differenceInSeconds / (60 * 60 * 24));
            const hours = Math.floor((differenceInSeconds % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((differenceInSeconds % (60 * 60)) / 60);
            
            // Update the timer display
            let timers = document.getElementsByClassName("timer")
            console.log(timers)
            for(let timer in timers){
                timers[timer].innerHTML = \`In 1st place for: <br> \${days}d \${hours}h \${minutes}m\`
            }
        
        
    }

    </script>

</body>

</html>
`

let entries = ``


const unix = db.query(`
    SELECT unix from ticketBatches ORDER BY unix DESC`
).get().unix

console.log("DB Latest unix",unix)


let leaderboardData = db.query(`
        SELECT row, rank, id, sessions, minutes, realname, displayname, avatar, tz FROM (
            SELECT ROW_NUMBER() OVER (ORDER BY minutes DESC) AS row, DENSE_RANK() OVER (ORDER BY minutes DESC) AS rank, users.id, sessions, minutes, users.realname, users.displayname, users.avatar, users.tz 
            FROM tickets
            LEFT JOIN users ON tickets.user=users.id
            WHERE unix = $unix
            ORDER BY minutes DESC
        ) AS keyset
        ORDER BY rank;`)
        .all({
            $unix: unix
        })


    console.log("Rendering Leaderboard")





        leaderboardData.forEach(entry => {
            const uId = entry.id;
            let profilePicture = entry.avatar;
            let realName = entry.realname;
            let displayName = entry.displayname || realName;
            let sessions = entry.sessions;
            let minutes = entry.minutes;
            let rank = entry.rank;
            let ticketUrl = "https://emoji.slack-edge.com/T0266FRGM/tw_admission_tickets/cab11d6f34ffab2d.png";
            let textcolor = 'text-gray'
            let timeZone = entry.tz;
            let timezoneColor = 'bg-gray-600'
            let nullcolor = 'bg-gray-800'
            let paddingu = "p-4"
            if (timeZone) {
                timeZone = timeZone.replace(/_/g, ' ').replace(/\//g, ', ').split(', ').reverse().join(', ');
            }
            if (!profilePicture) {
                profilePicture = '/public/nullimage.jpg';
            }
            if (!timeZone) {
                timeZone = 'Error with user data';
            }
            if (realName === null && displayName === null) {
                nullcolor = 'bg-gradient-to-r from-red-900 to-red-800'
                timezoneColor = ''
                timeZone = ""
                realName = 'Error with user data'
                displayName = 'Error'
            }

            if (rank == 1) {
                nullcolor = 'bg-gradient-to-r from-yellow-600 to-yellow-400'
                textcolor = 'text-black'
                timezoneColor = 'shadow-2xl bg-yellow-500' 
                ticketUrl = "public/blueTicket.png"
                paddingu = "p-6"

            }

            // Create entry HTML
            const entryHTML = `
                <div class="flex items-center ${paddingu} ${nullcolor} shadow-md rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    <a href="https://hackclub.slack.com/team/${uId}" target="_blank" rel="noreferrer noopener" >
                        <div class="flex items-center space-x-4">
                            <span class="text-2xl font-bold ${textcolor}-700 dark:${textcolor}-300">${rank}.</span>
                            <img src="${profilePicture}" alt="${realName}'s Profile Picture" class="w-12 h-12 rounded-xl">
                            <div>
                                <p class="dpn max-w-32 break-words text-lg font-semibold dark:${textcolor}-300 mr-2">${displayName}</p>
                                <p class="idn text-lg font-semibold dark:${textcolor}-300">${uId}</p>
                                <p class="${textcolor}-600 dark:${textcolor}-400">@${realName}</p>
                            </div>
                        </div>
                    </a>

                    
                    ${
                    rank == 1 ?  `<div style="box-shadow: 0 0px 10px 2px rgb(0 0 0 / 0.35);" class="tz ml-8 text-center ${timezoneColor} px-2 py-1 rounded-xl">
                        <p class="${textcolor}-600 dark:${textcolor}-300 font-bold">${timeZone}</p>
                    </div>` : `<div class="tz ml-8 text-center ${timezoneColor} px-2 py-1 rounded-xl">
                        <p class="${textcolor}-600 dark:${textcolor}-300 font-bold">${timeZone}</p>
                    </div>`
                    }

                    ${
                    rank == 1 ?  `<div style="box-shadow: 0 0px 10px 2px rgb(0 0 0 / 0.35);" class="tz timer tie-dye-background ml-auto mr-2 font-bold text-center ${timezoneColor} px-2 py-1 rounded-xl">
                        <p class="${textcolor}-600 dark:${textcolor}-300 font-bold">0:0:0</p>
                    </div>` : ``
                    }

                    <div class="ml-auto mr-2 flex items-center space-x-2">
                        <p class="text-2xl font-bold ${textcolor}-700 dark:${textcolor}-300">${Math.floor(minutes/60)}</p>
                        <img src="${ticketUrl}" alt="Ticket Icon" class="w-8 h-8">
                    </div>
                </div>
            `;


            // Append entry to leaderboard container
            entries += entryHTML

    })



function getWinner(){
    const winners = db.query(
        `SELECT unix,user FROM winners ORDER BY unix DESC`
    ).all()

    if (winners.length == 0){
        return 0
    }

    let currentWinner = winners[0].user
    let lastwinner 

    for (let winner in winners) {
        let winnerItem = winners[winner]
        if (winnerItem.user != currentWinner) {
            return (lastwinner.unix)
        }
        lastwinner = winnerItem
    }
}

await Bun.write("../static/index.html", site + entries + footer);