var List = function(container ,items, itemHeight){
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.init();
    this.update();
}

List.prototype.init = function(){
    var h = this.container.offsetHeight;
    this.ul = document.createElement('ul');
    var len = this._maxLength();
    var html = '', _self = this;
    for(var i = 0; i < len; i++){
        html += '<li>'+this.items[i]+'</li>';
    }
    this.ul.innerHTML = html;
    this.container.appendChild(this.ul);
    this.container.addEventListener('scroll', function(){
        _self.update();
    }, false);
};
List.prototype._maxLength = function(){
    //container的高度，算出显示的item的数量
    var h = this.container.offsetHeight;
    var len = Math.min(Math.ceil(h/this.itemHeight), this.items.length);
    return len;
};
List.prototype.update = function(){
    //ul的长度为所有li的总长度
    var height = this.items.length * this.itemHeight + "px";
    if(this.ul.style.height !== height){
        this.ul.style.height = height;
    }
    //通过滚动条的高度，算出起始的item
    var scrollTop = this.container.scrollTop;
    var start = Math.floor(scrollTop/this.itemHeight);

    var items = this.ul.children;
    var len = this._maxLength();
    for(var i = 0; i < len; i++){
        var item = items[i];
        if(!item){
            item = items[i] + document.createElement('li');
            this.ul.appendChild(item);
        }
        var index = start + i;
        //替换内容，更新top
        item.innerHTML = this.items[index];
        item.style.top = this.itemHeight * index + 'px';
    }

}
