// Full Height
document.querySelector('.head').style.height = window.innerHeight + "px";
window.onresize = function () {
   document.querySelector('.head').style.height = window.innerHeight + "px"
}

var changenumber = document.querySelectorAll('.arealist');
console.log(changenumber[1].value);
// Dropdown List
var selector = document.querySelector('#selector');
selector.addEventListener('change', function (event) {
   var target = event.target.value;
   var number = records.length;
   document.querySelector('.status').textContent = target;

   // Pick the space to put the spots.
   var board = document.querySelector('.content');

   for (var i = 0; i <= number; i = i + 1) {
      if (target == records[i].Zone) {
         // Creat Container and append it to Board.
         var chosencontainer = document.createElement('div');
         chosencontainer.setAttribute('class', 'container');
         board.appendChild(chosencontainer);

         // Creat Thumbnail and append it to Container.
         var chosenthumbnail = document.createElement('div');
         chosenthumbnail.setAttribute('class', 'thumbnail');
         chosencontainer.appendChild(chosenthumbnail);

         // Img
         var chosenimg = document.createElement('img');
         chosenimg.setAttribute('src', records[i].Picture1);
         chosenthumbnail.appendChild(chosenimg);

         // Object
         var chosenobject = document.createElement('div');
         chosenobject.setAttribute('class', 'object');
         chosenobject.innerHTML = '<span class="object-title">' + records[i].Name + '</span>' + '<span class="object-area">' + records[i].Zone + '</span>';
         chosenthumbnail.appendChild(chosenobject);

         // Creat Info and append it to Container.
         var choseninfo = document.createElement('ul');
         choseninfo.setAttribute('class', 'info');
         choseninfo.innerHTML = '<li class="info-time"><img src="img/icons_clock.png" alt=""> ' + records[i].Opentime + '</li>' +
            '<li class="info-address"><img src="img/icons_pin.png" alt=""> ' + records[i].Add + '</li>' +
            '<li class="info-phone"><img src="img/icons_phone.png" alt=""> ' + records[i].Tel + '</li>';
         chosencontainer.appendChild(choseninfo);

         // Creat Tag and append it to Container.
         var chosentag = document.createElement('div');
         chosentag.setAttribute('class', 'tag');
         chosentag.innerHTML = '<img src="img/icons_tag.png" alt=""> ' + records[i].Ticketinfo;
         chosencontainer.appendChild(chosentag);
      }
   };
});