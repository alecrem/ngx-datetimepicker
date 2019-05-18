"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var isMobile_service_1 = require("../services/isMobile.service");
var date_service_1 = require("../services/date.service");
var DateTimePickerComponent = (function () {
    function DateTimePickerComponent(isMobileService, dateService, eRef) {
        this.isMobileService = isMobileService;
        this.dateService = dateService;
        this.eRef = eRef;
        this.disableInput = false;
        this.disableButton = false;
        this.disablePicker = false;
        this.doNotCloseOnDateSet = false;
        this.min = null;
        this.max = null;
        this.selectedDateTimeChange = new core_1.EventEmitter();
        this.pickerVisible = false;
        this.isMobile = isMobileService.isMobile;
        this.placeholder = this.placeholder || '';
    }
    DateTimePickerComponent.prototype.offClick = function (event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    };
    Object.defineProperty(DateTimePickerComponent.prototype, "formattedDate", {
        get: function () {
            return this.dateService.formatMMDDYYYY_HHMM_AMPM(this.selectedDateTime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "mobileFormattedDate", {
        get: function () {
            return this.dateService.formatMobileYYYYMMDDTHHMM(this.selectedDateTime);
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerComponent.prototype.writeValue = function (value) {
        this.selectedDateTime = value;
    };
    DateTimePickerComponent.prototype.registerOnChange = function (handler) {
        this.selectedDateTimeChange.subscribe(handler);
    };
    DateTimePickerComponent.prototype.registerOnTouched = function () { };
    DateTimePickerComponent.prototype.setDateTime = function (dateTime) {
        var isValid = !!Date.parse(dateTime);
        if (isValid) {
            this.selectedDateTime = new Date(dateTime);
            this.selectedDateTimeChange.emit(this.selectedDateTime);
            this.invalid = false;
        }
        else {
            this.invalid = true;
        }
    };
    DateTimePickerComponent.prototype.ngOnInit = function () {
        if (typeof this.selectedDateTime == 'string') {
            this.selectedDateTime = new Date(this.selectedDateTime);
        }
    };
    DateTimePickerComponent.prototype.newDatePicked = function (date) {
        this.selectedDateTimeChange.emit(date);
        this.selectedDateTime = date;
    };
    DateTimePickerComponent.prototype.closePicker = function (close) {
        this.pickerVisible = close;
    };
    DateTimePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-datetime-picker',
                    template: "<div [ngSwitch]=\"isMobile\" [class.invalid]=\"invalid\"> <div *ngSwitchCase=\"true\"> <input type=\"datetime-local\" [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" [value]=\"mobileFormattedDate\" (change)=\"setDateTime($event.target.value)\" /> </div> <div *ngSwitchDefault> <div class=\"ngx-picker\"> <input type=\"text\" [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" (click)=\"pickerVisible = !pickerVisible\" [value]=\"formattedDate\" (change)=\"setDateTime($event.target.value)\" /> <button type=\"button\" [disabled]=\"disableButton || disablePicker\" (click)=\"pickerVisible = !pickerVisible\"> <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\" /> </svg> </button> <ngx-date [hidden]=\"!pickerVisible\" includeTime=\"true\" [doNotCloseOnDateSet]=\"doNotCloseOnDateSet\" (closeDatePicker)=\"closePicker($event)\" (selectedDateChange)=\"newDatePicked($event)\" [min]=\"min\" [max]=\"max\" [selectedDate]=\"selectedDateTime\"> </ngx-date> </div> </div> </div> ",
                    encapsulation: core_1.ViewEncapsulation.None,
                    providers: [
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return DateTimePickerComponent; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return [
        { type: isMobile_service_1.IsMobileService, },
        { type: date_service_1.DateService, },
        { type: core_1.ElementRef, },
    ]; };
    DateTimePickerComponent.propDecorators = {
        'selectedDateTime': [{ type: core_1.Input },],
        'placeholder': [{ type: core_1.Input },],
        'disableInput': [{ type: core_1.Input },],
        'disableButton': [{ type: core_1.Input },],
        'disablePicker': [{ type: core_1.Input },],
        'doNotCloseOnDateSet': [{ type: core_1.Input },],
        'min': [{ type: core_1.Input },],
        'max': [{ type: core_1.Input },],
        'selectedDateTimeChange': [{ type: core_1.Output },],
        'offClick': [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return DateTimePickerComponent;
}());
exports.DateTimePickerComponent = DateTimePickerComponent;
