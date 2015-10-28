angular.module('starter.services', [])
  .service('MyService', function () {
    var self = this;
    this.method1 = function () {
      var th = Math.floor((Math.random() * 4) + 1);
      console.log(th);
      if(th == 1)
        self.initSvg('img/AJ_Digital_Camera.svg');
      else if (th == 2)
        self.initSvg('img/zillow.svg');
      else if (th == 3)
        self.initSvg('img/yinyang.svg');
      else 
        self.initSvg('img/mozilla.svg');
    }
    this.initSvg = function (url) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      // Following line is just to be on the safe side;
      // not needed if your server delivers SVG with correct MIME type
      xhr.overrideMimeType("image/svg+xml");
      xhr.send("");
      $("#svgContainer").html("");
      document.getElementById("svgContainer")
        .appendChild(xhr.responseXML.documentElement);
      $("path").click(function (e) {
        self.method1();
        console.log("path: ", this.id);
      });
    }//initSvg
  })//sevices
  .factory('Chats', function (MyService) {
    // Might use a resource here that returns a JSON array
    var self = this;
    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
      }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
      }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
      }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }//
     
    };
  });
