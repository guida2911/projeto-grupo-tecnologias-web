document.querySelector("#formLogin").addEventListener('submit', (event) => {
    event.preventDefault();
    Login();
})

document.querySelector("#formRegister").addEventListener('submit', (event) => {
    event.preventDefault();
    Register();
})

let comments = []

let museu_name = []
let museu_description = []
let museu_image = []
let passwords = ["admin", "user"]
let usernames = ["admin", "user"]
let user_login_name; let user_login_pass
let user_register_name; let user_register_confirm_name; let user_register_pass; let user_register_confirm_pass

let userlogged = false; let accountlogged = ""

let register_verified = 1



function Login(){
  
    user_login_name = document.querySelector("#login_name").value 
    user_login_pass = document.querySelector("#login_pass").value
    for(let i = 0;i<usernames.length;i++){
        if(passwords[i] == user_login_pass && usernames[i] == user_login_name){
            userlogged = true
            accountlogged = usernames[i]
            alert("Logged in to "+usernames[i]+"!")
            console.log(usernames[i]);
            Logged();
            return(true);
        } 
    }
alert("Não existe conta com esse nome/pass!")
return false;
}

function Register(){
    user_register_name =  document.querySelector("#register_name").value
    user_register_confirm_name = document.querySelector("#register_confirm_name").value 
    user_register_pass = document.querySelector("#register_pass").value
    user_register_confirm_pass = document.querySelector("#register_confirm_pass").value
    if(user_register_name == user_register_confirm_name && user_register_pass == user_register_confirm_pass){
    for(let i = 0;i<usernames.length;i++){
        if(usernames[i] == user_register_name){
           register_verified = 0
        }
    }
    if(register_verified == 1){
            usernames.push(user_register_name)
            passwords.push(user_register_pass)
            userlogged = true
            accountlogged = user_register_name
            alert("Conta criada com sucesso!")
            console.log(user_register_name); console.log(user_register_pass)
            Logged();
        } else{alert("Já existe uma conta com esse nome!")}
        register_verified = 1
} 
else{alert("Certifique-se de que a password/nome e o confirmar password/nome são iguais.")}
return false;
}

function Museu(){
document.head.innerHTML = (`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art Space</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/CSS/Museu.css"> 
    `)
document.querySelector("main").innerHTML = (`  
      <main>
    <section class="searchBar">

      <div class="bar">
        <p id="searchTitle" onclick="MainPage()">Art Space</p>
        <img src="/EXTRA/searchIcon.png" id="searchIcon" alt="Icon de pesquisa">
        <input type="text" placeholder="Search" id="searchText">
      </div>

      <div class="searchSpace"></div>

    </section>

    <section>

      <img id="pillar1" src="/EXTRA/PillarsHalf2.png" alt="Imagem cortada de um pilar decorativo do website.">
      <img id="pillar2" src="/EXTRA/PillarFull.png" alt="Imagem de um pilar decorativo do website.">

      <div id="container1">
        <div class="museu1" onclick="Museum1()">
          <img src="/EXTRA/Museum/m1.png" alt="Imagem do Museu do Louvre">
        </div>
        <div class="museu1Texto">
          <h1> Louvre Museum</h1>
          <p>The Louvre Museum is the world's largest and most visited art museum, <br>
            housed in a former royal palace on the Seine River,
            famous for iconic works like the Mona Lisa,<br> Venus de Milo and Winged Victory of Samothrace,
            showcasing art from ancient civilizations <br>to the mid-19th century
            through its extensive departments like Egyptian, Greek, Roman,<br> Paintings,
            and Islamic Art.</p>
          <p><u>Location:</u>Paris, France</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

         <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>

      <div id="container2">
        <div class="museu2" onclick="Museum2()">
          <img src="/EXTRA/Museum/m2.png" alt="Imagem do Museu do Louvre">
        </div>
        <div class="museu2Texto">
          <h1> Nacional Art Museum</h1>
          <p>The National Art Museum of China, also known as NAMOC is China's premier <br>
            institution for modern and contemporary plastic arts, <br>
            featuring a collection of over 100,000 works by Chinese masters <br>
            from the late 19th century onward, housed in a distinctive building <br>
            with traditional Chinese architectural elements like yellow glazed tiles and pavilions, <br>
            serving as a cultural landmark for exhibiting, collecting, researching,<br>
            and educating on Chinese art history and development, with a sculpture park<br>
            and international exchanges adding to its scope. </p>
          <p><u>Location:</u>Beijing, China</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

         <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>

      <div id="container3">
        <div class="museu3" onclick="Museum3()">
          <img src="/EXTRA/Museum/m3.png" alt="Imagem do Museu do Louvre">
        </div>
        <div class="museu3Texto">
          <h1> Vatican Museum</h1>
          <p>The Vatican Museums are a vast complex in Vatican City housing<br>
            immense art and historical collections amassed by popes,<br>
            featuring masterpieces like Michelangelo's Sistine Chapel and Raphael's Rooms,<br>
            showcasing Renaissance art, Roman sculptures, Egyptian artifacts, and more,<br>
            offering a journey through human history and faith, attracting millions annually<br>
            to its 54 galleries filled with 70,000 works,<br>
            including significant ethnographic collections. </p>
          <p><u>Location:</u>Vatican City, Vatican</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

         <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>

      <div id="container4">
        <div class="museu4" onclick="Museum4()">
          <img src="/EXTRA/Museum/m4.png" alt="Imagem do Museu Britânico">
        </div>
        <div class="museu4Texto">
          <h1> British Museum</h1>
          <p>The British Museum in London is a world-renowned public museum housing<br>
            vast collections of human history, art, and culture, featuring millions of<br>
            artifacts from across the globe, including iconic items like the Rosetta Stone<br>
            and Parthenon Sculptures, showcasing two million years of history with free entry<br>
            and highlighting global civilizations in a landmark building with Europe's largest<br>
            covered public square, the Queen Elizabeth II Great Court. </p>
          <p><u>Location:</u>London, England</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

         <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>

      <div id="container5">
        <div class="museu5" onclick="Museum5()">
          <img src="/EXTRA/Museum/m5.png" alt="Imagem do Museu Metropolitano de arte">
        </div>
        <div class="museu5Texto">
          <h1> Metropolitan Museum of Art</h1>
          <p>The Metropolitan Museum of Art (The Met) in New York City is the largest art<br>
            museum in the U.S., housing over two million works spanning 5,000 years of world history,<br>
            from antiquity to the present, across 17 departments like Egyptian art, European paintings,<br>
            and Islamic art, with locations including The Met Fifth Avenue and The Met Cloisters,<br>
            connecting people to creativity, knowledge, and cultures. </p>
          <p><u>Location:</u>New York, USA</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

         <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>


    </section>
  </main>
    `)
}

