module.exports = function (orderBy, ascDesc) {

  if (orderBy === 'name') {
    if (ascDesc === 'desc') {
      return 1;
    } else if (ascDesc === 'asc') {
      return 2;
    };
  } else if (orderBy === 'date') {
    if (ascDesc === 'desc') {
      return 3;
    } else if (ascDesc === 'asc') {
      return 4;
    };
  } else if (orderBy === 'size') {
    if (ascDesc === 'desc') {
      return 5;
    } else if (ascDesc === 'asc') {
      return 6;
    };
  } else if (orderBy === 'seeds') {
    if (ascDesc === 'desc') {
      return 7;
    } else if (ascDesc === 'asc') {
      return 8;
    };
  } else if (orderBy === 'leeches') {
    if (ascDesc === 'desc') {
      return 9;
    } else if (ascDesc === 'asc') {
      return 10;
    };
  }

}