/*
 * jQuery Calculadora 0.3
 * Copyright 2013, Eduardo Molteni
 *
*/

(function($){
    $.fn.extend({
        calculadora: function(options) {
        
            var defaults = {
                decimals: 2,
                useCommaAsDecimalMark: false
            }
                
            var options = $.extend(defaults, options);        
        
            var ticket = $('<div id="calculadora" style="display: none; position: absolute"><ul></ul></div>');
            var ticketUl = ticket.find("ul");
            $("body").append(ticket);
            
            return this.each(function() {
                var o = options;
                var self = $(this);
                var LastOperator = 0;
                var TotalSoFar = 0;
                var TicketIsVisible = false;

                self.blur(function (event) {
                    LastOperator = 0;
                    ticketUl.html("");
                    ticket.hide();
                    TicketIsVisible = false;
                });

                self.keydown(    
                    function (event) {
                        var number = parseLocalFloat(self.val());

                        // if there's a number in the input:
                        if (number !== 0)
                            switch (event.which) {
                                // if the key is   -+/*:
                                case 109:
                                case 107:
                                case 111:
                                case 106:
                                    event.preventDefault();
                                    calculateSoFar( number );
                                    addToTicket(formatNumber(number, o.decimals), event.which);
                                    LastOperator = event.which;
                                    self.val(""); 
                                    break;
                                case 75: //if the key is  'k'
                                    event.preventDefault();
                                    self.val(number * 1000);
                                    break;
                                case 77: //if the key is  'M'
                                    event.preventDefault();
                                    self.val(number * 1000000);
                                    break;
                                    break;
                            }

                        // si la tecla es enter o tab o =
                        if (event.which == 13 || event.which == 9) {
                            console.log(event.which);
                            if (event.which == 13) {
                                event.preventDefault();
                            }
                            calculateSoFar(number);
                            addToTicket(formatNumber(number, o.decimals), "=");
                            addToTicket(formatNumber(TotalSoFar, o.decimals), 0, "tot");
                            self.val(formatNumber(TotalSoFar, o.decimals));
                            LastOperator = 0;
                        }
                    }
                );

                self.keypress(
                    function (event) {
                        var number = parseLocalFloat(self.val());

                        if (event.which == 37) {
                            event.preventDefault();
                            self.val(TotalSoFar * number / 100);
                        }
                    }
                );

                self.blur(
                    function () {
                        event.preventDefault();
                        var number = parseLocalFloat(self.val());
                        calculateSoFar(number);
                        self.val(formatNumber(TotalSoFar, o.decimals));
                    }
                );

                function calculateSoFar(number) {
                    if (LastOperator === 0) {
                        TotalSoFar = number;
                    }
                    else {
                        // prevent using eval
                        if (LastOperator == 109) TotalSoFar = TotalSoFar - number;
                        if (LastOperator == 107) TotalSoFar = TotalSoFar + number;
                        if (LastOperator == 111 && number !== 0) TotalSoFar = TotalSoFar / number;
                        if (LastOperator == 111 && number === 0) TotalSoFar = 0;
                        if (LastOperator == 106) TotalSoFar = TotalSoFar * number;
                    }
                }

                function addToTicket(text, which, liclass) {
                    var pos = self.offset();
                    if (!TicketIsVisible && pos) {
                        ticket.css('top', (pos.top - 15) + "px");
                        ticket.css('left', pos.left + "px");
                        ticket.css('min-width', self.width() + "px");
                        //ticket.show("slide", { direction: "up" }, 1000);
                        ticket.show();
                        TicketIsVisible = true;
                    }
                    ticketUl.append("<li class='" + liclass + "'><div class='op'>" + operatorForCode(which) + "</div><div class='num'>" + text + "</div></li>");
                    ticket.css('top', (pos.top - ticket.height()) + "px");
                }

            });


            function parseLocalFloat(num) {
                if (!num) return 0;
                if (options.useCommaAsDecimalMark) {
                    return parseFloat((num.replace(/\./g, "").replace(/ /g, "").replace("$", "").replace(",", ".")));
                }
				return parseFloat(num.replace(",", ""));
            }

            function formatNumber(n, c) {
                var d = "."; var t = ",";
                if (options.useCommaAsDecimalMark) {
                    d = ","; t = ".";
                }
                c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            };
            

            function operatorForCode(whichKeyCode) {
                if (whichKeyCode == 109) return("-");
                if (whichKeyCode == 107) return ("+");
                if (whichKeyCode == 111) return ("/");
                if (whichKeyCode == 106) return ("*");
                if (whichKeyCode == "=") return ("=");
                return "";
            }

        }
    });
    
})(jQuery);