function Logged(){
  document.head.innerHTML = (`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art Space - Login Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/CSS/Logged.css"> 
    `)
document.querySelector("main").innerHTML = (`  
    <main class="container">
   <div class="bar">
        <p id="searchTitle" onclick="Main()">Art Space</p>
      </div>
        <section class="title">
           <h1>Personal Area</h1>
        </section>

        <section class="perfil">
            <img src="/EXTRA/login.png" alt="Imagem de perfil da pessoa que fez login" id="loginPic">
            <p>` + accountlogged + `</p>
        </section>

        <section class="gosto">
            <p>Likes</p>
        </section>

        <section class="comentario">
            <p>Comments</p>
        </section>

        <section class="bilhete">
            <p>Tickets</p>
        </section>
    </main>
    `)

}
function Main(){
   document.head.innerHTML = (`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art Space - Login Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/CSS/Logged.css"> 
    `)
      document.querySelector("main").innerHTML = (`  
    <main class="container">
        <section class="title">
           <h1>Personal Area</h1>
        </section>

        <section class="perfil">
            <img src="/EXTRA/login.png" alt="Imagem de perfil da pessoa que fez login" id="loginPic">
            <p>`+usernames[i]+`</p>
        </section>

        <section class="gosto">
            <p>Likes</p>
        </section>

        <section class="comentario">
            <p>Comments</p>
        </section>

        <section class="bilhete">
            <p>Tickets</p>
        </section>
    </main>
    `)
}

