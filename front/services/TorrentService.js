TPBApp.service('torrents', function ($http){

  this.get = function (query, category, orderBy, orderAscDesc, page) {
    if (sessionStorage[query + category + orderBy + orderAscDesc + page]) {
      var results = JSON.parse(sessionStorage[query + category + orderBy + orderAscDesc + page]);
      return results;
    } else {
      return $http({
        method: 'GET',
        url   : '/search',
        params: {
          searchQuery : query,
          orderBy     : orderBy,
          orderAscDesc: orderAscDesc,
          category    : category,
          page        : page
        }
      });
    };
  };

});