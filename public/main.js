
var app = angular.module('api', []);

app.controller('empresaRegistrar', function ($scope, $http) {
    moostrarEmpresas($scope, $http);
    
    $scope.enviarEmpresa = function () {
        //console.log("hola")
        /*$http({
            method : "POST",
              url : "/insertar?nombre="+$scope.nombre
          }).then(function mySuccess(response) {
            $scope.myWelcome = response.data;
          }, function myError(response) {
            $scope.myWelcome = response.statusText;
          });*/

        const options = {
            method: "POST"
        };

        fetch("/insertarEmpresa?nombre=" + $scope.nombre, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                moostrarEmpresas($scope, $http);
            });
    }
    $scope.miInfo=function(fila){
        console.log(fila)
    }
    /*
    $scope.mostrarEmpresas = function () {
        const options = {
            method: "GET"
        };

        fetch("/mostrarEmpresa", options)
            .then(response => response.text())
            .then(data => {
                console.log("data: " + data);
            });
    }
*/
    /*$scope.firstName = "John";
    $scope.lastName = "Doe";
    
    $scope.fullName = function () {
        return $scope.firstName + " " + $scope.lastName;
    };*/

    $scope.enviarDepartamento = function () {
        const options = {
            method: "POST"
        };

        fetch("/insertarDepartamento?nombreEmpresa=" + $scope.selectedEmpresa +"&nombre="+$scope.nombreDepartamento, options)
            .then(response => response.text())
            .then(data => {
                console.log("data: " + data);
            });
    }
});


function moostrarEmpresas($scope, $http) {
    $http.get("/mostrarEmpresa")
        .then(function (response) {
            console.log(response)
            var array=[]
            response.data.forEach(element => {
                array.push(element.nombre)
            });
            $scope.empresas = array;
        });
}