function Expo(){
   document.head.innerHTML = (`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art Space - Login Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/CSS/Expo.css"> 
    `)
      document.querySelector("main").innerHTML = (`  
    <main>
    <section class="searchBar">

      <div class="bar">
        <p id="searchTitle" onclick="MainPage()">Art Space</p>
        <img src="/EXTRA/searchIcon.png" id="searchIcon" alt="Icon de pesquisa">
        <input type="text" placeholder="Search" id="searchText">
      </div>

      <div class="searchSpace"></div>

    </section>

    <section>

      <img id="pillar1" src="/EXTRA/PillarsHalf2.png" alt="Imagem cortada de um pilar decorativo do website.">
      <img id="pillar2" src="/EXTRA/PillarFull.png" alt="Imagem de um pilar decorativo do website.">

      <div id="container1">

        <div class="expo1" onclick="Expo1()">
          <img src="/EXTRA/Exhibition/ex1.png" alt="Imagem da exposição 'Botticelli's Drawings'">
        </div>

        <div class="expo1Texto">
          <h1>Botticelli's Drawings</h1>
          <p>Botticelli Drawings exhibitions, like the landmark show at San Francisco's Legion of Honor,<br>
            offer a rare look into the Renaissance master's creative process, <br>
            showcasing his drawings—often unseen—alongside related paintings<br>
            and manuscripts to reveal his artistic journey, <br>
            from apprentice studies to final masterpieces, highlighting his mastery of line, <br>
            innovative techniques, and evolving focus on religious themes<br>
            influenced by figures like Savonarola, presenting an intimate view <br>
            of his design skills and unparalleled graphic virtuosity. </p>
          <p><u>Location:</u> Florence, Italy</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>

      <div id="container2">
        <div class="expo2" onclick="Expo2()">
          <img src="/EXTRA/Exhibition/ex2.png" alt="Imagem da exposição 'Frans Hals'">
        </div>

        <div class="expo2Texto">
          <h1>Frans Hals</h1>
          <p>Frans Hals exhibitions, like the major 2023-2024 retrospectives,<br>
            focus on his revolutionary, lifelike portraits, showcasing his rapid, <br>
            expressive brushwork that captured personality, laughter, <br>
            and the vibrancy of Dutch Golden Age life. <br>
            These shows reunite dispersed family portraits, feature iconic works <br>
            like "The Laughing Cavalier," and highlight Hals's influence on <br>
            later artists (Impressionists), presenting him as a pioneer in dynamic,<br>
            modern portraiture through thematic displays and chronological <br>
            journeys through his evolving style.</p>
          <p><u>Location:</u> Amsterdam, Netherlands</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>

      <div id="container3">

        <div class="expo3" onclick="Expo3()">
          <img src="/EXTRA/Exhibition/ex3.png" alt="Imagem da exposição 'Rosana Paulino'">
        </div>

        <div class="expo3Texto">
          <h1>Rosana Paulino's Amefricana</h1>
          <p>The works to be exhibited address the history of slavery, <br>
            with some phenotypic photos that the Swiss photographer Auguste Stahl <br>
            took in the 19th century, of black women and men from the front, <br>
            from the back and in profile, images that Paulino transposes onto canvas, <br>
            cuts, and sutures. </p>
          <p><u>Location:</u> Milan, Italy</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>

      <div id="container4">

        <div class="expo4" onclick="Expo4()">
          <img src="/EXTRA/Exhibition/ex4.png" alt="Imagem da exposição 'Paris 1874'">
        </div>

        <div class="expo4Texto">
          <h1>Paris 1874</h1>
          <p>In Paris, 1874, a revolutionary art exhibition by the Société Anonyme<br>
            (Anonymous Society) marked the birth of Impressionism,<br>
            showcasing radical works by Monet, Renoir, Degas, Morisot,<br>
            and others rejected by the official Salon, focusing on modern life, <br>
            light, and fleeting impressions, a departure from tradition <br>
            that scandalized critics but established a new avant-garde art movement.</p>
          <p><u>Location:</u> Paris, France</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>

      <div id="container5">

        <div class="expo5" onclick="Expo5()">
          <img src="/EXTRA/Exhibition/ex5.png" alt="Imagem da exposição 'Surrealism'">
        </div>

        <div class="expo5Texto">
          <h1> Surrealism. Other Myths</h1>
          <p>"Surrealism. Other Myths" exhibitions explore Surrealism as a global,<br>
            evolving force, challenging its traditional boundaries by showcasing Polish<br>
            and Eastern European artists alongside Western figures, highlighting dreams,<br>
            the subconscious, and political engagement from the interwar period through <br>
            the postwar era, featuring techniques like frottage and decalcomania, <br>
            and connecting it to anti-colonialism and local struggles against authoritarianism. <br>
            These shows reveal Surrealism's diverse expressions, <br>
            from bizarre dreamscapes by the Artes Group to politically <br>
            charged works addressing war and oppression, proving it a dynamic movement<br>
            beyond its initial French context. </p>
          <p><u>Location:</u> Athens, Greece</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
          <a href="#container1">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container2">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container3">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container4">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
          <a href="#container5">
            <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
          </a>
        </div>
      </div>
    </section>
  </main>
    `)
}

