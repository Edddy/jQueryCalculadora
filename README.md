jQueryCalculadora
=================

A simple plugin for doing simple inline calculation inside any &lt;input>

Always loved to make simple calculations inside any number textbox on MS Money, now you can do it with jQuery also. I skipped showing the calculator, because it will create big trouble maintaining the focus in the input, but show a nice ticket with the past operations.

This is my first jQuery plugin and first GitHub project, so have mercy :)

Demo
----
<a href="http://www.bizcacha.com/public/jqueryCalculadora/index.html">Demo</a>

Options
-------
<ul>
    <li><code>decimals</code> Number of decimals to show in the ticket and in the result value. <i>Default is '2'</i>
    <li><code>useCommaAsDecimalMark</code> If true, use the comma to parse the numbers and to show the values. <i>Default is 'false'</i>
</ul>


Usage
-------
<code>
        $(function () {
            $("input").calculadora({decimals: 0, useCommaAsDecimalMark: false});
        })
</code>