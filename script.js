

//Search Muncipility
const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var searchText = search.value.replace(/\s/g, ' ').trim();
  var searchTerm1 = searchText.toUpperCase();
  var searchTerm = searchTerm1;
  

document.getElementById("showLocals").style.display = "block";
document.getElementById("showActivities").style.display = "block";
document.getElementById("showRegion").style.display = "block";

// Show Municipalities()

fetch('municipalities.json')
  .then((res) => res.text())
  .then(data => JSON.parse(data))
  .then((data) => {
  //console.log(searchTerm);
  data.Municipalities.forEach(function (Municipalities) {
  if (`${Municipalities.Ort}` === searchTerm) {
    document.getElementById('output').innerHTML =
    `
    <h3><b>The Contact Information</b></h3>
    <div class="box-5-container">
    <img class="mun-img" src="${Municipalities.image}" alt="">
      <ul class="fetch-inter">
        <li><span> ${Municipalities.Ort}</span> - <b> ${Municipalities['Region namn']}</b></li>
        <li><b> E-Post: </b> ${Municipalities['E-post']}</li>
        <li><b>Telefon:</b> ${Municipalities.Telefon}</li>
        <li><b>Webbadress:</b> ${Municipalities.Webbadress}</li>
        <li><b>Postnr:</b> ${Municipalities.Postnr}</li>
        <li>${Municipalities.Lanskod}</li>
        <li>${Municipalities.Kommunkod}</li>
      </ul></div>`;
    };
  })})
})



//function ShowRegion()

document.getElementById('showRegion').addEventListener('click', showRegion);
 
function showRegion() {
  var kodlan = document.querySelector("#output > div > ul > li:nth-child(6)").innerHTML;
    fetch('regions.json')
      .then((res) => res.text())
      .then(data => JSON.parse(data))
      .then((data) => {
        data.Region.forEach(function (Region) {
          if (`${Region.Lanskod}` === kodlan) {
        
        document.getElementById('output3').innerHTML =
        `<h3><b>Regions Name</b></h3>
        <div class="box-5-container">
        <img class="region-img" src="im/sweden-map.jpg" alt="">
          <ul class="fetch-inter">
              <li><span> ${Region.NameSV}</span></li>
              <li><b> E-Post: </b> ${Region['E-post']}</li>
              <li><b>Telefon:</b> ${Region['Telefon']}</li>
              <li><b>Webbadress:</b> ${Region.Webbadress}</li>
              <li><b>Postnr:</b> ${Region['Postaddress 1']}</li>
              <li><b>Postnr: </b>${Region.Postnr}</li>
              <li><span> ${Region.Ort}</span></li>
          </ul><div>`;
        }
}); })}


//function showLocals()

document.getElementById('showLocals').addEventListener('click', showLocals, {
  once: true
});
  
function showLocals() {
  var kod = document.querySelector("#output > div > ul > li:nth-child(7)").innerHTML;
    fetch('locals.json')
      .then((res) => res.text())
      .then(data => JSON.parse(data))
      .then((data) => {
      data.Locals.forEach(function (Locals) {
      if (`${Locals.KommunID}` === kod) {
        document.getElementById('output2').innerHTML +=
        `<h3><b>Locals Name</b></h3>
        <div class="box-5-container">
        <img class="local-img" src="im/flaggor.jpg" alt="">
          <ul class="fetch-inter">
            <li><span>${Locals.Name}</span></li>
            <li><b>Type Of Help: </b>${Locals.TypeOfHelp}</li>
            <li><b>What languages speak? </b> ${Locals['What languages speak?']}</li>
            <li><b>Contact info :</b> ${Locals['Contact info']}</li>
            <li><b>Municipiltys NUmber :</b> ${Locals.KommunID}</li>
          </ul>
        </div>`;
}});})}


//function getactivities()
    document.getElementById('showActivities').addEventListener('click', showActivities, {
      once: true
    });
    function showActivities() {
    var kod = document.querySelector("#output > div > ul > li:nth-child(7)").innerHTML;
    fetch('activities.json')
      .then((res) => res.text())
      .then(data => JSON.parse(data))
      .then((data) => {
        data.Activities.forEach(function (Activities) {
          if (`${Activities.KommunID}` === kod) {
            document.getElementById('output1').innerHTML += `
    
            <div class="box-4-container" >
            <h3><span>${Activities.TitleSV}</span></h3>
            <img class="act-img" src="${Activities.PictureSV}" alt="">
              <ul class="fetch-inter-activity">
                <li> <b> ${Activities.Date}</b></li>
                <li><b>Time :</b> ${Activities['Time from']} - ${Activities['Time To']}</li>
                <li><b>Discription SV. :</b> ${Activities.DescriptionSV}</li>
                <li><b>Title UA. :</b> ${Activities.TitleUA}</li>
                <li><b>Description UA. :</b> ${Activities.DescriptionUA}</li>
                <li><b>Adress :</b> ${Activities.Adress}</li>
                <li><b>Booking Link :</b> ${Activities['Booking link']}</li>
                <li><b>Name EN :</b> ${Activities.NameEN}</li>  
                <li><b>Link :</b> <ins>${Activities.Link}</ins></li>
                <li><b>Booking Link :</b> <ins>${Activities['Booking link']}</ins></li>
              </ul>
            </div>`;
}
});})
}

