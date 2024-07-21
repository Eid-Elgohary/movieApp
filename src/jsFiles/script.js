
/// <reference types="../@types/jquery" />

const KEY = "c2abed0969390d5c38f0a1c368fb8187" ;

const option = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFiZWQwOTY5MzkwZDVjMzhmMGExYzM2OGZiODE4NyIsIm5iZiI6MTcyMTQwNTYyMy40NzAyNDEsInN1YiI6IjY2OWE4YmYxMWZiY2FjZjgzOWY4MTZkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xp7GLFKJNhii0FRO2nO3ROQMc8woJzqEcADKbyaNiqQ'
      }}

let mainContent = document.querySelector('.main') ;

// ============= display default data ============== 

loadData("now_playing");


// ============= validate inputs ============== 

$('#contact input').not('#repass').on('input',function(){
   let term = $(this) ;
   let id  = $(this).attr('id');
   validation(term , id);
   validateBTN();
})



// ============= display clicked item ============== 

$('.li').on('click',function(){
   let term = $(this).attr('id') ;
   loadData(term);
   closeSideBar();
})

// ============= display searched item ============== 

$('.search').on('input',function(){
   let term = $(this).val() ;
   searchMovie(term)
})
// ============= get data ============== 

async function loadData(term){
   closeSideBar()
   mainContent.innerHTML = ""
   let req = "" ;
   $(".loading-screen").fadeIn(400) ;

   if(term == "trending"){
      req = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US',option)
   }else{
      req= await fetch(`https://api.themoviedb.org/3/movie/${term}?language=en-US&page=1`, option)
   }
      let res = await req.json() ;
      displayMovies(res);
      $(".loading-screen").fadeOut(400);
   }
// ============= display data ============== 

function displayMovies(arr){
   let content = ``;

   for(let i = 0; i<arr.results.length; i++){
      let stars = "" ;

      for(let j = 0; j<(arr.results[i].vote_average).toFixed(0); j+=2 ){
         stars += `<i class="fas fa-star text-[#FFC107] text-[16px]"></i>`;
      }
      content += ` <div class="md:w-1/2 lg:w-1/3 w-full  px-3 mt-6" >
                     <div class="movie rounded-lg relative overflow-hidden   cursor-pointer capitalize ">
                        <img src="https://image.tmdb.org/t/p/w500${arr.results[i].poster_path}" class="w-full block rounded-lg" alt="">
                           <div class="absolute size-full overlay rounded-lg p-4 ">
                           <h2 class="movie-name text-white text-xl text-center  font-bold mb-[16px]">${arr.results[i].title}</h2>
                           <p class="text-[#EDEDED] mb-[16px] movie-desc ">${arr.results[i].overview}</p>
                           <p class="mb-[20px] text-[#EDEDED] movie-date">release date: <span>${arr.results[i].release_date}</span></p>
                           <p class="movie-stars mb-[16px]">${stars}</p>
                           <p class="movie-vote flex justify-center  align-items-center rounded-full size-[40px] p-2.5 border-[2px] border-[#008000] text-[#EDEDED]">${(arr.results[i].vote_average).toFixed(1)}</p>
                        </div>
                     </div>
                  </div>`;
   }
   mainContent.innerHTML = content ;
}
// ============= search movies by name ============== 

async function searchMovie(term){
   let req = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`, option);
   let res = await req.json();
   displayMovies(res);
}

// ============= validate inputs function ============== 

function validation(term , id){
   const regex = {
      name: /^[a-zA-z\s]{3,36}$/,
      email: /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/ ,
      phone:/^(02)?(01)[0125][0-9]{8}$/,
      age :/^(1[6-9]|[2-9][0-9]|100)$/,
      password :/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
   }

   if(!(regex[id].test(term.val()))){
      $(`#${id}`).removeClass('border-b-[#ced4da]').addClass('border-b-[#D62E33]');
      $(`#${id}`).removeClass('focus:border-b-[#ced4da]').addClass('focus:border-b-[#d62e33]');
      $(`#${id}`).next().show(200);
      $(`#${id}`).removeClass('checked');
   }else{
      $(`#${id}`).removeClass('border-b-[#D62E33]').addClass('border-b-[#ced4da]');
      $(`#${id}`).removeClass('focus:border-b-[#d62e33]').addClass('focus:border-b-[#ced4da]');
      $(`#${id}`).next().hide(200);
      $(`#${id}`).removeClass('checked');
   }
}
// ============= validate repassword function ============== 

$('#repass').on('input',function(){
   validatePass();
   validateBTN();
})
function validatePass(){
   let pass =  $('#password').val();
   let rePass =  $('#repass').val();
   if(pass !== rePass){
      $(`#repass`).removeClass('border-b-[#ced4da]').addClass('border-b-[#D62E33]');
      $(`#repass`).removeClass('focus:border-b-[#ced4da]').addClass('focus:border-b-[#d62e33]');
      $(`#repass`).next().show(200);
      $(`#repass`).removeClass('checked');

   }else{
      $(`#repass`).removeClass('border-b-[#D62E33]').addClass('border-b-[#ced4da]');
      $(`#repass`).removeClass('focus:border-b-[#d62e33]').addClass('focus:border-b-[#ced4da]');
      $(`#repass`).next().hide(200);
      $(`#repass`).addClass('checked');
   }
}

// ============= validate button ============== 
function validateBTN(){

   if($('#contact input').hasClass('checked')){
      $('.submit-btn').addClass('bg-green-700').removeClass('cursor-none').addClass('cursor-pointer');
   }else{
      $('.submit-btn').removeClass('bg-green-700').addClass('cursor-none').removeClass('cursor-pointer');
   }

}

// //============= open and close side bar ============== 

$('.open').on("click",function(){
   openSideBar();
});

$('.close').on("click",function(){
   closeSideBar();
});

function openSideBar(){
   $('aside').animate({
      left : "0"
   },500)
   $('.close').removeClass('hidden');
   $('.open').addClass('hidden');

   for (let i = 0; i < 6; i++) {
      $(".links li").eq(i).animate({
         top: 0
      }, (i + 6) * 100)
   }
}

function closeSideBar(){
   $('aside').animate({
      left : "-260px"
   },500)
   $('.close').addClass('hidden');
   $('.open').removeClass('hidden');
   $(".links li").animate({
      top: "300"
   })
}
