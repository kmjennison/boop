package com.kevinjennison.boop;
import android.app.Application;
import com.parse.Parse;
import com.parse.ParseInstallation;

public class App extends Application {

    @Override public void onCreate() {
        super.onCreate();
        Parse.initialize(this, "FvWH4KxfFMphTtmHuJZCxGdof0PPLh8GkiFLVyEO", "obn53G1XLAHkrHFAf0ezguSXJLuSK4SdjJKfsVY8");
        ParseInstallation.getCurrentInstallation().saveInBackground();
    }
}
