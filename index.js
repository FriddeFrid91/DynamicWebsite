function enableBtn() {
   var check = document.getElementById("confirm");
   var send = document.getElementById("submit-btn")

   if (check.checked) {
    send.disabled = false;
   } else {
    send.disabled=true;
   }
}

function modalFunction() {
   
}


class User {
   constructor(id, username, email, firstName, lastName, address) {
      console.log(`Creating user: ID=${id}, username=${username}, email=${email}, firstName=${firstName}, lastName=${lastName}, address=${address}`)
       this.id = id,
       this.username = username,
       this.email = email,
       this.firstName = firstName,
       this.lastName = lastName,
       this.address = address
   }

   getUser() {
      return {
         id: this.id,
         username: this.username,
         email: this.email,
         firstName: this.firstName,
         lastName: this.lastName,
         address: this.address
      }
   }
}

async function fetchData(url, url2, url3) {

   try {
       let response = await fetch(url);
       let response2 = await fetch(url2);
       let response3 = await fetch(url3);
       
       let userData = await response.json();
       let postData = await response2.json();
       let commentsData = await response3.json();

       //console.log(JSON.stringify(userData.users, null, 2));
       let users = userData.users.map(user => new User(
               user.id,
               user.username,
               user.email,
               user.firstName,
               user.lastName,
               user.address, 
          
       ));
       const postContainer = document.querySelector('.postContainer');
       const moduleContainer = document.querySelector('.modal-content');
       moduleContainer.innerHTML = '';
       postContainer.innerHTML = ''; //Rensa

       postData.posts.forEach(post => {
         const match = users.find(user => user.id === post.id); //Kolla om userId passar med postId
         const match2 = commentsData.comments.find(comment => comment.id === post.id); //Kollar om commenitId passar med postId
         
         if (match && match2) {   //Om båda matchar.  

             //var modal = document.getElementById("myModal");

             moduleContainer.innerHTML = `${match.username}</p>`;
             
             const postElement = document.createElement('div');
            
             postElement.innerHTML = `<article><h2>${match.username}: ${post.title}</h2>
             const button = document.createElement("button");
             button.textContent = "open";
             button.id = "myBtn";
             document.body.appenchild(button);

             button.addEventListener("click", function() {
             alert("opening");
         });
             
             <button id="myBtn">${match.username}</button>

             <!-- The Modal -->
             <div id="myModal" class="modal">
             <!-- Modal content -->
             <div class="modal-content">
             <span class="close">&times;</span>
             <ul>
             <li><b>Username:</b> ${match.username}</li> 
             <li><b>Firstname:</b> ${match.firstName}</li> 
             <li><b>Lastname:</b> ${match.lastName}</li> 
             <li><b>Address:</b> ${match.address.address}</li> 
             <li><b>City:</b> ${match.address.city}</li>
             </ul>
             </div>
             </div>

             <p>${post.body} <br><b>Tags:</b> ${post.tags} 
             <br><b>Likes:</b> ${post.reactions.likes} <b>Dislikes:</b> ${post.reactions.dislikes}</p>
             <p><b>${match2.user.username}: </b> ${match2.body}</p></article>`;
             
             postContainer.appendChild(postElement);
            /*console.log(`${post.id} & ${match.username} and ${post.body}`);*/
         } else {
            console.log("No match.")
         }
      });

   } catch (error) {
       console.error("Error fetching data:", error);
   }
}

fetchData('https://dummyjson.com/users', 'https://dummyjson.com/posts', 'https://dummyjson.com/comments');

// Funktion för att visa modalen
function myFunction() {
   var modal = document.getElementById("myModal");
   modal.style.display = "block";
}

