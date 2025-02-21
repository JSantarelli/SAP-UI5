sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
  "use strict";

  return Controller.extend("sap.f.ShellBarWithFlexibleColumnLayout.controller.FlexibleColumnLayout", {
    onInit: function () {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.attachRouteMatched(this.onRouteMatched, this);
      this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
    },

    onBeforeRouteMatched: function(oEvent) {

      var oModel = this.getOwnerComponent().getModel();

      var sLayout = oEvent.getParameters().arguments.layout;

      if (!sLayout) {
        var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0);
        sLayout = oNextUIState.layout;
      }

      if (sLayout) {
        oModel.setProperty("/layout", sLayout);
      }
    },

    onRouteMatched: function (oEvent) {
      var sRouteName = oEvent.getParameter("name"),
        oArguments = oEvent.getParameter("arguments");

      this._updateUIElements();

      this.currentRouteName = sRouteName;
      this.currentProduct = oArguments.product;
      this.currentSupplier = oArguments.supplier;
    },

    onStateChanged: function (oEvent) {
      var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
        sLayout = oEvent.getParameter("layout");

      this._updateUIElements();

      if (bIsNavigationArrow) {
        this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct, supplier: this.currentSupplier}, true);
      }
    },
    _updateUIElements: function () {
      var oModel = this.getOwnerComponent().getModel();
      var oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();
      oModel.setData(oUIState);
    },

    handleBackButtonPressed: function () {
      window.history.go(-1);
    },

    onExit: function () {
      this.oRouter.detachRouteMatched(this.onRouteMatched, this);
      this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
    }
  });
});
