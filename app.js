const hoursV = document.getElementById('hours');
const minutesV = document.getElementById('minutes');
const secondV = document.getElementById('seconds');
const ampmV = document.getElementById('ampm');
const colonV = document.getElementById('colon');
const colon2V = document.getElementById('colon2');
const btn = document.getElementById("btn");
const timeZoneV = document.getElementById("timezone");


let offset = 0;
let secondDisplay = true;

async function syncWithOnlineTime() {
     fetch('https://timeapi.io/api/time/current/zone?timeZone=asia%2Fsingapore')
          .then(response => response.json())
          .then(data => {
               //console.log('Current date and time:', data.dateTime);
               // Example: "2025-05-20T13:47:30"
               const onlineTime = new Date(data.dateTime);
               const localTime = new Date();
               offset = onlineTime.getTime() - localTime.getTime();
               //console.log(offset)
          })
          .catch(error => {
               console.error('Error fetching time:', error);
          });
}

function updateClock() {
     const now = new Date(Date.now() + offset);

     let hours = now.getHours();
     const minutes = String(now.getMinutes()).padStart(2, '0');
     const seconds = String(now.getSeconds()).padStart(2, '0');

     const ampm = hours >= 12 ? 'PM' : 'AM';
     hours = hours % 12;
     hours = hours === 0 ? 12 : hours;
     hours = String(hours).padStart(2, '0');

     hoursV.textContent = hours;
     minutesV.textContent = minutes;
     secondV.textContent = seconds;
     ampmV.textContent = ampm;

     // Blink colons every second: toggle 'blink' class on colons
     const showColon = now.getSeconds() % 2 === 0; // even seconds = visible, odd = hidden
     colonV.classList.toggle('blink', !showColon);

     timeZoneV.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Sync time and start ticking
syncWithOnlineTime().then(() => {
     updateClock();
     setInterval(updateClock, 1000);
});




if (btn) {
     btn.addEventListener('click', function (event) {
          try {
               // Your event handler logic here
               console.log(secondDisplay);
               if (secondDisplay) {
                    secondV.style.display = 'none';
                    colon2V.style.display = 'none';
                    secondDisplay = false;
                    btn.textContent = "Show Seconds";
               } else {
                    secondV.style.display = 'inline';
                    colon2V.style.display = 'inline';
                    secondDisplay = true;
                    btn.textContent = "Hide Seconds";
               }
          } catch (error) {
               console.error('Error in event listener:', error);
               // Optionally handle or ignore the error
          }
     });
}

/* document.addEventListener('keydown', function (event) {
     if (event.code === 'Space') {
          // console.log('Spacebar pressed');
          // You can also prevent default action (e.g., scrolling)
          event.preventDefault();
     }
}); */