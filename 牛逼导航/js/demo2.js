(function(){

	var button1 = document.getElementById('cn-button'),
    wrapper1 = document.getElementById('cn-wrapper');

    //open and close menu when the button is clicked
	var open1 = false;
	button1.addEventListener('click', handler, false);

	function handler(){
	  if(!open1){
	    this.innerHTML = "Close";
	    classie.add(wrapper1, 'opened-nav');
	  }
	  else{
	    this.innerHTML = "Menu";
		classie.remove(wrapper1, 'opened-nav');
	  }
	  open1 = !open1;
	}
	function closeWrapper(){
		classie.remove(wrapper1, 'opened-nav');
	}
})();