function Espet(){
  document.head.innerHTML = (`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art Space - Login Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/CSS/Espet.css"> 
    `)
      document.querySelector("main").innerHTML = (`  
      <main>
    <section class="searchBar">

      <div class="bar">
        <p id="searchTitle" onclick="Main()">Art Space</p>
        <img src="/EXTRA/searchIcon.png" id="searchIcon" alt="Icon de pesquisa">
        <input type="text" placeholder="Search" id="searchText">
      </div>

      <div class="searchSpace"></div>

    </section>

    <section>

      <img id="pillar1" src="/EXTRA/PillarsHalf2.png" alt="Imagem cortada de um pilar decorativo do website.">
      <img id="pillar2" src="/EXTRA/PillarFull.png" alt="Imagem de um pilar decorativo do website.">

      <div id="container1">
        <div class="espet1" onclick="Espet1()">
          <img src="/EXTRA/LiveShows/es1.png" alt="Imagem do espetáculo 'Lago dos Cisnes'">
        </div>
        <div class="espet1Texto">
          <h1> Swan Lake</h1>
          <p>Swan Lake is a tragic ballet about Prince Siegfried,<br>
        who falls in love with Princess Odette, a woman cursed <br>
        by the evil sorcerer Von Rothbart to be a swan by day and human by night;<br>
        the spell can only be broken by a vow of true love, <br>
        but Siegfried is tricked into betraying Odette with the sorcerer's daughter.</p>
          <p><u>Location:</u>Moscow, Russia</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
        <a href="#container1">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container2">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container3">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container4">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container5">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
      </div>
      </div>

      <div id="container2">
        <div class="espet2" onclick="Espet2()">
          <img src="/EXTRA/LiveShows/es2.png" alt="Imagem do espetáculo 'Hamilton'">
        </div>
        <div class="espet2Texto">
          <h1>Hamilton</h1>
          <p>Hamilton is a revolutionary Broadway musical by Lin-Manuel Miranda<br>
        that tells the story of American Founding Father Alexander Hamilton <br>
        through a blend of hip-hop, jazz, R&B, and traditional show tunes,<br>
        known for its diverse, multiracial cast representing "America then,<br>
        as told by America now". It follows Hamilton's journey<br>
        from impoverished orphan to influential statesman, <br>
        detailing his rise in the American Revolution,<br>
        his role as the first Treasury Secretary, and his famous rivalry with Aaron Burr,<br>
        culminating in his tragic death in a duel.</p>
          <p><u>Location:</u>Manhattan, USA</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
        <a href="#container1">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container2">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container3">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container4">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container5">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
      </div>
      </div>

      <div id="container3">
        <div class="espet3" onclick="Espet3()">
          <img src="/EXTRA/LiveShows/es3.png" alt="Imagem do espetáculo 'Alladino no Gelo'">
        </div>
        <div class="espet3Texto">
          <h1> Alladin On Ice</h1>
          <p>Aladdin on Ice is a spectacular live show blending figure skating,<br>
        acrobatics, and circus arts with the classic tale of Aladdin, <br>
        featuring dazzling costumes, vibrant sets, and popular songs <br>
        to bring the magical story of Agrabah, the Genie,<br>
        and "A Whole New World" to life on synthetic or real ice for family audiences. <br>
        Productions often combine professional skaters with local talent <br>
        and incorporate advanced visual effects, showcasing complex stunts <br>
        like the flying carpet and fire juggling alongside graceful choreography.</p>
          <p><u>Location:</u>Lisbon, Portugal</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
        <a href="#container1">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container2">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container3">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container4">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container5">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
      </div>
      </div>

      <div id="container4">
        <div class="espet4" onclick="Espet4()">
          <img src="/EXTRA/LiveShows/es4.png" alt="Imagem do espetáculo'Nutcracker'">
        </div>
        <div class="espet4Texto">
          <h1>Nutcracker</h1>
          <p>The Nutcracker is a magical Christmas ballet by Tchaikovsky,<br>
        telling the story of a young girl named Clara who receives an<br>
        enchanted Nutcracker doll on Christmas Eve; it comes to life, <br>
        battles the evil Mouse King, and whisks her away to the fantastical <br>
        Land of Sweets for a celebration of dances, all set to iconic classical music. </p>
          <p><u>Location:</u>Washington, USA</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
        <a href="#container1">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container2">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container3">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container4">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container5">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
      </div>
      </div>

      <div id="container5">
        <div class="espet5" onclick="Espet5()">
          <img src="/EXTRA/LiveShows/es5.png" alt="Imagem do espetáculo 'Fantasma da Opera'">
        </div>
        <div class="espet5Texto">
          <h1> The Phantom of the Opera</h1>
          <p>The Phantom of the Opera is a classic romantic musical about a <br>
            disfigured musical genius haunting the Paris Opera House who<br>
             becomes obsessed with a young soprano, Christine Daaé, <br>
             and schemes to make her a star, leading to a tragic love triangle <br>
             with her childhood sweetheart, Raoul, <br>
             and dramatic events like a massive chandelier crash. </p>
          <p><u>Location:</u>London, England</p>

          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
        <a href="#container1">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container2">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container3">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container4">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container5">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
      </div>
      </div>


    </section>
  </main>
    `)
}

