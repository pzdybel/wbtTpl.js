var wbtTpl = function(url) {
    var space = {},
        tpls = {},
        mainUrl = url;
        
    var getTpl = function(tplName) {
        console.log(mainUrl);
        if ( typeof tpls[tplName] === 'undefined' && mainUrl != undefined) {
            $.ajax({
                url: mainUrl,
                data: ({tpl:tplName}),
                async: true,
                success: function(re) {
                    tpls[tplName] = re;
                }
            });
        }
        return tpls[tplName];
    }

    space.append = function(idElement, tpl, vars) {
        if (jQuery!==undefined) {
            $(idElement).append( space.render(tpl, vars) );
        } else {
            var el = document.getElementById( /^#/.test(idElement)?idElement.substr(1):idElement );
            el.innerHTML += space.render(tpl, vars);
        }
    }
    
    space.parse = function(tplstring, vars) {
        var ret = tplstring;

        if (Object.keys(vars).length) {
            for (key in vars) {
                var rg = new RegExp('{'+key+'}','gmi');
                ret = ret.replace(rg, vars[key]);
            }
        }
        
        return ret;
    }
    
    space.addTpl = function(id, tpl) {
        tpls[id] = tpl;
    }
    
    space.render = function(tpl, vars) {
        var ret = tpls[tpl];
        var regres, subret={}, local_ret='', i;
        
        ret = space.parse(ret, vars);
        
        var loops = new RegExp('{{([a-zA-Z0-9_\-]+) ([a-zA-Z0-9_\-]+)}}','gmi');

        while ( regres = loops.exec(ret) ) {

            if ( typeof vars[regres[2]] !== 'undefined' ) {
                for (i=0; i<vars[regres[2]].length; i++ ) {
                    local_ret = local_ret + space.parse(getTpl(regres[1]), vars[regres[2]][i]);
                }
            }
            subret[regres[0]] = local_ret;
            local_ret = '';
            
        }
        
        if (Object.keys(subret).length) {
            for (key in subret) {
                ret = ret.replace(key, subret[key]);
            }
        }
        
        return ret;
        
    }

    space.setUrl = function( url ) {
        mainUrl = url;
    }

        
    return space;
}

var tpls = new wbtTpl();

