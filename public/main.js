
var app = angular.module('api', []);

app.controller('empresaRegistrar', function ($scope, $http) {
    moostrarEmpresas($scope, $http);
    moostrarDepartamento($scope, $http);
    moostrarLideres($scope, $http);
    moostrarEmpleados($scope, $http);

    $scope.enviarEmpresa = function () {
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

    $scope.enviarDepartamento = function () {
        const options = {
            method: "POST"
        };

        fetch("/insertarDepartamento?nombreEmpresa=" + $scope.selectedEmpresa + "&nombre=" + $scope.nombreDepartamento, options)
            .then(response => response.text())
            .then(data => {
                if (data === "1") {
                    moostrarDepartamento($scope, $http);
                    alert("se a registrado un departamento")
                } else {
                    alert("no se registro");
                }
                console.log("data: " + data);
            });
    }

    $scope.enviarLider = function () {
        const options = {
            method: "POST"
        };

        fetch("/insertarLider?nombre=" + $scope.nombreLider + "&nombreDepartamento=" + $scope.selectedDeparamentos, options)
            .then(response => response.text())
            .then(data => {
                if (data === "1") {
                    moostrarLideres($scope, $http);
                    alert("se a registrado un lider")
                } else {
                    alert("no se registro");
                }
                console.log("data: " + data);
            });
    }

    $scope.enviarEmpleado = function () {
        const options = {
            method: "POST"
        };

        fetch("/insertarEmpleado?nombre=" + $scope.nombreEmpleado + "&nombreDepartamento=" + $scope.selectedDeparamentos, options)
            .then(response => response.text())
            .then(data => {
                if (data === "1") {
                    moostrarEmpleados($scope, $http);
                    alert("se a registrado un empleado")
                } else {
                    alert("no se registro");
                }
                console.log("data: " + data);
            });
    }

    $scope.departamentosEnlazados = function () {
        if ($scope.selectEmpresa != undefined) {
            console.log("empresa" + $scope.selectEmpresa)
            $http.get("/buscarDepartamento?nombre=" + $scope.selectEmpresa)
                .then(function (response) {
                    console.log(response)
                    var array = []
                    response.data.forEach(element => {
                        array.push(element.nombre)
                    });
                    $scope.departamentosx = array;
                });

        }

    }

    $scope.lideresEnlazados = function () {
        if ($scope.selectDepartamento != undefined) {
            console.log("departamento: " + $scope.selectDepartamento);
            $http.get("/buscarLider?nombre=" + $scope.selectDepartamento)
                .then(function (response) {
                    console.log(response)
                    var array = []
                    response.data.forEach(element => {
                        array.push(element.nombre)
                    });
                    $scope.lideresx = array;
                });
            $http.get("/buscarEmpleado?nombre=" + $scope.selectDepartamento)
                .then(function (response) {
                    console.log(response)
                    var array = []
                    response.data.forEach(element => {
                        array.push(element.nombre)
                    });
                    $scope.empleadox = array;
                });
        }

    }
    
        $scope.eliminarLider=function(){
            if($scope.deleteLider!=undefined){
                console.log("lider: "+$scope.deleteLider)
                $http.post("/eliminarLider?nombre=" + $scope.deleteLider)
                .then(function (response) {
                    console.log(response)
                    if(response.data!="0"){
                        moostrarLideres($scope, $http);
                        alert("se elimino con exito")
                    }else{
                        alert("no se a eliminado")
                    }
                });
            }
        }

        $scope.eliminarEmpleados=function(){
            if($scope.deleteEmpleados!=undefined){
                console.log("lider: "+$scope.deleteEmpleados)
                $http.post("/eliminarEmpleado?nombre=" + $scope.deleteEmpleados)
                .then(function (response) {
                    console.log(response)
                    if(response.data!="0"){
                        moostrarEmpleados($scope, $http)
                        alert("se elimino con exito")
                    }else{
                        alert("no se a eliminado")
                    }
                });
            }
        }

        $scope.actualizacionLider=function(){
            if($scope.updateLider!=undefined && $scope.seleccionDeparamentos!=undefined){
                $http.post("/cambiarDepartamentoLider?nombre=" + $scope.updateLider+"&nombreDepartamento="+$scope.seleccionDeparamentos)
                .then(function (response) {
                    console.log(response)
                    if(response.data!="0"){
                        moostrarEmpleados($scope, $http)
                        alert("se actualizo con exito")
                    }else{
                        alert("no se a actualizado")
                    }
                });
            }
        }
        $scope.actualizacionEmpleado=function(){
            if($scope.updateEmpleados!=undefined && $scope.seleccionDeparamento!=undefined){
                $http.post("/cambiarDepartamentoEmpleado?nombre=" + $scope.updateEmpleados+"&nombreDepartamento="+$scope.seleccionDeparamento)
                .then(function (response) {
                    console.log(response)
                    if(response.data!="0"){
                        moostrarEmpleados($scope, $http)
                        alert("se actualizo con exito")
                    }else{
                        alert("no se a actualizado")
                    }
                });
            }
        }

});


function moostrarEmpresas($scope, $http) {
    $http.get("/mostrarEmpresa")
        .then(function (response) {
            console.log(response)
            var array = []
            response.data.forEach(element => {
                array.push(element.nombre)
            });
            $scope.empresas = array;
        });
}

function moostrarDepartamento($scope, $http) {
    $http.get("/mostrarDepartamento")
        .then(function (response) {
            console.log(response)
            var array = []
            response.data.forEach(element => {
                array.push(element.nombre)
            });
            $scope.departamentos = array;
        });
}

function moostrarLideres($scope, $http) {
    $http.get("/mostrarLideres")
        .then(function (response) {
            console.log(response)
            var array = []
            response.data.forEach(element => {
                array.push(element.nombre)
            });
            $scope.todosLideres = array;
        });
}

function moostrarEmpleados($scope, $http) {
    $http.get("/mostrarEmpleados")
        .then(function (response) {
            console.log(response)
            var array = []
            response.data.forEach(element => {
                array.push(element.nombre)
            });
            $scope.todosEmpleados = array;
        });
}