function jQuery (selector, context = document){
	this.elements = Array.from(context.querySelectorAll(selector));
	return this
}

jQuery.prototype.each = function (fn){
	this.elements.forEach((element, index) => fn.call(element, element, index));
	return this;
}

jQuery.prototype.click = function(fn){
	this.each(element => element.addEventListener('click', fn))
	return this
}

jQuery.prototype.hide = function(){
	this.each(element => element.style.display = 'none')
  	return this;
}

jQuery.prototype.show = function(){
	this.each(element => element.style.display = '')
  	return this;
}

jQuery.prototype.remove = function(){
	this.each(element => element.remove())
  	return this;
}

jQuery.prototype.class = function(name){
	this.each(element => element.className = name)
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

jQuery.prototype.text = function(content=undefined){
	if (content===undefined){
		if (this.elements.length==0)
			return undefined;
		let str="";
		this.each(element=>{str+=element.textContent})
		return str;
	}
	this.each(element => element.textContent=content);
	return this;
}

const $ = (e) => new jQuery(e);

//console.log($('div').html("<h3>bomba</h3>"))


//console.log($('.demo-container').text(3))


















