require.config({


    paths:{
        jquery: 'lib/jquery/dist/jquery',
        plugin: 'jQuery.textEffect.plugin'
    },
    shim:{
        jquery:{
            exports:'jQuery'
        },
        plugin:{
            deps: ['jquery']
        }
    }

});

requirejs(["main"]);