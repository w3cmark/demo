<!--param start-->
    //修改cdn的绝对路径（测试环境）
    fis.set('cdn-path','http://test.nie.163.com/test_cdn/gfxm/pc/zt/20151118124415');
    //修改cdn的绝对路径（正式环境）
    fis.set('cdn-path-release','http://res.gfxm.netease.com/pc/zt/20151118124415');
    //修改雪碧图放大缩小倍数，默认是1，iphone是0.5
    fis.set('css-scale',1);
    //修改include文件的域名
    fis.set('include-host','http://gfxm.163.com')
<!--end-->


//配置通用
fis.set('project.files', ['src/**']);
fis.set('project.ignore', ['node_modules/**', 'dist/**', 'release/**', 'README.md' , 'local/**' ,'.git/**', 'fis-conf.js']);
fis.set('charset', 'gbk');
fis.set('project.charset', 'gbk');

fis.match('**.less', {
    parser: fis.plugin('less'), // invoke `fis-parser-less`,
    rExt: '.css'
});
fis.match('**.tmpl', {
    parser: fis.plugin('bdtmpl'),// invoke `fis-parser-bdtmpl`
    isJsLike : true,
    release : false
},true);
fis.match('**.html', {
    parser: fis.plugin('html-ejs'), // invoke `fis-parser-html-ejs`
    postprocessor : fis.plugin('include',{
        host : fis.get('include-host'),
        debug : true,
        release : false,
        encode : 'gbk',
    })
});
fis.match('**.js', {
    preprocessor: fis.plugin('resload'),
    postprocessor : fis.plugin('replace',{
        local_cdn : "http://127.0.0.1:8080",
        debug_cdn : fis.get("cdn-path"),
        release_cdn : fis.get("cdn-path-release"),
        debug : "local"
    })
});

fis.match(/^\/src\/(.*)$/i,{
    release : "$1"
});
fis.match(/^\/src\/css\/_.*\.(css|less)/i,{
    release : false
});

fis.match(/^\/src\/.*\/(_.*)$/i,{
    release : "temp_file/$1"
});

fis.match(/^\/src\/css\/(.*\.png)$/i,{
    release : "img/spriter/$1"
});

fis.match(/^\/src\/data\/(.*)$/i,{
    useHash : false,
    useDomain : true,
    useSprite : true
},true);

fis.match('src/js/lib/*.js',{
    packTo : 'pkg/lib.js'
});

//配置打本地包

fis.hook('relative');
fis.media('local')
    .match('**', {
      relative: true,
      charset : fis.get("charset"),
      deploy: fis.plugin('encoding')
    })
    .match("**.html",{
        postprocessor : fis.plugin('include',{
            nouse : true
        })
    })
    .match('**', {
      deploy: fis.plugin('local-deliver', {
          to: './local'
      })
    })

//配置测试打包

fis.media('dist')
    .match('**.js', {
        postprocessor : fis.plugin('replace',{
            debug : "dist"
        })
    })
    .match('*.{js,css,less,png,jpg,jpeg,gif,mp3,mp4,flv,swf,svg,eot,ttf,woff}',{
        domain: fis.get("cdn-path"),
        useHash: true
    })
    .match('::package', {
        spriter: fis.plugin('csssprites',{
            layout: 'matrix',
            margin: '5px'
        }),
        postpackager : [fis.plugin('supply'),fis.plugin('loader', {
            allInOne: true
        })]
    })
    .match('*.{css,less}',{
        useSprite : true
    })
    .match('**', {
        charset : fis.get("charset"),
        deploy: [fis.plugin('encoding'),fis.plugin('local-supply', {
            to: './dist',
            exclude : ['inline','temp_file']
        })]
    })

//配置正式打包

fis.media('release')
    .match('**.js',{
        postprocessor : fis.plugin('replace',{
            debug : "release"
        }),
        optimizer: fis.plugin('uglify-js',{
            output : {
                ascii_only : true
            }
        })
    })
    .match('**.html:js',{
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}',{
        optimizer: fis.plugin('clean-css')
    })
    .match('**html:css',{
        optimizer: fis.plugin('clean-css')
    })
    .match("**.html",{
        postprocessor : fis.plugin('include',{
            nouse : true
        })
    })
    .match('*.{js,css,less,png,jpg,jpeg,gif,mp3,mp4,flv,swf,svg,eot,ttf,woff}',{
        domain: fis.get("cdn-path-release"),
        useHash: true
    })
    .match('::package', {
      spriter: fis.plugin('csssprites',{
            layout: 'matrix',
            margin: '5px'
        }),
        postpackager : [fis.plugin('supply'),fis.plugin('loader', {
            allInOne: true
        })]
    })
    .match('*.{css,less}',{
        useSprite : true
    })
    .match('**', {
        charset : fis.get("charset"),
        deploy: [fis.plugin('encoding'),fis.plugin('local-supply', {
            to: './release',
            exclude : ['inline','temp_file']
        })]
    })