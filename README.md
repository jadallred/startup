# startup
my first repository for my start up application

Change from developement environment

changes from Github

changes from vsCode

I have learned from this assignment how to work on Github and also vsCode and how to pull and push from one to the other. How to solve merging issues and the ways to help so your work doesn't get ruined in one place and the benefits of multiple development environments.

Elevator Pitch:

Have you ever wanted to connect with your coworkers in an easy and fun way? This game application makes it so you can log onto the game and all compete for the highest score. The game is called swimming seahorse and you use the space bar key to swim between seaweed. If you get hit then the game is over and your score is displayed next to everyone else who played the game. 

[Note Jan 272023 at 3_48_08 PM.pdf](https://github.com/jadallred/startup/files/10523773/Note.Jan.272023.at.3_48_08.PM.pdf)



Key features

Secure login over HTTPS
Ability to use space bar to move seahorse
Scores from all users stored
Ability for admin to delete scores


server http://3.18.145.135

command to shell  ssh -i [key pair file] ubuntu@[ip address]


http://startupweb260.click/

Learned what a domain name is and subdomain names. Learned how to create a domain name and tie it to the public IP address. Now this can get accessed through any subdomain name


https://startupweb260.click/

now my website is secure! This is because of going through Caddy and such. 

Using HTML it is responsible for the basic layout but the design and style comes from CSS. 

From working on the simon project already i've been able to learn and understand more about HTML. Its confusing but as I was writing the code I realized its a little repetitive. 

worked on the simon CSS file and was able to see how they go individually into each button and help set it up. 

<img width="844" alt="Screen Shot 2023-02-24 at 7 24 54 PM" src="https://user-images.githubusercontent.com/123498729/221331385-59b7724d-dfe1-4b40-8cfe-e9e53a59a806.png">

I have learned more about the formatting of CSS and how they work with the HTML to bring life to the screen. Nothing can truly work until we do javascript. But the CSS is able to help the HTML bring the narwhal to life and add the moving bubbles across the screen. Also now there is a good border that cleans up the screen so nicely. 

Regular expressions in JavaScript are used for pattern matching and manipulation of text. They provide a powerful and flexible way to search for, match, and replace strings of text based on specific patterns.

<img width="777" alt="Screen Shot 2023-02-27 at 2 34 02 PM" src="https://user-images.githubusercontent.com/123498729/221695821-9a097593-af26-49e1-9aa2-34ac8eab89f3.png">


Some common use cases of regular expressions in JavaScript include:

Validation of user input: Regular expressions can be used to validate user input in web forms, such as email addresses, phone numbers, and passwords.

Searching and replacing text: Regular expressions can be used to search and replace specific patterns in a text string, such as replacing all instances of a particular word or phrase.

Parsing and extracting data: Regular expressions can be used to parse and extract data from structured text, such as extracting URLs from a web page or parsing log files.

String manipulation: Regular expressions can be used to manipulate and transform strings of text, such as removing whitespace or converting text to uppercase.

In summary, regular expressions are a powerful tool for text processing in JavaScript and are commonly used in web development, data processing, and other areas where text manipulation is required.

The spread operator and rest parameter are important features in JavaScript that allow for more flexible and concise code.

The spread operator (...) is used to spread the elements of an iterable (like an array or a string) into another iterable. This is useful when you want to combine two arrays, or when you want to pass the elements of an array as separate arguments to a function. By using the spread operator, you can avoid the need to manually loop through each element of an array and add it to a new array or pass each element individually as arguments to a function.

The rest parameter is used to represent an indefinite number of arguments as an array. This is useful when you want to create a function that can take in any number of arguments, without having to specify them all in the function definition. By using the rest parameter, you can create more flexible and reusable functions that can accept a variable number of arguments.

Both the spread operator and rest parameter are important because they can help make code more readable and maintainable. They also allow for more concise code, reducing the amount of boilerplate and repetition required. This can make it easier to write, understand, and modify code, which is especially important in larger and more complex applications.

Both array and object destructuring are important because they help make code more readable, maintainable, and concise. They can also reduce the amount of code needed to access individual elements or properties of arrays and objects, making it easier to work with more complex data structures. Array and object destructuring are commonly used in modern JavaScript development, and are considered essential features of the language


Through doing this JavaScript of Simon I was able to look through the original code and learn from it as I typed it up. This JavaScript code defines a function named loadScores() that loads scores from local storage and populates them into an HTML table.

The code first initializes an empty array named scores, then it retrieves the scores stored in local storage by calling localStorage.getItem('scores'). If the retrieved value is not null or undefined, the code parses the JSON string and stores the result in scores.

The function then selects the HTML element with ID scores and assigns it to the variable tableBodyEl. The code checks if the scores array has any elements; if so, it loops through the array using the entries() method to access both the index and the value of each score.At the end of the function, it calls loadScores() to execute the function and populate the scores in the HTML table. 

had to change the speed lots to make sure the timing was good, the index.html had to link the play.html so that the pages were shown in the correct order.


The fetch() function is a built-in JavaScript method that enables easy asynchronous data fetching from a web API endpoint. It returns a Promise that resolves to the response from the server, which can be used to extract data, handle errors, and manipulate the DOM. The fetch() function uses the HTTP protocol and can be used to send requests with various methods (GET, POST, PUT, DELETE, etc.) and headers. It is important to note that the fetch() function does not handle network errors, and therefore requires proper error handling using catch() or other means. Additionally, since the fetch() function is asynchronous, it does not block the main thread, which makes it a powerful tool for building fast and responsive web applications.
