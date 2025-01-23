sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return Controller.extend("sap.f.ShellBarWithFlexibleColumnLayout.controller.List", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;
			
			var oModel = new JSONModel("mockdata/menu.json");
			this.getView().setModel(oModel, "menuItems");
		},
		
		onListItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				productPath = oEvent.getSource().getSelectedItem().getBindingContext("products").getPath(),
				product = productPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail", {layout: oNextUIState.layout, product: product});
		},
		onSearchMenu: function (oEvent) {
			// Get the search query
			const sQuery = oEvent.getParameter("query");
			const oList = this.byId("menuList"); // Get the menu List
			const oBinding = oList.getBinding("items"); // Get the binding for the items
			
			// Create a filter for the 'item' property in nested options
			const oFilter = new sap.ui.model.Filter({
				path: "options",
				test: function (aOptions) {
					// Return true if any of the nested options match the search query
					return aOptions.some((oOption) => 
						oOption.item.toLowerCase().includes(sQuery.toLowerCase())
					);
				}
			});
		
			// Apply the filter
			oBinding.filter(sQuery ? [oFilter] : []);
		},
		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("ALIAS_CONT", FilterOperator.Contains, sQuery)];
			}

			this.getView().byId("productsTable").getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function (oEvent) {
			MessageBox.show("This functionality is not ready yet.", {
				icon: MessageBox.Icon.INFORMATION,
				title: "Aw, Snap!",
				actions: [MessageBox.Action.OK]
			});
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("productsTable"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("Name", this._bDescendingSort);

			oBinding.sort(oSorter);
		}
	});
});
