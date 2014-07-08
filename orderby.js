module.exports = function (orderBy, ascDesc) {

  if (orderBy === 'name') {
    if (ascDesc === 'asc') {
      return 1;
    } else if (ascDesc === 'desc') {
      return 2;
    };
  } else if (orderBy === 'date') {
    if (ascDesc === 'asc') {
      return 3;
    } else if (ascDesc === 'desc') {
      return 4;
    };
  } else if (orderBy === 'size') {
    if (ascDesc === 'asc') {
      return 5;
    } else if (ascDesc === 'desc') {
      return 6;
    };
  } else if (orderBy === 'seeds') {
    if (ascDesc === 'asc') {
      return 7;
    } else if (ascDesc === 'desc') {
      return 8;
    };
  } else if (orderBy === 'leeches') {
    if (ascDesc === 'asc') {
      return 9;
    } else if (ascDesc === 'desc') {
      return 10;
    };
  }

}