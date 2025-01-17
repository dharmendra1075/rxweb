﻿import { createComponentInstance } from "../../dynamic-component-provider"
import { DynamicFormConfiguration } from "@rxweb/reactive-form-validators";
export function inputProcessor<T>(options: {
    dynamicFormConfiguration?: DynamicFormConfiguration,
    component:any,
    serverData: any,
    tagName: string,
    elementValue?: any,
    uiBindings?: any,
    viewMode?:string
}) {
    const fixture = createComponentInstance<T>(options.component);
    let instance: any = fixture.componentInstance;
    instance.dynamicFormConfiguration = options.dynamicFormConfiguration;
    if (options.viewMode)
        instance.viewMode = options.viewMode;
    if (options.uiBindings)
        instance.uiBindings = options.uiBindings;
    instance.serverData = options.serverData;
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector(options.tagName);
    if (options.elementValue) {
        inputElement.value = options.elementValue;
        inputElement.dispatchEvent(new Event(options.tagName));
    }
    return {
        instance: instance, element: inputElement,
        nativeElement: fixture.nativeElement
    }
}