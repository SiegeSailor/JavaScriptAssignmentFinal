// Full Height
document.querySelector('.head').style.height = window.innerHeight + "px";
window.onresize = function () {
   document.querySelector('.head').style.height = window.innerHeight + "px"
}

// Dropdown List
var selector = document.querySelector('#selector');

var countstring = [];

// Get Data
var url = "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97";
var record = new XMLHttpRequest();
record.open('get', url, true);
record.send(null);
record.onload = function () {
   // Convert the data into Object
   var string = JSON.parse(record.responseText);
   var arraystring = [];

   // Pick the zones out into an Array
   for (var i = 0; i < string.result.records.length; i = i + 1) {
      arraystring.push(string.result.records[i].Zone);
   }

   // Filter off the same zones
   resultstring = arraystring.filter(function (item, index, self) {
      return self.indexOf(item) == index;
   });

   // Add the zones onto the Dropdown list
   for (var i = 0; i < resultstring.length; i = i + 1) {
      var recordlist = document.createElement('option');
      recordlist.setAttribute('class', 'arealist');
      recordlist.setAttribute('value', resultstring[i]);
      recordlist.textContent = resultstring[i];
      selector.appendChild(recordlist);
   }


   // Countstring
   for (var i = 0; i < resultstring.length; i = i + 1) {
      countstring.push({
         zone: resultstring[i],
         count: 0
      });
   }
}

var hotsection = document.querySelector('.shortcut ul');

// Dropdown List:Display what I choose
selector.addEventListener('change', function (event) {

   // Clear the previous info
   var oldinfo = document.querySelectorAll('.container');
   for (var i = 0; i < oldinfo.length; i++) {
      oldinfo[i].outerHTML = '';
   }

   // Pick and Display.
   var target = event.target.value;
   var numberstring = JSON.parse(record.responseText);
   var number = numberstring.result.records.length;

   document.querySelector('.status').textContent = target;

   // Pick the space to put the spots.
   var board = document.querySelector('.content');

   for (var i = 0; i < number; i = i + 1) {
      if (target == numberstring.result.records[i].Zone) {
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
         chosenimg.setAttribute('src', numberstring.result.records[i].Picture1);
         chosenthumbnail.appendChild(chosenimg);

         // Object
         var chosenobject = document.createElement('div');
         chosenobject.setAttribute('class', 'object');
         chosenobject.innerHTML = '<span class="object-title">' + numberstring.result.records[i].Name + '</span>' + '<span class="object-area">' + numberstring.result.records[i].Zone + '</span>';
         chosenthumbnail.appendChild(chosenobject);

         // Creat Info and append it to Container.
         var choseninfo = document.createElement('ul');
         choseninfo.setAttribute('class', 'info');
         choseninfo.innerHTML = '<li class="info-time"><img src="img/icons_clock.png" alt=""> ' + numberstring.result.records[i].Opentime + '</li>' +
            '<li class="info-address"><img src="img/icons_pin.png" alt=""> ' + numberstring.result.records[i].Add + '</li>' +
            '<li class="info-phone"><img src="img/icons_phone.png" alt=""> ' + numberstring.result.records[i].Tel + '</li>';
         chosencontainer.appendChild(choseninfo);

         // Creat Tag and append it to Container.
         var chosentag = document.createElement('div');
         chosentag.setAttribute('class', 'tag');
         chosentag.innerHTML = '<img src="img/icons_tag.png" alt=""> ' + numberstring.result.records[i].Ticketinfo;
         chosencontainer.appendChild(chosentag);
      }
   };

   // Count the hot
   for (var i = 0; i < countstring.length; i = i + 1) {
      if (target === countstring[i].zone) {
         countstring[i].count = countstring[i].count + 1;
      }
   }

   // Sort the hot
   countstring = countstring.sort(function (a, b) {
      return a.count < b.count ? 1 : -1;
   });

   // Clear the shortcut section
   hotsection.innerHTML = '';

   // Pick out the top 4 and place them onto the shortcut
   for (var i = 0; i <= 3; i = i + 1) {

      if (countstring[i].count > 0) {

         // Li
         var hotobject = document.createElement('li');
         hotsection.appendChild(hotobject);

         // A
         var hotlink = document.createElement('a');
         hotlink.setAttribute('href', '#');
         hotlink.textContent = countstring[i].zone;
         hotobject.appendChild(hotlink);
      }
   }

   // Pick out the top 4 Counts
   // var topcount = Math.max.apply(Math, countstring.map(function (o) {
   //    return o.zone;
   // }))

   // var topcount = countstring.map(function (item, index, array) {
   //    return item.count > 4;
   // });

});

// Display the content through Hot
hotsection.addEventListener('click', function (event) {

   event.preventDefault();

   // Clear the previous info
   var oldinfo = document.querySelectorAll('.container');
   for (var i = 0; i < oldinfo.length; i++) {
      oldinfo[i].outerHTML = '';
   }

   // Pick and Display.
   var target = event.target.textContent;
   var numberstring = JSON.parse(record.responseText);
   var number = numberstring.result.records.length;

   document.querySelector('.status').textContent = target;

   // Pick the space to put the spots.
   var board = document.querySelector('.content');

   for (var i = 0; i < number; i = i + 1) {
      if (target == numberstring.result.records[i].Zone) {
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
         chosenimg.setAttribute('src', numberstring.result.records[i].Picture1);
         chosenthumbnail.appendChild(chosenimg);

         // Object
         var chosenobject = document.createElement('div');
         chosenobject.setAttribute('class', 'object');
         chosenobject.innerHTML = '<span class="object-title">' + numberstring.result.records[i].Name + '</span>' + '<span class="object-area">' + numberstring.result.records[i].Zone + '</span>';
         chosenthumbnail.appendChild(chosenobject);

         // Creat Info and append it to Container.
         var choseninfo = document.createElement('ul');
         choseninfo.setAttribute('class', 'info');
         choseninfo.innerHTML = '<li class="info-time"><img src="img/icons_clock.png" alt=""> ' + numberstring.result.records[i].Opentime + '</li>' +
            '<li class="info-address"><img src="img/icons_pin.png" alt=""> ' + numberstring.result.records[i].Add + '</li>' +
            '<li class="info-phone"><img src="img/icons_phone.png" alt=""> ' + numberstring.result.records[i].Tel + '</li>';
         chosencontainer.appendChild(choseninfo);

         // Creat Tag and append it to Container.
         var chosentag = document.createElement('div');
         chosentag.setAttribute('class', 'tag');
         chosentag.innerHTML = '<img src="img/icons_tag.png" alt=""> ' + numberstring.result.records[i].Ticketinfo;
         chosencontainer.appendChild(chosentag);
      }
   };
})


// Reference
// JavaScript 陣列處理：找東西 - indexOf、$.inArray 與 filter
// https://cythilya.github.io/2017/05/08/javascript-find-item-in-an-array/
// Math.Max
// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/max
// JavaScript 陣列處理方法 [filter(), find(), forEach(), map(), every(), some(), reduce()]
// https://wcc723.github.io/javascript/2017/06/29/es6-native-array/#Array-prototype-map
// JavaScript 陣列元素順序重新排序 sort()
// http://www.eion.com.tw/Blogger/?Pid=1170
// Sort array of objects by string property value (Answer 702)
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value