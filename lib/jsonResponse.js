exports.jsonResponse = function (statuscode, body) {
    return {
      statuscode,
      body: body,
    };
  };

//FORMA DE UNIFICAR LO QUE MANDO DE MI SERVIDOR A MI FRONT