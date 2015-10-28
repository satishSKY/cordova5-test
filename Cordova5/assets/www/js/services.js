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
        xhr.open("GET", url, true);
        xhr.overrideMimeType("image/svg+xml");
        xhr.send();
        xhr.onerror = function(e) {
      	  console.error(e);
        }
        xhr.onreadystatechange=function(){
      	  console.log(xhr.readyState,xhr.status);
      	  if(xhr.readyState==4 && (xhr.status==200||xhr.status==0)){
      		  if(xhr.responseXML.documentElement != null || xhr.responseXML.documentElement != 'null'){
      		  $("#svgContainer").html("");
      	      document.getElementById("svgContainer")
      	        .appendChild(xhr.responseXML.documentElement);
      	      $('svg').attr('id', 'mobile-svg');
      	    var h = window.innerHeight;
      	    var w = window.innerWidth;
      	  $( window ).width(w);
  	      if(w < h)
  	    	  $('svg').height(w);
  	      else
  	    	  $('svg').height(w/2);
  	      
  	     
      	      $("path").click(function (e) {
      	        self.method1();
      	        console.log("path: ", this.id);
      	      });
      	      self.svgController();  
      		  }
      	  }else{
      		  console.error(xhr);
      	  }
        }      
    },//initSvg
    this.svgController = function() {
    	var eventsHandler;

    	eventsHandler = {
    			haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
    	, init: function(options) {
    		var instance = options.instance
    		, initialScale = 1
    		, pannedX = 0
    		, pannedY = 0

    		// Init Hammer
    		// Listen only for pointer and touch events
    		this.hammer = Hammer(options.svgElement, {
    			inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
    		})

    		// Enable pinch
    		this.hammer.get('pinch').set({enable: true})

    		// Handle double tap
    		this.hammer.on('doubletap', function(ev){
    			instance.zoomIn()
    		})

    		// Handle pan
    		this.hammer.on('panstart panmove', function(ev){
    			// On pan start reset panned variables
    			if (ev.type === 'panstart') {
    				pannedX = 0
    				pannedY = 0
    			}

    			// Pan only the difference
    			instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
    			pannedX = ev.deltaX
    			pannedY = ev.deltaY
    		})

    		// Handle pinch
    		this.hammer.on('pinchstart pinchmove', function(ev){
    			// On pinch start remember initial zoom
    			if (ev.type === 'pinchstart') {
    				initialScale = instance.getZoom()
    				instance.zoom(initialScale * ev.scale)
    			}

    			instance.zoom(initialScale * ev.scale)

    		})

    		// Prevent moving the page on some devices when panning over SVG
    		options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
    	}

    	, destroy: function(){
    		this.hammer.destroy()
    	}
    	}

    	// Expose to window namespace for testing purposes
    	window.panZoom = svgPanZoom('#mobile-svg', {
    		zoomEnabled: true
    		, controlIconsEnabled: true
    		, fit: 1
    		, center: 1
    		, customEventsHandler: eventsHandler
    	});
    }//svg
    
    
    
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
