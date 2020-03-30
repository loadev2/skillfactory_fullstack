function jQuery (selector, context = document){
	this.elements = Array.from(context.querySelectorAll(selector));
	return this;
}

jQuery.prototype.each = function(fn){
	this.elements.forEach((element, index) => fn.call(element, element, index));
	return this;
}

jQuery.prototype.click = function(fn){
	this.each(element => element.addEventListener('click' , fn));
	return this;
}

jQuery.prototype.hide = function(){
	this.each(element => element.style.display = 'none');
	return this;
}

jQuery.prototype.show = function(){
	this.each(element => element.style.display = 'inline-block')
  	return this;
}

jQuery.prototype.html = function(content=undefined){
	if (content===undefined){
		if(this.elements[0]===undefined)
			return undefined
		return this.elements[0].innerHTML;
	}

	this.each(element => element.innerHTML=content);
	return this;
}