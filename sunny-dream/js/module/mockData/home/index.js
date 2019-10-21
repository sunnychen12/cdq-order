define([
    'module/mockData/home/areas',
    'module/mockData/home/index-news',
    'module/mockData/home/index-expert',
    'module/mockData/home/index-wonderful-time'
],function(
    area, indexNews, indexExpert, indexWonderfulTime
){
    return {
        areas : area,
        indexNews: indexNews,
        indexExpert: indexExpert,
        indexWonderfulTime: indexWonderfulTime
    };
});