sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.sapui5.controller.Main", {
        onInit: function () {
            var oData = {
                mockData: [
                    { id: "1", name: "John Doe", age: 30 },
                    { id: "2", name: "Jane Smith", age: 25 },
                    { id: "3", name: "Sam Green", age: 35 }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        sayHello: function () {
            alert("Hello!");
        }
    });
});
