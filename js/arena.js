var Arena = {};

(function(){

    /* page switch */
    var PageTurner = (function(){
        function PageTurner(config){
            this.trigger = config.trigger;
            this.book = $(config.content);
            this.nav = $(config.nav);
            this.totalPage = $(config.content).children().length;

            this.now = config.index || 0;
            this.spd = config.speed || 600;

            this.init();

            console.log('ready');
        };

        PageTurner.prototype = {
            init : function(){
                this.evtBind();
            },

            evtBind : function(){
                var self = this;
                $(self.trigger + '.prev').click(function(){
                    //prevPage
                    self.viewUpdate('prev');
                });

                $(self.trigger + '.next').click(function(){
                    //nextPage
                    self.viewUpdate('next');
                });                
            },

            viewUpdate : function(type){
                if(type=='next'){
                    this.now = this.now == this.totalPage-1 ? 0 : this.now+1;                    
                }
                else if(type=='prev'){
                    this.now = this.now == 0 ? this.totalPage-1 : this.now-1; 
                }
                this.book.animate({'left': -100*this.now + '%'},this.spd);
                this.setNav();
            },

            setNav : function(){
                var self = this;
                self.nav.children().children().each(function(index){
                    var _i = index;
                    _i<=self.now ? $(this).addClass('pass'):$(this).removeClass('pass');
                });
                
                self.now==self.totalPage-1?self.nav.addClass('last'):self.nav.removeClass('last');

            }
        };

        return PageTurner;
    }());
    Arena.PageTurner = PageTurner;

})();

new Arena.PageTurner({
    'trigger' : '.m-view .u-btn',
    'content' : '.view-content',
    'nav'     : '.u-nav' 
});