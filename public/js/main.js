var tracks;
var currentSong = 0; //increase currentSong by 0

$(document).ready(function(){
  SC.initialize({
   client_id: 'f77a15a6adfbb5035c8a8cf38e399f1e'
  }); // client_id
  $("#search_form").submit(function(event){
    event.preventDefault();
    // Clear the Search results
    $("#songs").html("");
    // Search for the submitted term
    scSearch( $("#search").val() );
    // $(...).val() gets us
    // element.value
  });
}); // $(document).ready
function scSearch(term) {
  SC.get('/tracks', {
  q: term
}).then(function(response) {
  tracks = response;
  playNext();
});
};
// Plays the next song
function playNext() {
SC.stream( '/tracks/' + tracks[currentSong].id ).then(function(player){      
    player.play();
    $("#artwork").attr("src", tracks[currentSong].artwork_url);
    $("#title").html("Now playing: " + tracks[currentSong].title);
    player.on("finish",function(){
      currentSong += 1; //increase currentSong by 1
      playNext();       //calls itself
    });
  });
};
// Takes a number of characters and updates element
function updateRemaining( elInput, elMsg ) {
  var remaining = elMsg.innerText = elInput.getAttribute('maxlength') - elInput.value.length;
  if( remaining > 0) {
    elMsg.innerText = remaining;
    return true;
  }
  return false;
}