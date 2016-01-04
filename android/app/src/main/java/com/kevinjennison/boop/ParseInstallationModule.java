package com.kevinjennison.boop;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.parse.ParseInstallation;

public class ParseInstallationModule extends ReactContextBaseJavaModule {

    public ParseInstallationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ParseInstallation";
    }

    @ReactMethod
    public void getInstallationObjectId(
            Callback errorCallback,
            Callback successCallback) {
        try {
            String installationId = ParseInstallation.getCurrentInstallation().getObjectId();
            successCallback.invoke(installationId);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