//-----------------------        WHAT TO DO          ------------------------------------------------------------------------------

// week 12-13
document.getElementById('getActivities').addEventListener('click', getActivities, {
  once: true
});

function getActivities() {

    // BUTTON MORE-ACTIVITIES .......
    document.getElementById("moreActivity").style.display = "block";
    var button = document.querySelector('.toggle-button');

    button.addEventListener('click', function (event) {
      let hiddenItems = Array.prototype.slice.call(document.querySelectorAll('.hideable'));
      
      // Are we hiding or showing?
      let showing = button.textContent === "More Activities..";
      
      // Loop over the items
      hiddenItems.forEach(function(item){
        if(!showing){
          // If we are hiding, then add the .hidden-item class
          item.classList.add("hidden-item");
        } else {
          // Otherwise remove the .hidden-item class
          item.classList.remove("hidden-item");
        }
        
        // Update the button text:
        button.textContent = button.textContent === "More Activities.." ? "Hide Activities.." : "More Activities..";
      });
    });


  fetch('activities.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
  
      data.Activities.forEach(function (Activities) {
        if ("2022-04-01" > `${Activities.Date}` && `${Activities.Date}` > "2022-03-21"){
           document.getElementById('outputAct').innerHTML += `
           
           <div class="box-next-container" >
           <div class="hideable-act"> 
           <img class="act-img" src="${Activities.PictureSV}" alt="">
           <ul class="list-group-links-2">
              <li><span>${Activities.TitleSV}</span><b> ${Activities.Date}</b></li>
              <li> ${Activities.DescriptionSV}</li>
              <li><b>Adress :</b> ${Activities.Adress}</li>
              <li><b>Booking Link :</b> ${Activities['Booking link']}</li>
              <li><b>Time : </b> ${Activities['Time from']} - ${Activities['Time To']}</li>
          </ul></div></div>`
;};
});    
})}

// week 14-15

document.getElementById('moreActivity').addEventListener('click', moreActivity, {
  once: true
});
  function moreActivity() {
    fetch('activities.json')
      .then((res) => res.text())
      .then(data => JSON.parse(data))
      .then((data) => {
    
        data.Activities.forEach(function (Activities) {
          if ("2022-04-15" > `${Activities.Date}` && `${Activities.Date}` > "2022-04-04"){
             document.getElementById('nextweek').innerHTML += `
             <div class="item hidden-item hideable"> 
             <div class="hideable-act2"> 
             <img class="act-img2" src="${Activities.PictureSV}" alt="">
             <ul class="list-group-links-2-2">
                <li><span>${Activities.TitleSV}</span><b> ${Activities.Date}</b></li>
                <li> ${Activities.DescriptionSV}</li>
                <li><b>Adress : </b>${Activities.Adress}</li>
                <li><b>Booking Link : </b> ${Activities['Booking link']}</li>
                <li><b>Time : </b> ${Activities['Time from']} - ${Activities['Time To']}</li>
            </ul></div></div>`
;}; }); }) }



// BUTTON ....  GET GOOD TO KNOW ....... 

document.getElementById('getgoodtoknowlist').addEventListener('click', getgoodtoknowlist);

function getgoodtoknowlist() {
  fetch('GoodToKnow.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      const x = data.GoodToKnow;
      console.log(data);
      
     output = `
      <h2>Good to know</h2>
      <div class="box-3-container">
        <ul class="list-group-links-1-1">
          <li><span><b> 1. </b> ${x[0].TitleSV}</span></li>
          <li>${x[0].DescriptionSV}</li>
        </ul>
          <ul class="list-group-links-1-2">
          <li><span><b> 2. </b> ${x[1].TitleSV}</span></li>
          <li>${x[1].DescriptionSV}</li>
        </ul>`;
      document.getElementById('output').innerHTML =  output;
    })
}