document.querySelector("#formExhibition").addEventListener('submit', (event) => {
    event.preventDefault();
    Exibicao();
})

function Exibicao(){
let i = 0

  museu_name[i] = document.querySelector("#museu_name").value
  museu_image[i] = document.querySelector("#museu_image").value 
  museu_description[i] = document.querySelector("#museu_description").value

document.querySelector("main").innerHTML = +(`
        <div id="container`+i+6+`">
        <div class="espet1" onclick="Espet1()">
          <img src="`+ museu_image +`" alt="Imagem do espetáculo '`+ museu_name +`'">
        </div>
        <div class="espet1Texto">
          <h1>`+museu_name+`</h1>
          <p>`+museu_description+`
          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
        <a href="#container1">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container2">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container3">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container4">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container5">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container`+i+6+`">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
      </div>
      </div>
} `)

i++
}

function Exibicao(){
let j = 0

  espet_name[j] = document.querySelector("#espet_name").value
  espet_image[j] = document.querySelector("#espet_image").value 
  espet_description[j] = document.querySelector("#espet_description").value

document.querySelector("main").innerHTML = +(`
        <div id="container`+j+6+`">
        <div class="espet1" onclick="Espet1()">
          <img src="`+ espet_image +`" alt="Imagem do espetáculo '`+ espet_name +`'">
        </div>
        <div class="espet1Texto">
          <h1>`+espet_name+`</h1>
          <p>`+espet_description+`
          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
        <a href="#container1">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container2">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container3">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container4">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container5">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container`+j+6+`">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
      </div>
      </div>
} `)

j++
}

function Exibicao(){
let t = 0

  expo_name[i] = document.querySelector("#expo_name").value
  expo_image[i] = document.querySelector("#expo_image").value 
  expo_description[i] = document.querySelector("#expo_description").value

document.querySelector("main").innerHTML = +(`
        <div id="container`+t+6+`">
        <div class="espet1" onclick="Espet1()">
          <img src="`+ expo_image +`" alt="Imagem do espetáculo '`+ expo_name +`'">
        </div>
        <div class="espet1Texto">
          <h1>`+expo_name+`</h1>
          <p>`+expo_description+`
          <a href="#modal-example" class="modal-trigger">Buy Tickets</a>

          <div id="modal-example" class="modal">

            <a href="#" class="modal-backdrop"></a>

            <div class="modal-content">
              <h2>Tickets</h2>
              <form>
                First Name:<br><input type="text" name="firstname" required><br>
                Last Name:<br><input type="text" name="lastname" required><br>
                Email:<br><input type="email" name="email" placeholder="example@gmail.com" required><br><br>
                Time:<br>
                <input type="radio" name="hour" value="morning" checked> 9h00-11h00<br>
                <input type="radio" name="hour" value="afternoon"> 14h00-16h00<br>
                <input type="radio" name="hour" value="night"> 19h00-21h00<br><br>
                <label for="day">Available Dates</label><br>
                <select name="day" id="day">
                  <option value="jan29">January 29th</option>
                  <option value="feb3">February 3th</option>
                  <option value="feb18">February 18th</option>
                  <option value="mar8">March 8th</option>
                </select><br><br>
                Tickets:<br>
                <input type="radio" name="hour" value="1" checked> 1
                <input type="radio" name="hour" value="2"> 2
                <input type="radio" name="hour" value="3"> 3
                <input type="radio" name="hour" value="4"> 4
                <input type="radio" name="hour" value="5"> 5
                <input type="radio" name="hour" value="6"> 6
                <input type="Submit" value="Confirm" class="modal-confirm">
              </form>
            </div>
          </div>
        </div>

        <div class="slider">
        <a href="#container1">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container2">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container3">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container4">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container5">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
        <a href="#container`+t+6+`">
          <img src="/EXTRA/circle.png" alt="Imagem de um círculo" id="sliderImg">
        </a>
      </div>
      </div>
} `)

t++
}