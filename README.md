wbtTpl.js
=========

Simple template engine for javascript

#EXAMPLE

	// {variableName}
	// {{templateName variablesArray}}
	
	tpls.addTpl('hi_div', '<div>Hi <b>{first_name} {last_name}</b></div><div class="yourlinks">{{links_tpl links}}');
	tpls.addTpl('links_tpl', '<a href="{url}">{title}</a><br>');

	var tpl_variables = {
	    'first_name': 'Jasio',
	    'last_name': 'Kowalski',
	    'links': [
	        {
	            url: 'http://jasio.kowalski.pl',
	            title: 'My Home Page'
	        },
	        {
	            url: 'mailto:jasio@kowalski.pl',
	            title: 'My e-mail'
	        }
	    ]
	};

	// return string
	var html = tpls.render('hi_div', tpl_variables);
	
	// append to id=content
	tpls.append('#content', 'hi_div', tpl_variables);


