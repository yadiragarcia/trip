angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicPopup, $timeout,$cordovaSQLite) {
    
    $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'trip',
       template: 'Datos guardados'
     });
    }
    
    $scope.guardar = function(lugar){
        
        $cordovaSQLite.execute(db, 'INSERT INTO trip (Origen, Destino, Fecha Inicio, Fecha Regreso, Num personas, Costo) VALUES (?,?,?,?)', [lugar.origen,lugar.destino,lugar.fechainicio,lugar.fecharegreso,lugar.numpersonas,lugar.costo])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado!";
        }, function(error) {
            $scope.statusMessage = "Error al guardar: " + error.message;
        })
        
        /*
        console.log("Origen: "+lugar.origen);
        console.log("Destino: "+lugar.destino);
        console.log("Fecha Inicio: "+lugar.fechainicio);
        console.log("Fecha Regreso: "+lugar.fecharegreso);
        console.log("Num Personas: "+lugar.numpersonas);
        console.log("Costo: "+lugar.costo);
        */
    }
    
})

.controller('ChatsCtrl', function($scope, Chats,$cordovaSQLite) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  //$scope.chats = [];
  
  /*
  $cordovaSQLite.execute(db, 'SELECT * FROM agenda ORDER BY id DESC')
       .then(
          function(result) {
             if (result.rows.length > 0) {
                      for(var i = 0; i < result.rows.length; i++)
                      { 
                        $scope.chats.push({"Origen":result.rows.item(i).origen,
                                    "Destino":result.rows.item(i).destino,
                                    "Fecha inicio":result.rows.item(i).fechainicio,
                                    "Fecha regreso":result.rows.item(i).fecharegreso,
                                      "Num Personas":result.rows.item(i).numpersonas,
                                    "costo":result.rows.item(i).costo});
                          
                      }
                    }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
        );
  */

  $scope.getAll = function()
  {
      $scope.chats = Chats.all();
  };
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$cordovaSQLite) {
  
  //$scope.chat = Chats.get($stateParams.chatId);
  $scope.lugar  = Chats.get($stateParams.chatId);
  
  $scope.guardar = function(lugar){
        
        $cordovaSQLite.execute(db, 'UPDATE trip set Origen=?,Destino=?,Fecha Inicio=?,Fecha Regreso=?, Num personas=?, costo=?, where id = ?', [lugar.origen,lugar.destino,lugar.fechainicio,lugar.fecharegreso,lugar.numpersonas,lugar.costo,lugar.id])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado!";
        }, function(error) {
            $scope.statusMessage = "Error al guardar: " + error.message;
        })
        
        console.log("ORIGEN: "+lugar.origen);
        console.log("ID: "+lugar.id);
    }
  
    
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});