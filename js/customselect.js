/*
 * (c) IgoninLab, 2013-2014
 * http://igoninlab.com
 * i@igoninlab.com
 * +7 8422 75-81-02
 */

(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);

(function($) {
    $.fn.replaceSelect = function(){
        return this.each(function(){
            var $this = $(this);

            var options = [];
            var selected = 0;


            var $container = $('<div></div>');
            var $current = $('<span><i></i></span>');
            var $list = $('<ul></ul>');
            var scrolled = false;

            $list.append('<div class="list_inner"></div>');
            $list = $list.find('.list_inner');

            function render() {
                $list.children().remove();

                options = [];

                if($this.find('optgroup').length) {
                    $this.children('option').each(function(){
                        var value = $(this).attr('value') || $(this).text();
                        if($(this).is(':selected')) {
                            selected = $(this).index();
                        }

                        options.push({
                            value: value,
                            text: $(this).data('text') || $(this).html()
                        });

                        var $item = $('<li></li>');
                        $item.html($(this).data('text') || $(this).html())
                            .data('value', value);
                        $list.append($item);
                    });

                    $this.find('optgroup').each(function() {
                        var $item = $('<li></li>');
                        $item.addClass('group')
                        $item.text($(this).attr('label'))
                            .data('value', '');
                        $list.append($item);


                        $(this).find('option').each(function(){
                            var value = $(this).attr('value') || $(this).text();

                            options.push({
                                value: value,
                                text: $(this).text()
                            });

                            if($(this).is(':selected')) {
                                selected = options.length - 1
                            }



                            var $item = $('<li></li>');
                            $item.text($(this).text())
                                .data('value', value);
                            $list.append($item);
                        });
                    });
                } else {
                    $this.find('option').each(function(){
                        var value = $(this).attr('value') || $(this).text();
                        if($(this).is(':selected')) {
                            selected = $(this).index();
                        }

                        options.push({
                            value: value,
                            text: $(this).data('text') || $(this).html()
                        });
                    });

                    for(var id in options) {
                        var $item = $('<li></li>');
                        $item.html(options[id].text)
                            .data('value', options[id].value);
                        $list.append($item);
                    }
                }
            }

            render();

            if($this.attr('placeholder') || $this.data('placeholder')) {
                $current.addClass('placeholder').find('i').text($this.attr('placeholder') || $this.data('placeholder'));
            } else {
                $current.find('i').html(options[selected].text);
            }

            /*$current.text(options[selected].text)
                    .click(function(e){

                    });*/

            $list.on('click', 'li:not(.group)', function(){
                $container.removeClass('open');
                $this.val($(this).data('value'));
                $this.trigger('change');

                return false;
            });

            $this.on('change', function(){
                selected = $this.children('option:selected').index();
                $current.removeClass('placeholder').find('i').html(options[selected].text);

            });

            $this.on('reset', function() {
                if($this.attr('placeholder')) {
                    $current.addClass('placeholder').find('i').html($this.attr('placeholder'));
                } else {
                    $current.find('i').html(options[selected].text);
                }
            });

            $list.find('li.group').click(function(e){
                e.preventDefault();
                e.stopPropagation();
            });

            $list.click(function(e){
                e.stopPropagation();

                return false;
            });

            $container
                .attr('class', $this.attr('class'))
                .addClass('select')
                .append($current)
                .append($list.parent())

                .on('click', function(e){
                    $('.select').not($(this).closest('.select')).removeClass('open');
                    $container.toggleClass('open');



                    e.stopPropagation();

                    return false;
                });

	        $('body').click(function(){
		        $container.removeClass('open');
	        });

            $this.before($container);
            $this.hide();

            // Attach simplebar if available
            if(typeof SimpleBar == 'function') {
                new SimpleBar($list.parent()[0]);
            }

            var updateTimeout = null;

            function scheduleUpdate() {
                if(updateTimeout) {
                    clearTimeout(updateTimeout);
                }

                updateTimeout = setTimeout(function() {
                    render();
                    clearTimeout(updateTimeout);
                    updateTimeout = null;
                }, 100);
            }

            var observer = new MutationObserver(function(mutations) {
                scheduleUpdate();
            });

            var config = { attributes: false, childList: true, characterData: false };

            observer.observe(this, config);

            $container.append($this);
        });
    }

})(jQuery);