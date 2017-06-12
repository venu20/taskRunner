'use strict';

function taskRunnerController()
{
    this.projectName = "Task Tracker";
};

const taskRunnerHeader = {
    bindings: {
        name: '<'
    },
    templateUrl: '/html/header.html',
    controller: taskRunnerController
};

const taskRunnerFormContent = {
templateUrl: '/html/trForm.html',
controller: function($rootScope, $filter, getDataService) {
    this.name = '';
    this.date = '';
    this.assigned = '';
    this.submit = () => {
        const filterDate = $filter('date')(this.date, 'MM/dd/yyyy')
        let data = {
            name: this.name,
            date: filterDate,
            assigned: this.assigned
        };
        $rootScope.$broadcast('table:updated', data);
    };
    }    
};

const taskRunnerExitingTasks = {
    templateUrl: '/html/trTasks.html',
    controller: function($scope, getDataService){
        getDataService.returnData().then((success)=>{
            this.tasks = success.data;
        });
        $scope.$on('table:updated', (event, data)=>{
            this.tasks.push(data);
        })
}
};

angular.module('taskRunner', ['ui.router']).
config(($stateProvider) => {
     var helloState = {
            name: "home",
            url: "/home",
            views: {
                'header': {
                    component: 'trHeader'
                },
                'form' : {
                    component: 'trForm'
                },
                'tasks' : {
                    component: 'trTasks'
                }
            }
            };
  $stateProvider.state(helloState);
})
.component("trHeader", taskRunnerHeader)
.component("trForm", taskRunnerFormContent)
.component("trTasks", taskRunnerExitingTasks)
.service("getDataService", function($http){
    this.returnData = () => {
         return $http({url: 'data.json', method: 'GET'});
    };
})
