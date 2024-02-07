function generateFormattedDate() {
    // Create a new Date object
    var date = new Date();

    // Get the day of the week, month, date, year, hours, minutes, seconds
    var dayOfWeek = date.toLocaleString('en', { weekday: 'short' });
    var month = date.toLocaleString('en', { month: 'short' });
    var dayOfMonth = date.getDate().toString().padStart(2, '0');
    var year = date.getFullYear();
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');


    // Format the date and time string
    var formattedDate = `${dayOfWeek}+${month}+${dayOfMonth}+${year}+${hours}:${minutes}:${seconds}+GMT+0100+(Central+European+Standard+Time)`;

    return formattedDate;
}

// Test the function

// check how it compares to 19-44
const url = 'https://portal.upce.cz/StagPortletsJSR168/PredzapisServlet';
const headers = {
    "Host": "portal.upce.cz",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
    "Origin": "https://portal.upce.cz",
    "Connection": "keep-alive",
    "Referer": "https://portal.upce.cz/portal/studium/moje-studium/predzapis.html",
    "Cookie": "JSESSIONID=006E6E1AF76FAE7535EDC46D1058AB36",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin"
};

console.log(generateFormattedDate());

// need to relog if rate limited (BEZ_AKCE)

let array_execute = [{
	"action": "zapisZmen",
	"akce": "289156#289154#289155#",
	"katedra": "KE",
	"predmet": "BAMI2",
	"statut": "A",
	"time": "Wed+Feb+07+2024+19:17:23+GMT+0100+(Central+European+Standard+Time)"
}
]



function fetchData(formData) {
    setTimeout(() => {
        let formBody = Object.keys(formData).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])).join('&');
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: formBody
        })
        .then(response => response.text())
        .then(data => {
                console.log(data);
            
        })
        .catch((error) => console.error('Error:', error));
    }, 500); // Timeout of 500 milliseconds
}


array_execute.forEach((elem) => {
    elem.time = generateFormattedDate();
    fetchData(elem);
});



// rl.on('line', (line) => {
//     fetchData(line);
//     rl.close();
// });

// rl.on('close', () => {
//     console.log('Finished reading the file.');
// });



// array_execute.forEach((formData) => {
//     fetchData(formData);
// });




// const obj = [
//     {
//         "akce": "289153#289261#",
//         "katedra": "KE",
//         "predmet": "BELOB",
//         "statut": "A",
//     },
//     // BBEZP
//     {
//         "akce": "289188#",
//         "katedra": "KE",
//         "predmet": "BBEZP",
//         "statut": "A",
//     },
//     //
//     // BELOB
   
//     //
    
   
//     // Add more objects here if needed
// ];

// // let formData = {
// //     "action": "zapisZmen",
// //     "akce": item.akce,
// //     "katedra": item.katedra,
// //     "predmet": item.predmet,
// //     "statut": item.statut,
// //     "time": generateFormattedDate()
// // };
// obj.forEach((item, index) => {
//     item.action = "zapisZmen"; // Add the action property to each object
//     setTimeout(() => {
//         let formBody = Object.keys(item).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(item[key])).join('&');
//         console.log(formBody)
//         fetch(url, {
//             method: 'POST',
//             headers: headers,
//             body: formBody
//         })
//         .then(response => response.text())
//         .then(data => console.log(data))
//         .catch((error) => console.error('Error:', error));
//     }, Math.random() * (2000 - 1000) + 1000); // Random timeout between 0.5 and 0.8 seconds
// });