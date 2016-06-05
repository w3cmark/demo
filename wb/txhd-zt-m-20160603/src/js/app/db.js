nie.define('DB',function(){

    var _urlhost = 'http://dora.webcgi.163.com/api/',
    getData = function(url,data,success,error){

        $.ajax({
            url: url ,
            type:'get',
            data: data ,
            dataType: 'jsonp',
            success:function(data){
                success(data);
            },
            error: function(){
                alert('网络信号不好，请刷新再试');
                if(error){
                    error();
                }
            }

        });
    },
    clothes_alone_signup = function(data, success){
        getData(_urlhost + '21_227_2016_06_02/signup', data, success);
    },
    clothes_group_signup = function(data, success){
        getData(_urlhost + '21_229_2016_06_02/signup', data, success);
    },
    lanther_alone_signup = function(data, success){
        getData(_urlhost + '21_231_2016_06_02/signup', data, success);
    },
    lanther_group_signup = function(data, success){
        getData(_urlhost + '21_233_2016_06_02/signup', data, success);
    };

    return{
        clothes_alone_signup: clothes_alone_signup,
        clothes_group_signup: clothes_group_signup,
        lanther_alone_signup: lanther_alone_signup,
        lanther_group_signup: lanther_group_signup
    }

});



//调用
// DB.signCount({
//         'code': code,
//         'state': state
//     },
//     function(){

//     });