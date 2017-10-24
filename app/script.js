angular.module('app')

    .controller('DashboardCtrl', ['$scope', '$timeout',
	function ($scope, $timeout) {
            $scope.gridsterOptions = {
                margins: [10, 10],
                columns: 4,
                draggable: {
                    handle: 'h3'
                }
            };
        
            $scope.uuidv4 = function() {
                return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
            }

            $scope.dashboard = {
                widgets: [{
                    id: $scope.uuidv4(),
                    col: 0,
                    row: 0,
                    sizeY: 1,
                    sizeX: 1,
                    name: "Widget 1"
				}]
            };

            $scope.clear = function () {
                $scope.dashboard.widgets = [];
            };

            $scope.addWidget = function () {
                $scope.dashboard.widgets.push({
                    id: $scope.uuidv4(),
                    name: "New Widget",
                    sizeX: 1,
                    sizeY: 1
                });
            };
	}
])

    .controller('GaugeController', ['$scope', function ($scope) {
            $scope.widget = undefined;
            $scope.initx = function(widget)
            {
                $scope.widget = widget;
                console.log(widget);
            }

            $scope.gaugeOptions = {
                scale: {
                    startValue: 50,
                    endValue: 150,
                    tickInterval: 10,
                    label: {
                        useRangeColors: true
                    }
                },
                rangeContainer: {
                    palette: "pastel",
                    ranges: [
                        {
                            startValue: 50,
                            endValue: 90
                        },
                        {
                            startValue: 90,
                            endValue: 130
                        },
                        {
                            startValue: 130,
                            endValue: 150
                        }
                ]
                },
                

                value: 105
            };
}
])

    .controller('CustomWidgetCtrl', ['$scope', '$modal',
	function ($scope, $modal) {

            $scope.remove = function (widget) {
                $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
            };

            $scope.openSettings = function (widget) {
                $modal.open({
                    scope: $scope,
                    templateUrl: 'app/widget_settings.html',
                    controller: 'WidgetSettingsCtrl',
                    resolve: {
                        widget: function () {
                            return widget;
                        }
                    }
                });
            };

	}
])

    .controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
	function ($scope, $timeout, $rootScope, $modalInstance, widget) {
            $scope.widget = widget;

            $scope.form = {
                id: widget.id,
                name: widget.name,
                sizeX: widget.sizeX,
                sizeY: widget.sizeY,
                col: widget.col,
                row: widget.row,
                type: widget.type,
                datasource: widget.url
            };

            
            $scope.dismiss = function () {
                $modalInstance.dismiss();
            };

            $scope.remove = function () {
                $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
                $modalInstance.close();
            };

            $scope.submit = function () {
                angular.extend(widget, $scope.form);

                $modalInstance.close(widget);
            };

	}
])
