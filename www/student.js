/**
 * Created by juan on 23/04/17.
 */

var API = 'http://localhost:3000';

var MainApp = angular.module('MainApp', ['angular.filter']);

MainApp.controller('core_student',function($scope, $http){


    $scope.newStudent = {};
    $scope.newSubject = {};
    $scope.students = {};
    $scope.selected = false;


    /** OK **/

    $http.get(API + '/api/students').success(function (data) {
        $scope.students = data;
    })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $http.get(API + '/api/subjects').success(function (data) {
        $scope.subjects = data;
    })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    /** OK **/

    $scope.registrarPhone = function (newStudent) {
        $http.post(API+ '/api/students/' + $scope.newStudent._id, $scope.newStudent)
            .success(function (data) {
                if (data == false) {
                    alert("El número de telèfon no es vàlid");
                }
                else {
                    $scope.cleanall(); // Borramos los datos del formulario
                    $scope.students = data;
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        location.reload(); // soluciona un problema con la tabla

    }

    /** OK ***/

    $scope.borrarPhone = function (newStudent) {
        $http.delete(API + '/api/students/' + $scope.newStudent._id + '/' + $scope.newStudent.phone_id)
            .success(function (data) {
                $scope.cleanall();
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        location.reload(); // soluciona un problema con la tabla
    };

    /** OK **/

    $scope.registrarStudent = function (res) {

        if (confirm("Ets " + $scope.newStudent.name + "?")) {
            $http.post(API + '/api/students', $scope.newStudent)
                .success(function (data) {
                    $scope.cleanall(); // Borramos los datos del formulario
                    $scope.students = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
        location.reload(); // soluciona un problema con la tabla
    };

    /** OK **/

    $scope.modificarStudent = function (newStudent) {
        $http.put(API + '/api/students/' + $scope.newStudent._id, $scope.newStudent)
            .success(function (data) {
                $scope.cleanall(); // Borramos los datos del formulario
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    /** OK **/

    $scope.borrarStudent = function (newStudent) {
        $http.delete(API + '/api/students/' + $scope.newStudent._id)
            .success(function (data) {
                $scope.cleanall();
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.filterStudentBySubject = function (newSubject) {
        //$scope.newSubject = {
        //    _id: id
        //};
        //console.log(id);
        $http.get(API + '/api/studentsbysubject/' + newSubject._id)
            .success(function(data){
                console.log(data);
                $scope.students = data;
                $scope.cleanall();
            })
            .error(function(data){
                console.log('Error:' + data);
            });

    };

    /** OK **/

    $scope.filterStudent = function (res) {

        $http.get(API + '/api/students/name/' + $scope.newStudent.name)
            .success(function (data) {
                if (data == false) {
                    alert("No hi ha cap estudiant amb aquest nom");
                }
                else {
                    $scope.students = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    /** OK **/
    $scope.filterStudentOrderByName = function (res) {

        $http.get('/api/studentsbyname')
            .success(function (data) {
                if (data == false) {
                    alert("No hi ha estudiants");
                }
                else {
                    console.log(data);
                    $scope.students = data;
                    $scope.cleanall();
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    /** OK **/

    $scope.selectSubject = function (subject) {
        $scope.newSubject = subject;
        $scope.selected = true;
        console.log($scope.newSubject, $scope.selected);
    };

    $scope.selectStudent = function (student) {
        $scope.newStudent = student;
        $scope.selected = true;
        console.log($scope.newStudent, $scope.selected);
    };

    $scope.selectPhone = function (phone) {
        $scope.newStudent.type = phone.type;
        $scope.newStudent.number = phone.number;
        $scope.newStudent.phone_id = phone._id;
        $scope.selected = true;
        console.log($scope.newStudent, $scope.selected);
    };

    $scope.cleanall = function () {
        $scope.newStudent = {};
    };

});