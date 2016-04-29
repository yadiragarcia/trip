angular.module('starter.services', [])

.factory('Chats', function($cordovaSQLite) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [];
  var chatObj = "0";

  
  return {
    all: function() {

      chats = [];

      $cordovaSQLite.execute(db, 'SELECT * FROM trip ORDER BY id DESC')
       .then(
          function(result) {
             if (result.rows.length > 0) {
                      for(var i = 0; i < result.rows.length; i++)
                      { 
                        chats.push({"id":result.rows.item(i).id,
                                    "Origen":result.rows.item(i).origen,
                                    "Destino":result.rows.item(i).destino,
                                    "Fecha Inicio":result.rows.item(i).fechainicio,
                                    "Fecha Regreso":result.rows.item(i).fecharegreso,
                                    "Num personas":result.rows.item(i).numpersonas,
                                    "costo":result.rows.item(i).costo});
                      }
                    }
                },
                function(error) {
                    statusMessage = "Error on loading: " + error.message;
                }
        );

      return chats;
    },
    remove: function(chat) {
      $cordovaSQLite.execute(db, 'DELETE FROM trip where id = ?',[chat.id])
      .then(function(result){
          statusMessage = "Borrado";
          chats.splice(chats.indexOf(chat), 1);
      },
      function(error){
          statusMessage = "Error: " + error.message;
      });
    },
    
    get: function(chatId) {

        chats = [];
        
        $cordovaSQLite.execute(db, 'SELECT * FROM trip where id = ?',[chatId])
       .then(
          function(result) {
               
             if (result.rows.length > 0) {
                        chats.push({"id":result.rows.item(i).id,
                                    "Origen":result.rows.item(i).origen,
                                    "Destino":result.rows.item(i).destino,
                                    "Fecha Inicio":result.rows.item(i).fechainicio,
                                    "Fecha Regreso":result.rows.item(i).fecharegreso,
                                    "Num personas":result.rows.item(i).numpersonas,
                                    "costo":result.rows.item(i).costo});                 
                
                    }
                    
                },
                function(error) {
                    statusMessage = "Error on loading: " + error.message;
                }
        );

      return chats;

    }

  };


});