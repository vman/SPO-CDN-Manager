(function ($) {

    var hostWebUrl, cdnManagerViewModel;

    function CDNManagerViewModel() {

        this.EnablePublicCDN = ko.observable(false);
        this.Origins = ko.observableArray([]);
        this.Filetypes = ko.observableArray([]);

        this.InternalFiletypes = ko.observableArray([]);
        this.CurrentOriginID = ko.observable("");
        this.CurrentOriginUrl = ko.observable("");
        this.CurrentFiletype = ko.observable("");

        this.isLoading = ko.observable(true);

        this.showEmptyOriginsMsg = ko.observable(false);

        this.addOriginError = ko.observable(false);
        this.addOriginSuccess = ko.observable(false);
        this.addOriginErrorMessage = ko.observable("");

        this.addFiletypeError = ko.observable(false);
        this.addFiletypeSuccess = ko.observable(false);
        this.addFiletypeErrorMessage = ko.observable("");
    }

    $(document).ready(function () {

        cdnManagerViewModel = new CDNManagerViewModel();

        ko.applyBindings(cdnManagerViewModel, document.getElementById('cdnManagerContainer'));

        InitOfficeUIFabricComponents();

        hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));

        //fix for I.E caching the ajax calls
        $.ajaxSetup({ cache: false });

        $.ajax("/Home/GetCDNSettings?SPHostUrl=" + hostWebUrl)
        .then(function (data) {

            cdnManagerViewModel.EnablePublicCDN(data.PublicCDNEnabled);
            cdnManagerViewModel.Filetypes(data.Filetypes);
            cdnManagerViewModel.InternalFiletypes(data.Filetypes);
            cdnManagerViewModel.Origins(data.Origins);

            if (cdnManagerViewModel.Origins().length == 0) {
                cdnManagerViewModel.showEmptyOriginsMsg(true);
            }

            InitOfficeUIFabricDialogs();

        }, function (jqxr, errorCode, errorThrown) {
            console.log(jqxr.responseText);
        }).always(function () {
            cdnManagerViewModel.isLoading(false);
        });

        $("#add-cdn-origin").on("click", function () {

            var folderUrl = $("#txt-cdn-origin").val();

            $.ajax({
                url: "/Home/AddOrigin?SPHostUrl=" + hostWebUrl + "&folderUrl=" + folderUrl,
                method: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            })
            .then(function (data) {

                cdnManagerViewModel.Origins(data);
                cdnManagerViewModel.addOriginError(false);
                cdnManagerViewModel.addOriginSuccess(true);
                cdnManagerViewModel.showEmptyOriginsMsg(false);
                CreateOfficeUIFabricDialog(".origins-Dialog-Container", ".btnDeleteOrigin", ".origins-Dialog");

            }, function (jqxr, errorCode, errorThrown) {
                cdnManagerViewModel.addOriginSuccess(false);
                cdnManagerViewModel.addOriginErrorMessage(jqxr.responseText);
                cdnManagerViewModel.addOriginError(true);
                console.log(jqxr.responseText);
            });
        });

        $("#add-cdn-filetype").on("click", function () {

            var newFileType = $("#txt-cdn-filetype").val();

            cdnManagerViewModel.InternalFiletypes.push(newFileType);

            SetCDNFiletypes(true);
        });

        $("#cdn-yes-button").on("click", setCDNValue);
        $("#cdn-no-button").on("click", function () {
            cdnManagerViewModel.EnablePublicCDN(!cdnManagerViewModel.EnablePublicCDN());
        });
        $("#delete-origin-yes").on("click", deleteOrigin);
        $("#delete-filetype-yes").on("click", deleteFiletype);

    });

    function deleteFiletype() {

        cdnManagerViewModel.InternalFiletypes.remove(cdnManagerViewModel.CurrentFiletype());

        SetCDNFiletypes(false);
    }

    function deleteOrigin() {

        $.ajax({
            url: "/Home/RemoveOrigin?SPHostUrl=" + hostWebUrl + "&originID=" + cdnManagerViewModel.CurrentOriginID()
        })
         .then(function (data) {
             cdnManagerViewModel.Origins(data);
             CreateOfficeUIFabricDialog(".origins-Dialog-Container", ".btnDeleteOrigin", ".origins-Dialog");

         }, function (jqxr, errorCode, errorThrown) {
             console.log(jqxr.responseText);
         });

    }

    function setCDNValue() {

        var setCDN = $("#cdn-enabled-Toggle").is(':checked');
        $.ajax({
            url: "/Home/SetCDN?SPHostUrl=" + hostWebUrl + "&value=" + setCDN
        })
         .then(function (data) {

             cdnManagerViewModel.EnablePublicCDN(data);

         }, function (jqxr, errorCode, errorThrown) {
             console.log(jqxr.responseText);
         });
    }

    function SetCDNFiletypes(addFiletype) {
        $.ajax({
            url: "/Home/SetFiletypes?SPHostUrl=" + hostWebUrl,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ filetypes: cdnManagerViewModel.InternalFiletypes() }),
            method: "POST"
        })
            .then(function (data) {

                if (addFiletype) {
                    cdnManagerViewModel.addFiletypeError(false);
                    cdnManagerViewModel.addFiletypeSuccess(true);
                }

                cdnManagerViewModel.Filetypes(data);
                CreateOfficeUIFabricDialog(".fileTypes-Dialog-Container", ".btnDeleteFileType", ".fileTypes-Dialog");

            }, function (jqxr, errorCode, errorThrown) {

                if (addFiletype) {
                    cdnManagerViewModel.addFiletypeSuccess(false);
                    cdnManagerViewModel.addFiletypeErrorMessage(jqxr.responseText);
                    cdnManagerViewModel.addFiletypeError(true);
                }

                cdnManagerViewModel.InternalFiletypes(cdnManagerViewModel.Filetypes());
                console.log(jqxr.responseText);
            });
    }

    function InitOfficeUIFabricDialogs() {

        CreateOfficeUIFabricDialog(".origins-Dialog-Container", ".btnDeleteOrigin", ".origins-Dialog");
        CreateOfficeUIFabricDialog(".fileTypes-Dialog-Container", ".btnDeleteFileType", ".fileTypes-Dialog");
        CreateOfficeUIFabricDialog(".set-CDN-Dialog-Container", "#cdn-enabled-Toggle", ".set-CDN-Dialog");
    }

    function InitOfficeUIFabricComponents() {

        if (typeof fabric !== "undefined") {
            if ('Spinner' in fabric) {
                var elements = document.querySelectorAll('.ms-Spinner');
                var i = elements.length;
                var component;
                while (i--) {
                    component = new fabric['Spinner'](elements[i]);
                }
            }
        }

        var TextFieldElements = document.querySelectorAll(".ms-TextField");
        for (var i = 0; i < TextFieldElements.length; i++) {
            new fabric['TextField'](TextFieldElements[i]);
        }

        var PanelExamples = document.getElementsByClassName("ms-PanelExample");
        for (var i = 0; i < PanelExamples.length; i++) {
            (function () {
                var PanelExampleButton = PanelExamples[i].querySelector(".ms-Button");
                var PanelExamplePanel = PanelExamples[i].querySelector(".ms-Panel");
                PanelExampleButton.addEventListener("click", function (i) {
                    new fabric['Panel'](PanelExamplePanel);
                });
            }());
        }

        var ToggleElements = document.querySelectorAll(".ms-Toggle");
        for (var i = 0; i < ToggleElements.length; i++) {
            new fabric['Toggle'](ToggleElements[i]);
        }

        var PivotElements = document.querySelectorAll(".ms-Pivot");
        for (var i = 0; i < PivotElements.length; i++) {
            new fabric['Pivot'](PivotElements[i]);
        }
    }

    function CreateOfficeUIFabricDialog(dialogContainerID, buttonID, dialogID) {
        var example = document.querySelector(dialogContainerID);
        var dialog = example.querySelector(dialogID);

        var actionButtonElements = example.querySelectorAll(".ms-Dialog-action");

        var dialogComponent = new fabric['Dialog'](dialog);

        $(buttonID).on("click", function () {
            var currentButton = $(this);
            if (currentButton.attr("originUrl")) {
                cdnManagerViewModel.CurrentOriginUrl(currentButton.attr("originUrl"));
                cdnManagerViewModel.CurrentOriginID(currentButton.attr("originID"));
            }
            else if (currentButton.attr("filetype")) {
                cdnManagerViewModel.CurrentFiletype(currentButton.attr("filetype"));
            }

            dialogComponent.open();
        });
    }

    var getQueryStringParameter = function (paramToRetrieve) {
        if (document.URL.indexOf("?") > -1) {
            var params = document.URL.split("?")[1].split("&");
            var strParams = "";
            for (var i = 0; i < params.length; i = i + 1) {
                var singleParam = params[i].split("=");
                if (singleParam[0] == paramToRetrieve)
                    return singleParam[1];
            }
        }
        return "";
    };
})(jQuery);
