function TVCtrl ($http, $scope) {

  $scope.loader = true;

  if (sessionStorage['tv']) {
    $scope.loader    = false;
    $scope.error     = false;
    $scope.noResults = false;
    $scope.series    = JSON.parse(sessionStorage['tv']);
  } else {
    $http({
      method: 'GET',
      url   : '/tv'
    }).success(function (data, status, headers, config) {
      if (data == false) {
        $scope.loader    = false;
        $scope.error     = false;
        $scope.series    = false;
        $scope.notPage   = false;
        $scope.noResults = true;
      } else if (data == 'Page doesn\' exist') {
        $scope.loader    = false;
        $scope.error     = false;
        $scope.series    = false;
        $scope.noResulta = false;
        $scope.notPage   = true;
      } else {
        $scope.loader    = false;
        $scope.error     = false;
        $scope.noResults = false;
        $scope.notPage   = false;
        $scope.series    = data;
        sessionStorage['tv'] = JSON.stringify(data);
      };
    }).error(function (data, status, headers, config) {
      $scope.loader    = false;
      $scope.noResults = false;
      $scope.series    = false;
      $scope.notPage   = false;
      $scope.error     = true;
    });
  };

  $scope.search = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0';
    var page         = 0;

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc + '/' + page;
  };

  $scope.goTop = function () {
    $('html, body').animate({ scrollTop:  $('#results').offset().top - 50 }, 800);
  };
};